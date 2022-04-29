export interface iNewsStand {
    name: string;
    chip: string;
    total: string;
    totaltext: string;
    breakdown?: iBreakdown[];
    news: iNewsItem[];
}

export interface iNewsItem {
    name: string;
    logo: string;
    color: string;
    total: string;
    subtotal?: string;
}

export interface iBreakdown {
    text: string;
    total: string;
    color: string;
}
