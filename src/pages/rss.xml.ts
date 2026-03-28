export const prerender = false;

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { SEO } from "@data/config";
import {
  getCommunityPartnerships,
  getCommunityPartnershipSlugPath,
  getPress,
  getPressSlug,
  normalizePressType,
  type CommunityPartnership,
  type PressItem,
} from "@lib/directus";

export async function GET(context: APIContext) {
  const [blogPosts, pressResult, communityPartnershipsResult] = await Promise.all([
    getCollection("blog", ({ data }) => data.publish !== false),
    getPress(),
    getCommunityPartnerships(),
  ]);

  const blogItems = blogPosts.map((post) => ({
    title: post.data.title,
    description: post.data.excerpt,
    pubDate: post.data.publishDate,
    link: `/blog/${post.id}`,
    categories: post.data.categories ?? [],
  }));

  const pressItems: PressItem[] = pressResult.data ?? [];
  const pressRssItems = pressItems.map((item) => {
    const type = normalizePressType(item.type);
    return {
      title: item.Title,
      description: item.Subtitle ?? "",
      pubDate: item.Date ? new Date(item.Date) : new Date(),
      link: `/news/${getPressSlug(item)}`,
      categories: type ? [type] : [],
    };
  });

  const communityPartnershipItems: CommunityPartnership[] =
    communityPartnershipsResult.data ?? [];
  const communityPartnershipRssItems = communityPartnershipItems.map((item) => {
    const dateCandidate = item.date_updated ?? item.date_created ?? "";
    const parsedDate = dateCandidate ? new Date(dateCandidate) : new Date();

    return {
      title: item.title,
      description: item.description ?? item.subtitle ?? "",
      pubDate: Number.isNaN(parsedDate.valueOf()) ? new Date() : parsedDate,
      link: getCommunityPartnershipSlugPath(item),
      categories: ["community-partnerships"],
    };
  });

  const allItems = [...blogItems, ...pressRssItems, ...communityPartnershipRssItems].sort(
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
    customData: `<atom:link href="${new URL("/rss.xml", context.site!).toString()}" rel="self" type="application/rss+xml" />`,
  });
}
