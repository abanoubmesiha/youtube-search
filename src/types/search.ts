export type SearchParams = {
    part?: string,
    maxResults?: number,
    key?: string,
    q?: string
}

export type Image = {
    height: number
    url: string,
    width: number,
}

export type SearchResultItem = {
    id: {kind: string, videoId: string},
    snippet: {
        channelTitle: string,
        description: string,
        publishedAt: string,
        publishTime: string,
        thumbnails: {
            default: Image,
            high: Image,
            medium: Image,
        }
        title: string,
    }
}

export type SearchResult = {
    items?: SearchResultItem[],
    pageInfo?: {totalResults: number, resultsPerPage: number},
    loading?: boolean,
    error?: { code: number, message: string }
}
