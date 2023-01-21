export type SearchParams = {
    part?: string,
    maxResults?: number,
    key?: string,
    q?: string
} & URLSearchParams

export type Image = {
    height?: number
    url: string,
    width?: number,
}

export type SearchResultItem = {
    id: {
        kind: string,
        videoId?: string,
        playlistId? : string,
        channelId?: string
    },
    snippet: {
        channelTitle: string,
        description: string,
        publishedAt?: string,
        publishTime?: string,
        thumbnails: {
            default?: Image,
            high: Image,
            medium?: Image,
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

export type FilterDates = {
    lastYear: string,
    lastMonth: string,
    lastWeek: string,
    today: string
}
