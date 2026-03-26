import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (context.request.method === "GET" && response.status === 200) {
    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("text/html") || contentType.includes("xml")) {
      response.headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=60, stale-while-revalidate=3600, stale-if-error=86400"
      );
    }
  }

  return response;
});
