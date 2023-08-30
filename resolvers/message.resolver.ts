import { Arg, Args, Authorized, Ctx, Mutation, PubSub, Publisher, Query, Resolver, ResolverFilterData, Root, Subscription } from "type-graphql";
import MessageService from "../service/message.service";
import Context from "../types/context";
import { Message, MessageRoom, NewMessageInput, SendMessageInput } from "../schema/message.schema";
import { Topics } from "../constants/topic";
import { NewMessagePayload } from "../types/message.types";


@Resolver()
export default class MessageResolver {
    constructor(private messageService: MessageService) {
        this.messageService = new MessageService()
    }   

    @Authorized()
    @Mutation(() => Boolean)
    async sendMessage(
        @Arg('message') message: SendMessageInput, 
        @PubSub(Topics.NewMessage) notifyAboutNewMessage: Publisher<NewMessagePayload>,
        @Ctx() context: Context
    ){
        const user = context.user
        const msg = await this.messageService.sendMessage({ ...message, senderId: user?._id ? user?._id : user?.sub  })
        await notifyAboutNewMessage({
            content: msg.content,
            senderId: msg.senderId,
            messageRoomId: message.messageRoomId
        })

        return true
    }

    @Subscription(() => Message, {
        topics: Topics.NewMessage,
        filter: ({ payload, args }: ResolverFilterData<NewMessagePayload, NewMessageInput>) => {
          return payload.messageRoomId === args.messageRoomId  
        }
    })
    newMessage(@Root() newMessage: NewMessagePayload, @Arg('messageRoomId') messageRoomId: string ): Message{
        return {
            content: newMessage.content,
            senderId: newMessage.senderId
        }
    }

    @Query(() => MessageRoom)
    getMessageRoom(@Arg('id') id: string){
        return this.messageService.getMessageRoom(id)
    }
}