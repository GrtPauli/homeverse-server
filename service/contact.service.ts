import { Contact, ContactRequest, ContactRequestInput, ContactRequestPosition, ContactStatus } from "../schema/contact.schema";
import { MessageRoomModel } from "../schema/message.schema";
import { ProfileModel } from "../schema/profile.schema";


export default class ContactService {
    async sendContactRequest(receiverRequest: ContactRequestInput, senderRequest: ContactRequestInput){
        let receiverContactRequest: ContactRequest
        let senderContactRequest: ContactRequest
        
        const receiver = await ProfileModel.find().findByUserId(receiverRequest.id)
        receiverContactRequest = {
            id: senderRequest.id,
            email: senderRequest.email,
            name: senderRequest.name,
            msg: senderRequest.msg,
            photo: senderRequest.photo,
            createdAt: Date.now(),
            position: ContactRequestPosition.RECEIVER
        }

        const sender = await ProfileModel.find().findByUserId(senderRequest.id)
        senderContactRequest = {
            id: receiverRequest.id,
            email: receiverRequest.email,
            name: receiverRequest.name,
            msg: null,
            photo: receiverRequest.photo,
            createdAt: Date.now(),
            position: ContactRequestPosition.SENDER
        }
        
        await ProfileModel.findByIdAndUpdate(receiver._id, 
            { contactRequests: [receiverContactRequest, ...receiver.contactRequests] }, 
            // { returnDocument: "after" }
        )

        await ProfileModel.findByIdAndUpdate(sender._id, 
            { contactRequests: [senderContactRequest, ...sender.contactRequests] }, 
            // { returnDocument: "after" }
        )
        
        return true
    }

    async acceptContactRequest(senderId: string, receiverId: string){
        let receiverContactRequest: ContactRequest
        let senderContactRequest: ContactRequest
        let receiverContact: Contact
        let senderContact: Contact
        const receiver = await ProfileModel.find().findByUserId(receiverId)
        const sender = await ProfileModel.find().findByUserId(senderId)
        receiverContactRequest = receiver.contactRequests.filter(item => item.id == senderId)[0]
        senderContactRequest = sender.contactRequests.filter(item => item.id == receiverId)[0]

        receiverContact = {
            id: receiverContactRequest.id,
            email: receiverContactRequest.email,
            name: receiverContactRequest.name,
            photo: receiverContactRequest.photo,
            createdAt: Date.now(),
            status: ContactStatus.NEW
        }

        senderContact = {
            id: senderContactRequest.id,
            email: senderContactRequest.email,
            name: senderContactRequest.name,
            photo: senderContactRequest.photo,
            createdAt: Date.now(),
            status: ContactStatus.NEW
        }

        await ProfileModel.findByIdAndUpdate(receiver._id, 
            { 
                contactRequests: receiver.contactRequests.filter((item) => item.id !== senderId), 
                contacts: [receiverContact, ...receiver.contacts]
            }, 
        )

        await ProfileModel.findByIdAndUpdate(sender._id, 
            { 
                contactRequests: sender.contactRequests.filter((item) => item.id !== receiverId), 
                contacts: [senderContact, ...sender.contacts]
            }, 
        )
        
        return true
    }
}