import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./user.schema";
import { Ref, getModelForClass, prop } from "@typegoose/typegoose";


@ObjectType()
export class Message {
    // @Field(() => ID)
    // @prop({required: true})
    // messageRoomId: string
    
    @Field(() => ID)
    @prop({required: true})
    senderId: Ref<User>

    @Field(() => String)
    @prop({required: true})
    content: string
}

@ObjectType()
export class MessageRoom {
    @Field(() => ID)
    _id: string

    @Field(() => [ID])
    @prop({required: true})
    members: string[]

    @Field(() => [Message])
    @prop()
    messages: Message[]
}

export const MessageRoomModel = getModelForClass<typeof MessageRoom>(MessageRoom)

@InputType()
export class SendMessageInput {
    @Field(() => String)
    messageRoomId: string

    @Field(() => String)
    content: string
}

@InputType()
export class NewMessageInput {
    @Field(() => String)
    messageRoomId: string
}