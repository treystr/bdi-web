export const prerender = false;

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SEO } from "@data/config";
import {
  getPress,
  getPressSlug,
  normalizePressType,
  type PressItem,
} from "@lib/directus";

export async function GET(context: APIContext) {
  const [blogPosts, pressResult] = await Promise.all([
    getCollection("blog", ({ data }) => data.publish !== false),
    getPress(),
  ]);

  const blogItems = blogPosts.map((post) => ({
    title: post.data.title,
    description: post.data.excerpt,
    pubDate: post.data.publishDate,
    link: `/blog/${post.id}/`,
    categories: post.data.categories ?? [],
  }));

  const pressItems: PressItem[] = pressResult.data ?? [];
  const pressRssItems = pressItems.map((item) => {
    const type = normalizePressType(item.type);
    return {
      title: item.Title,
      description: item.Subtitle ?? "",
      pubDate: item.Date ? new Date(item.Date) : new Date(),
      link: `/news/${getPressSlug(item)}/`,
      categories: type ? [type] : [],
    };
  });

  const allItems = [...blogItems, ...pressRssItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: SEO.SiteName,
    description: SEO.defaultDescription,
    site: context.site!,
    items: allItems,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
  });
}
