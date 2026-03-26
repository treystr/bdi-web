import type { APIRoute } from "astro";
import { siteConfig } from "@data/config";

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() || siteConfig.siteUrl;
  const sitemapUrl = new URL("/sitemap-index.xml", base).toString();

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${sitemapUrl}`,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
