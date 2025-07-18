import axios from 'axios';

const KSP_API_URL = process.env.NEXT_PUBLIC_KSP_SIT_API_URL;

export async function createArticleAdmin(name: string, tagNames: string[], expectedDuration: number, content: string) {
    const response = await axios.post(`${KSP_API_URL}/article-admin/articles`, {
        code: 'AIP20250001',
        name: name,
        categoryId: 1,
        academyId: 1,
        imageUrl: `${KSP_API_URL}/images/academy.png`,
        aboutAuthor: 'Auto generated from LarnGearLM',
        authorUserId: 1,
        tagNames: tagNames,
        seoTitle: 'string',
        seoDescription: 'string',
        seoSlug: 'string'
    },
    {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    const articleId = await response.data.data.id;

    // Update content   
    await updateArticleAdminContent(articleId, expectedDuration, content);
    // Update settings
    await updateArticleAdminSetting(articleId);

    return response.data;
}

export async function updateArticleAdminContent(articleId: number, expectedDuration: number, content: string) {
    const response = await axios.put(`${KSP_API_URL}/article-admin/articles/${articleId}/content`, {
        expectedDuration: expectedDuration,
        contentHtml: content,
        contentJson: {
            blocks: [
                {
                    key: '59r4s',
                    data: {},
                    text: content,
                    type: 'unstyled',
                    depth: 0,
                    entityRanges: [],
                    inlineStyleRanges: []
                }
            ],
            entityMap: {}
        }
    }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    return response.data;
}

export async function updateArticleAdminSetting(articlesId: number) {
    const response = await axios.put(`${KSP_API_URL}/article-admin/articles/${articlesId}/setting`, {
        status: "published",
        startPublishAt: null,
        endPublishAt: null,
        reviewMode: "normal",
        allowDiscussion: true,
        seoTitle: "string",
        seoDescription: "string",
        seoSlug: "string"
    }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    return response.data;
}
