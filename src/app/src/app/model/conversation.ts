export interface Conversation {
    url: string;
    browser: string;
    os: string;
    ipAddress: string;
    status: string;
    note: string;
    conversationId: string;
    lastMessage: Data[];
    nameConversation: string;
    unReadMessage: number;
    conversationType: string;
    shopId: string;
}

export class Data {
    key: string;
    value: string;
}
