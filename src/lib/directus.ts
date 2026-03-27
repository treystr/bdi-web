/// <reference types="vite/client" />
import { createDirectus, readItem, readItems, rest, staticToken } from "@directus/sdk";
import { getPressFixedSlug as sharedPressFixedSlug, getPressSlug as sharedPressSlug } from "@utils/pressSlug.js";
import {
  getMerchantFixedSlug as sharedMerchantFixedSlug,
  getMerchantIdFromSlugParam as sharedMerchantIdFromSlugParam,
  getMerchantSlug as sharedMerchantSlug,
  getMerchantSlugPath as sharedMerchantSlugPath,
} from "@utils/merchantSlug.js";

export type CmsErrorCode =
  | "CMS_NOT_CONFIGURED"
  | "CMS_UNAVAILABLE"
  | "NOT_FOUND"
  | "UNKNOWN";

export type CmsResult<T> = { data: T | null; error: CmsErrorCode | null };

export interface PressItem {
  id: number;
  status: string;
  sort: number | null;
  Title: string;
  Subtitle: string | null;
  Date: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  Slug?: string | null;
  slug?: string | null;
  url_slug?: string | null;
  permalink?: string | null;
  Content: string | null;
  Cover:
    | string
    | {
        id: string;
        filename_disk?: string;
        width?: number;
        height?: number;
      }
    | null;
  type: "press_release" | "in_the_news" | "events" | null;
}

export interface Merchant {
  id: number;
  status: string;
  sort: number | null;
  Name: string;
  Onboard_Date: string | null;
  Onboard_Block: number | null;
  Image_Primary:
    | string
    | {
        id: string;
        filename_disk?: string;
        width?: number;
        height?: number;
      }
    | null;
  Short_Description: string | null;
  Long_Description: string | null;
  website: string | null;
}

export interface Announcement {
  id: number;
  status: string;
  sort: number | null;
  title: string;
  summary: string;
  body: string | null;
  link_url: string | null;
  link_label: string | null;
  image:
    | string
    | {
        id: string;
        filename_disk?: string;
        width?: number;
        height?: number;
      }
    | null;
  is_featured: boolean | null;
  type: string[] | string | null;
  expiration_date: string | null;
  date_created?: string | null;
  date_updated?: string | null;
}

export type DocumentType = "brochure" | "flyer";

export interface DocumentFile {
  id: string;
  type?: string | null;
  filename_download?: string | null;
  title?: string | null;
}

export interface DocumentItem {
  id: number;
  status: string;
  sort: number | null;
  name: string;
  description: string | null;
  file: string | DocumentFile | null;
  preview_image: string | DocumentFile | null;
  type: unknown;
}

function getConfiguredDirectusUrl(): string | null {
  const isServer = import.meta.env.SSR;
  const url = isServer
    ? import.meta.env.DIRECTUS_URL
    : import.meta.env.PUBLIC_DIRECTUS_URL;

  if (typeof url !== "string" || url.trim().length === 0) return null;
  return url;
}

export function getDirectusClient() {
  const url = getConfiguredDirectusUrl();
  if (!url) return null;

  if (import.meta.env.SSR && import.meta.env.DIRECTUS_STATIC_TOKEN) {
    return createDirectus(url)
      .with(staticToken(import.meta.env.DIRECTUS_STATIC_TOKEN))
      .with(rest());
  }

  return createDirectus(url).with(rest());
}

/**
 * Always returns the public-facing Directus URL for use in asset URLs
 * rendered in HTML (browser must be able to reach these).
 */
export function getDirectusUrl(): string {
  const publicUrl = import.meta.env.PUBLIC_DIRECTUS_URL;
  if (typeof publicUrl === "string" && publicUrl.trim().length > 0) {
    return publicUrl;
  }
  return getConfiguredDirectusUrl() ?? "";
}

function isProbablyNetworkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /fetch|ECONNREFUSED|ENOTFOUND|network|timed out|timeout/i.test(
    message
  );
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return promise;

  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(
        () => reject(new Error(`Timeout after ${timeoutMs}ms`)),
        timeoutMs
      );
    }),
  ]);
}

/**
 * Fetches all published merchants, sorted by Onboard_Block ascending.
 */
