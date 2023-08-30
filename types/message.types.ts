export interface NewMessagePayload {
    senderId: any;
    messageRoomId: string
     // dateString: string; // limitation of Redis payload serialization
    content: string;
}