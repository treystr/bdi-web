import { slugify } from "./pressSlug.js";

export function getCommunityPartnershipFixedSlug(item) {
  const normalized = slugify(item?.title || "");
  if (normalized.length > 0) return normalized;
  return String(item?.id ?? "");
}

export function getCommunityPartnershipSlug(item) {
  return `${item.id}-${getCommunityPartnershipFixedSlug(item)}`;
}

export function getCommunityPartnershipSlugPath(item) {
  return `/initiatives/community-partnerships/${getCommunityPartnershipSlug(item)}`;
}

export function getCommunityPartnershipIdFromSlugParam(value) {
  const input = String(value || "");
  const match = input.match(/^(\d+)(?:-.+)?$/);
  if (!match) return null;
  const id = Number.parseInt(match[1], 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}
