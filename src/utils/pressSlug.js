export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPressFixedSlug(item) {
  const candidates = [
    item?.url_slug,
    item?.slug,
    item?.Slug,
    item?.permalink,
    item?.Title,
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const normalized = slugify(candidate);
    if (normalized.length > 0) return normalized;
  }

  return String(item?.id ?? "");
}

export function getPressSlug(item) {
  return `${item.id}-${getPressFixedSlug(item)}`;
}

export function getPressSlugPath(item) {
  return `/news/${getPressSlug(item)}`;
}