export async function getMerchants(): Promise<CmsResult<Merchant[]>> {
  const client = getDirectusClient();
  if (!client) {
    console.error("[Merchants] Directus client not configured");
    return { data: null, error: "CMS_NOT_CONFIGURED" };
  }

  try {
    const merchants = await withTimeout(
      client.request(
        readItems("Merchants", {
          fields: [
            "id",
            "Name",
            "Onboard_Date",
            "Onboard_Block",
            "Image_Primary.*",
            "Short_Description",
            "Long_Description",
            "website",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
          sort: ["Onboard_Block", "id"],
        })
      ),
      5000
    );

    console.log(`[Merchants] Fetched ${merchants.length} published merchant(s)`);

    return {
      data: merchants as Merchant[],
      error: null,
    };
  } catch (error: any) {
    let errorMessage = "Unknown error";
    let statusCode: number | null = null;

    if (error?.response) {
      statusCode = error.response.status;
      const errorBody = error.response._data || error.response.data;
      if (errorBody?.errors?.[0]?.message) {
        errorMessage = errorBody.errors[0].message;
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error("[Merchants] Failed to fetch merchants:", errorMessage);
    if (statusCode) {
      console.error(`[Merchants] HTTP Status: ${statusCode}`);
    }

    if (
      statusCode === 403 ||
      errorMessage.includes("permission") ||
      errorMessage.includes("Forbidden")
    ) {
      console.error(
        "[Merchants] Permission denied - ensure the Public or service role has Read access to the Merchants collection"
      );
      return { data: null, error: "CMS_UNAVAILABLE" };
    }

    return {
      data: null,
      error: isProbablyNetworkError(error) ? "CMS_UNAVAILABLE" : "UNKNOWN",
    };
  }
}

/**
 * Fetches all published announcements, featured first then sorted by sort/id.
 */
export async function getAnnouncements(): Promise<CmsResult<Announcement[]>> {
  const client = getDirectusClient();
  if (!client) {
    console.error("[Announcements] Directus client not configured");
    return { data: null, error: "CMS_NOT_CONFIGURED" };
  }

  function normalizeAnnouncementRecord(record: any): Announcement {
    return {
      id: Number(record?.id ?? 0),
      status: typeof record?.status === "string" ? record.status : "published",
      sort: typeof record?.sort === "number" ? record.sort : null,
      title:
        typeof record?.title === "string"
          ? record.title
          : typeof record?.Title === "string"
          ? record.Title
          : "",
      summary:
        typeof record?.summary === "string"
          ? record.summary
          : typeof record?.Summary === "string"
          ? record.Summary
          : "",
      body:
        typeof record?.body === "string"
          ? record.body
          : typeof record?.Body === "string"
          ? record.Body
          : null,
      link_url:
        typeof record?.link_url === "string"
          ? record.link_url
          : typeof record?.Link_URL === "string"
          ? record.Link_URL
          : null,
      link_label:
        typeof record?.link_label === "string"
          ? record.link_label
          : typeof record?.Link_Label === "string"
          ? record.Link_Label
          : null,
      image: record?.image ?? record?.Image ?? null,
      is_featured:
        typeof record?.is_featured === "boolean"
          ? record.is_featured
          : typeof record?.isFeatured === "boolean"
          ? record.isFeatured
          : typeof record?.is_featured === "number"
          ? record.is_featured === 1
          : typeof record?.is_featured === "string"
          ? record.is_featured === "true"
          : null,
      type: record?.type ?? record?.Type ?? null,
      expiration_date:
        typeof record?.expiration_date === "string"
          ? record.expiration_date
          : typeof record?.Expiration_Date === "string"
          ? record.Expiration_Date
          : null,
      date_created:
        typeof record?.date_created === "string"
          ? record.date_created
          : typeof record?.dateCreated === "string"
          ? record.dateCreated
          : null,
      date_updated:
        typeof record?.date_updated === "string"
          ? record.date_updated
          : typeof record?.dateUpdated === "string"
          ? record.dateUpdated
          : null,
    };
  }

  const queryCandidates: Array<{
    collection: string;
    fields: string[];
    sort: string[];
  }> = [
    {
      collection: "BDI_Announcements",
      fields: [
        "id",
        "status",
        "sort",
        "title",
        "summary",
        "body",
        "link_url",
        "link_label",
        "image.*",
        "is_featured",
        "type",
        "expiration_date",
        "date_created",
        "date_updated",
      ],
      sort: ["-is_featured", "sort", "-date_created", "id"],
    },
    {
      collection: "bdi_announcements",
      fields: [
        "id",
        "status",
        "sort",
        "title",
        "summary",
        "body",
        "link_url",
        "link_label",
        "image.*",
        "is_featured",
        "type",
        "expiration_date",
        "date_created",
        "date_updated",
      ],
      sort: ["-is_featured", "sort", "-date_created", "id"],
    },
    {
      collection: "Announcements",
      fields: [
        "id",
        "status",
        "sort",
        "Title",
        "Summary",
        "Body",
        "Link_URL",
        "Link_Label",
        "Image.*",
        "is_featured",
        "Type",
        "Expiration_Date",
        "date_created",
        "date_updated",
      ],
      sort: ["-is_featured", "sort", "-date_created", "id"],
    },
  ];

  let lastError: any = null;

  for (const candidate of queryCandidates) {
    try {
      const items = await withTimeout(
        client.request(
          readItems(candidate.collection, {
            fields: candidate.fields,
            filter: {
              status: {
                _eq: "published",
              },
            },
            sort: candidate.sort,
          })
        ),
        5000
      );

      const now = new Date();
      function isExpired(expirationDate: string | null): boolean {
        if (!expirationDate) return false;
        const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(expirationDate);
        const parsed = isDateOnly
          ? new Date(`${expirationDate}T23:59:59.999`)
          : new Date(expirationDate);
        if (Number.isNaN(parsed.getTime())) return false;
        return now.getTime() > parsed.getTime();
      }

      const normalizedItems = (items as any[])
        .map(normalizeAnnouncementRecord)
        .filter((item) => item.title.trim().length > 0 && item.summary.trim().length > 0)
        .filter((item) => !isExpired(item.expiration_date));

      console.log(
        `[Announcements] Fetched ${normalizedItems.length} published announcement(s) from ${candidate.collection}`
      );

      return {
        data: normalizedItems,
        error: null,
      };
    } catch (error: any) {
      lastError = error;
    }
  }

  if (lastError) {
    const error: any = lastError;
    let errorMessage = "Unknown error";
    let statusCode: number | null = null;

    if (error?.response) {
      statusCode = error.response.status;
      const errorBody = error.response._data || error.response.data;
      if (errorBody?.errors?.[0]?.message) {
        errorMessage = errorBody.errors[0].message;
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error("[Announcements] Failed to fetch announcements:", errorMessage);
    if (statusCode) {
      console.error(`[Announcements] HTTP Status: ${statusCode}`);
    }

    if (
      statusCode === 403 ||
      errorMessage.includes("permission") ||
      errorMessage.includes("Forbidden")
    ) {
      console.error(
        "[Announcements] Permission denied - ensure the Public or service role has Read access to the Announcements collection"
      );
      return { data: null, error: "CMS_UNAVAILABLE" };
    }

    return {
      data: null,
      error: isProbablyNetworkError(error) ? "CMS_UNAVAILABLE" : "UNKNOWN",
    };
  }

  return { data: null, error: "UNKNOWN" };
}

export { slugify } from "@utils/pressSlug.js";

export function normalizePressType(
  type: string | null
): "press-release" | "in-the-news" | "events" | undefined {
  if (type === "press_release") return "press-release";
  if (type === "in_the_news") return "in-the-news";
  if (type === "events") return "events";
  return undefined;
}

export function getPressSlug(item: PressItem): string {
  return sharedPressSlug(item);
}

export function getPressFixedSlug(item: PressItem): string {
  return sharedPressFixedSlug(item);
}

export function getMerchantFixedSlug(item: Merchant): string {
  return sharedMerchantFixedSlug(item);
}

export function getMerchantSlug(item: Merchant): string {
  return sharedMerchantSlug(item);
}

export function getMerchantSlugPath(item: Merchant): string {
  return sharedMerchantSlugPath(item);
}

export function getMerchantIdFromSlugParam(value: string | undefined): number | null {
  return sharedMerchantIdFromSlugParam(value);
}

function stripHtml(value: string): string {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function trimAtWordBoundary(value: string, maxLength = 160): string {
  if (value.length <= maxLength) return value;
  const truncated = value.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > maxLength * 0.7) return `${truncated.slice(0, lastSpace)}...`;
  return `${truncated}...`;
}

export function getPressSeoDescription(
  item: Pick<PressItem, "Subtitle" | "Content">,
  maxLength = 160
): string | undefined {
  const subtitle = typeof item.Subtitle === "string" ? item.Subtitle.trim() : "";
  if (subtitle.length > 0) return trimAtWordBoundary(subtitle, maxLength);

  const content = typeof item.Content === "string" ? stripHtml(item.Content) : "";
  if (content.length > 0) return trimAtWordBoundary(content, maxLength);

  return undefined;
}

export function getPressImageUrl(
  cover: PressItem["Cover"],
  width = 800
): string | null {
  if (!cover) return null;
  const imageId = typeof cover === "string" ? cover : cover.id;
  return `${getDirectusUrl()}/assets/${imageId}?format=webp&quality=80&width=${width}`;
}

export function getMerchantImageUrl(
  image: Merchant["Image_Primary"],
  width = 800
): string | null {
  if (!image) return null;
  const imageId = typeof image === "string" ? image : image.id;
  return `${getDirectusUrl()}/assets/${imageId}?format=webp&quality=80&width=${width}`;
}

export function getAnnouncementImageUrl(
  image: Announcement["image"],
  width = 1200
): string | null {
  if (!image) return null;
  const imageId = typeof image === "string" ? image : image.id;
  return `${getDirectusUrl()}/assets/${imageId}?format=webp&quality=82&width=${width}`;
}

export function getDocumentFileId(
  file: DocumentItem["file"]
): string | null {
  if (!file) return null;
  return typeof file === "string" ? file : file.id ?? null;
}

export function getDocumentAssetUrl(file: DocumentItem["file"]): string | null {
  const fileId = getDocumentFileId(file);
  if (!fileId) return null;
  return `${getDirectusUrl()}/assets/${fileId}`;
}

export function getDocumentPreviewUrl(
  file: DocumentItem["file"],
  width = 800
): string | null {
  const fileId = getDocumentFileId(file);
  if (!fileId) return null;
  return `${getDirectusUrl()}/assets/${fileId}?format=webp&quality=80&width=${width}`;
}

export function getDocumentPreviewImageUrl(
  previewImage: DocumentItem["preview_image"],
  width = 850
): string | null {
  const imageId = getDocumentFileId(previewImage);
  if (!imageId) return null;
  return `${getDirectusUrl()}/assets/${imageId}?format=webp&quality=82&width=${width}`;
}

export function normalizeDocumentType(type: unknown): DocumentType | undefined {
  if (Array.isArray(type)) {
    const firstType = type.find((value) => typeof value === "string");
    if (firstType === "brochure" || firstType === "flyer") return firstType;
    return undefined;
  }

  if (typeof type === "string") {
    if (type === "brochure" || type === "flyer") return type;
  }

  return undefined;
}

/**
 * Fetches all published press items, sorted by Date descending.
 */
export async function getPress(): Promise<CmsResult<PressItem[]>> {
  const client = getDirectusClient();
  if (!client) {
    console.error("[Press] Directus client not configured");
    return { data: null, error: "CMS_NOT_CONFIGURED" };
  }

  try {
    const items = await withTimeout(
      client.request(
        readItems("Press", {
          fields: ["*", "Cover.*"],
          filter: {
            status: {
              _eq: "published",
            },
          },
          sort: ["-Date"],
        })
      ),
      5000
    );

    console.log(`[Press] Fetched ${items.length} published press item(s)`);

    return {
      data: items as PressItem[],
      error: null,
    };
  } catch (error: any) {
    let errorMessage = "Unknown error";
    let statusCode: number | null = null;

    if (error?.response) {
      statusCode = error.response.status;
      const errorBody = error.response._data || error.response.data;
      if (errorBody?.errors?.[0]?.message) {
        errorMessage = errorBody.errors[0].message;
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error("[Press] Failed to fetch press items:", errorMessage);
    if (statusCode) {
      console.error(`[Press] HTTP Status: ${statusCode}`);
    }

    if (
      statusCode === 403 ||
      errorMessage.includes("permission") ||
      errorMessage.includes("Forbidden")
    ) {
      console.error(
        "[Press] Permission denied - ensure the Public or service role has Read access to the Press collection"
      );
      return { data: null, error: "CMS_UNAVAILABLE" };
    }

    return {
      data: null,
      error: isProbablyNetworkError(error) ? "CMS_UNAVAILABLE" : "UNKNOWN",
    };
  }
}

/**
 * Fetches all published documents, sorted by sort ascending.
 */
export async function getDocuments(): Promise<CmsResult<DocumentItem[]>> {
  const client = getDirectusClient();
  if (!client) {
    console.error("[Documents] Directus client not configured");
    return { data: null, error: "CMS_NOT_CONFIGURED" };
  }

  try {
    const items = await withTimeout(
      client.request(
        readItems("Documents", {
          fields: [
            "id",
            "status",
            "sort",
            "name",
            "description",
            "file.id",
            "file.type",
            "file.filename_download",
            "file.title",
            "preview_image.id",
            "preview_image.type",
            "preview_image.filename_download",
            "preview_image.title",
            "type",
          ],
          filter: {
            status: {
              _eq: "published",
            },
          },
          sort: ["sort", "id"],
        })
      ),
      5000
    );

    console.log(`[Documents] Fetched ${items.length} published document(s)`);

    return {
      data: items as DocumentItem[],
      error: null,
    };
  } catch (error: any) {
    let errorMessage = "Unknown error";
    let statusCode: number | null = null;

    if (error?.response) {
      statusCode = error.response.status;
      const errorBody = error.response._data || error.response.data;
      if (errorBody?.errors?.[0]?.message) {
        errorMessage = errorBody.errors[0].message;
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error("[Documents] Failed to fetch documents:", errorMessage);
    if (statusCode) {
      console.error(`[Documents] HTTP Status: ${statusCode}`);
    }

    if (
      statusCode === 403 ||
      errorMessage.includes("permission") ||
      errorMessage.includes("Forbidden")
    ) {
      console.error(
        "[Documents] Permission denied - ensure the Public or service role has Read access to the Documents collection"
      );
      return { data: null, error: "CMS_UNAVAILABLE" };
    }

    return {
      data: null,
      error: isProbablyNetworkError(error) ? "CMS_UNAVAILABLE" : "UNKNOWN",
    };
  }
}

/**
 * Fetches a single published press item by ID.
 */
export async function getPressItem(
  id: number
): Promise<CmsResult<PressItem>> {
  const client = getDirectusClient();
  if (!client) {
    console.error("[Press] Directus client not configured");
    return { data: null, error: "CMS_NOT_CONFIGURED" };
  }

  try {
    const item = await withTimeout(
      client.request(
        readItem("Press", id, {
          fields: ["*", "Cover.*"],
        })
      ),
      5000
    );

    if (!item || (item as any).status !== "published") {
      return { data: null, error: "NOT_FOUND" };
    }

    return {
      data: item as PressItem,
      error: null,
    };
  } catch (error: any) {
    let errorMessage = "Unknown error";
    let statusCode: number | null = null;

    if (error?.response) {
      statusCode = error.response.status;
      const errorBody = error.response._data || error.response.data;
      if (errorBody?.errors?.[0]?.message) {
        errorMessage = errorBody.errors[0].message;
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error(`[Press] Failed to fetch press item ${id}:`, errorMessage);
    if (statusCode) {
      console.error(`[Press] HTTP Status: ${statusCode}`);
    }

    if (statusCode === 404 || statusCode === 403) {
      return { data: null, error: statusCode === 404 ? "NOT_FOUND" : "CMS_UNAVAILABLE" };
    }

    return {
      data: null,
      error: isProbablyNetworkError(error) ? "CMS_UNAVAILABLE" : "UNKNOWN",
    };
  }
}

/**
 * Fetches a single published merchant by ID.
 */
export async function getMerchantById(
  id: number
): Promise<CmsResult<Merchant>> {
  const client = getDirectusClient();
  if (!client) {
    console.error("[Merchants] Directus client not configured");
    return { data: null, error: "CMS_NOT_CONFIGURED" };
  }

  try {
    const item = await withTimeout(
      client.request(
        readItem("Merchants", id, {
          fields: [
            "id",
            "status",
            "Name",
            "Onboard_Date",
            "Onboard_Block",
            "Image_Primary.*",
            "Short_Description",
            "Long_Description",
            "website",
          ],
        })
      ),
      5000
    );

    if (!item || (item as any).status !== "published") {
      return { data: null, error: "NOT_FOUND" };
    }

    return {
      data: item as Merchant,
      error: null,
    };
  } catch (error: any) {
    let errorMessage = "Unknown error";
    let statusCode: number | null = null;

    if (error?.response) {
      statusCode = error.response.status;
      const errorBody = error.response._data || error.response.data;
      if (errorBody?.errors?.[0]?.message) {
        errorMessage = errorBody.errors[0].message;
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }

    console.error(`[Merchants] Failed to fetch merchant ${id}:`, errorMessage);
    if (statusCode) {
      console.error(`[Merchants] HTTP Status: ${statusCode}`);
    }

    if (statusCode === 404 || statusCode === 403) {
      return {
        data: null,
        error: statusCode === 404 ? "NOT_FOUND" : "CMS_UNAVAILABLE",
      };
    }

    return {
      data: null,
      error: isProbablyNetworkError(error) ? "CMS_UNAVAILABLE" : "UNKNOWN",
    };
  }
}
