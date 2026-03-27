import { slugify } from "./pressSlug.js";

export function getMerchantFixedSlug(item) {
  const normalized = slugify(item?.Name || "");
  if (normalized.length > 0) return normalized;
  return String(item?.id ?? "");
}

export function getMerchantSlug(item) {
  return `${item.id}-${getMerchantFixedSlug(item)}`;
}

export function getMerchantSlugPath(item) {
  return `/merchants/${getMerchantSlug(item)}`;
}

export function getMerchantIdFromSlugParam(value) {
  const input = String(value || "");
  const match = input.match(/^(\d+)(?:-.+)?$/);
  if (!match) return null;
  const id = Number.parseInt(match[1], 10);
  return Number.isFinite(id) && id > 0 ? id : null;
}
