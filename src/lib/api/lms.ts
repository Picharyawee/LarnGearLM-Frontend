import { api } from "./axios";

export async function getArticleById(articleId: string) {
    const response = await api.get(`/lms/article/${articleId}`);

    return response.data;
}

export async function getAssetStoreBundle(bundleName: string, refKey: string) {
    const response = await api.get(`/lms/asset-stores/bundle/${bundleName}/${refKey}`);

    return response.data;
}

export async function queryResources(query: string) {
    const response = await api.post("/lms/search", null, {
        params: {
            query: query
        },
    });

    return response.data.results;
}

export async function useLmsResource(type: number, fileName: string, articleId?: string, bundleName?: string, refKey?: string) {
    const response = await api.post("/lms/use-lms-resource", null, {
        params: {
            type: type,
            fileName: fileName,
            articleId: articleId,
            bundleName: bundleName,
            refKey: refKey,
        },
    });

    return response;
}