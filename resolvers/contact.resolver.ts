import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Context from "../types/context";
import ContactService from "../service/contact.service";
import { ContactRequestInput } from "../schema/contact.schema";

@Resolver()
export default class ContactResolver {
    constructor(private contactService: ContactService) {
        this.contactService = new ContactService()
    }
    
    // @Authorized()
    @Mutation(() => Boolean)
    sendContactRequest(@Arg('receiver') receiver: ContactRequestInput, 
        @Arg('sender') sender: ContactRequestInput
    ) {
        return this.contactService.sendContactRequest(receiver, sender)
    }

    // @Authorized()
    @Mutation(() => Boolean)
    acceptContactRequest(@Arg('senderId') senderId: string, @Arg('receiverId') receiverId: string){
        // const user = context.user
        // const userId = user?._id ? user?._id : user?.sub
        return this.contactService.acceptContactRequest(senderId, receiverId)
    }
}