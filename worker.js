// Serves the static site, and relays PostHog traffic through /rly/* on this
// domain so analytics isn't dropped by blockers that block posthog.com hosts.
const RELAY = "/rly";
const API_HOST = "us.i.posthog.com";
const ASSET_HOST = "us-assets.i.posthog.com";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === RELAY || url.pathname.startsWith(RELAY + "/")) {
      return relay(request, url, ctx);
    }
    return env.ASSETS.fetch(request);
  },
};

async function relay(request, url, ctx) {
  let path = url.pathname.slice(RELAY.length) || "/";
  let search = url.search;
  // index.html sends /rly/z/<base64url of path+query> so blocklist path rules don't match.
  if (path.startsWith("/z/")) {
    try {
      const b64 = path.slice(3).replace(/-/g, "+").replace(/_/g, "/");
      const decoded = new URL(atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4)), "https://relay.invalid");
      path = decoded.pathname;
      search = decoded.search;
    } catch {
      return new Response("Bad relay path", { status: 400 });
    }
  }
  const isAsset = path.startsWith("/static/") || path.startsWith("/array/");
  const target = `https://${isAsset ? ASSET_HOST : API_HOST}${path}${search}`;

  if (isAsset && request.method === "GET") {
    const cache = caches.default;
    const hit = await cache.match(request);
    if (hit) return hit;
    const res = await fetch(target, { cf: { cacheTtl: 3600 } });
    if (res.ok) ctx.waitUntil(cache.put(request, res.clone()));
    return res;
  }

  const headers = new Headers(request.headers);
  headers.delete("cookie");
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) headers.set("x-forwarded-for", ip);
  return fetch(target, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });
}
