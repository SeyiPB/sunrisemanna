export interface Devotional {
    source: string;
    title: string;
    date: string;
    scripture?: string;
    content: string;
    author?: string;
    url: string;
}

export interface ScraperResult {
    success: boolean;
    data?: Devotional;
    error?: string;
}
