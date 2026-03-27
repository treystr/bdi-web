export const prerender = false;

import type { APIRoute } from 'astro';
import { getMerchantSlugPath } from '@utils/merchantSlug.js';

function getDirectusConfig() {
    const url = (import.meta.env.DIRECTUS_URL || import.meta.env.PUBLIC_DIRECTUS_URL || '').replace(/\/+$/, '');
    const headers: Record<string, string> = {};
    const token = import.meta.env.DIRECTUS_STATIC_TOKEN;
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return { url, headers };
}

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function searchPress(query: string, baseUrl: string, headers: Record<string, string>) {
    const endpoint = new URL('/items/Press', baseUrl);
    endpoint.searchParams.set('search', query);
    endpoint.searchParams.set('filter[status][_eq]', 'published');
    endpoint.searchParams.set('fields', 'id,Title,Subtitle,Date,type,Content');
    endpoint.searchParams.set('limit', '6');
    endpoint.searchParams.set('sort', '-Date');

    try {
        const resp = await fetch(endpoint.toString(), { headers });
        if (!resp.ok) return [];
        const json = await resp.json();
        return (json.data || []).map((item: any) => {
            const plainExcerpt = typeof item.Content === 'string'
                ? stripHtml(item.Content).slice(0, 200)
                : '';
            return {
                title: item.Title || 'Untitled',
                excerpt: item.Subtitle || plainExcerpt,
                url: `/news/${item.id}-${slugify(item.Title)}`,
                source: 'news',
            };
        });
    } catch {
        return [];
    }
}

async function searchMerchants(query: string, baseUrl: string, headers: Record<string, string>) {
    const endpoint = new URL('/items/Merchants', baseUrl);
    endpoint.searchParams.set('search', query);
    endpoint.searchParams.set('filter[status][_eq]', 'published');
    endpoint.searchParams.set('fields', 'id,Name,Short_Description');
    endpoint.searchParams.set('limit', '6');
    endpoint.searchParams.set('sort', 'Name');

    try {
        const resp = await fetch(endpoint.toString(), { headers });
        if (!resp.ok) return [];
        const json = await resp.json();
        return (json.data || []).map((item: any) => ({
            title: item.Name || 'Untitled',
            excerpt: item.Short_Description || '',
            url: getMerchantSlugPath(item),
            source: 'merchant',
        }));
    } catch {
        return [];
    }
}

function slugify(text: string): string {
    return String(text || '')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export const GET: APIRoute = async ({ url }) => {
    const query = url.searchParams.get('q')?.trim();
    if (!query) {
        return new Response(JSON.stringify({ data: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { url: directusUrl, headers } = getDirectusConfig();
    if (!directusUrl) {
        return new Response(JSON.stringify({ data: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const [pressResults, merchantResults] = await Promise.all([
        searchPress(query, directusUrl, headers),
        searchMerchants(query, directusUrl, headers),
    ]);

    return new Response(JSON.stringify({ data: [...pressResults, ...merchantResults] }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
