import { api } from "./axios";

export async function getArticleById(articleId: string) {
    const response = await api.get(`/lms/article/${articleId}`);

    return response.data;
}

export async function getAssetStoreBundle(bundleName: string, refkey: string) {
    const response = await api.get(`/lms/asset-stores/bundle/${bundleName}/${refkey}`);

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