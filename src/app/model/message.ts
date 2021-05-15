import { Attachment } from "./attachment";

export class Message {
    id: string;
    content: string;
    type: string;
    conversationId: string;
    receiverName: string;
    senderId: string;
    ConversationId: string;
    senderName: string;
    status: string;
    messageType: number;
    receiverId: string;
    attachmentDto: Attachment[];
}
