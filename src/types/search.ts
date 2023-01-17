export type SearchParams = {
    part: string,
    maxResults: number,
    key?: string,
    q: string
}

export type SearchResultItem = {
    id: {kind: string, videoId: string},
    snippet: {
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string,
                width: number,
                height: number
            }
        }
        publishedAt: string,
        publishTime: string,
    }
}
