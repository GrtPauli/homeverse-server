import { Message, MessageRoomModel, SendMessageInput } from "../schema/message.schema";
import { User } from "../schema/user.schema";


export default class MessageService {
    async sendMessage(message: SendMessageInput & {senderId: User['_id']}) {
        let msg: Message
        const messageRoom = await MessageRoomModel.findById(message.messageRoomId)
        msg = {
            messageRoomId: message.messageRoomId,
            content: message.content,
            senderId: message.senderId
        }

        await MessageRoomModel.findByIdAndUpdate(message.messageRoomId, 
            { messages: [...messageRoom.messages, msg] }, 
        )

        return msg
    }

    async getMessageRoom(id: string){
        const messageRoom = await MessageRoomModel.findById(id)

        return messageRoom
    }
}