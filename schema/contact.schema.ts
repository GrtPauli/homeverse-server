import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user.schema";

export enum ContactRequestPosition {
    RECEIVER,
    SENDER
}

export enum ContactStatus {
    NEW = "New",
    ATTEMPTED_CONTACT = "Attempted Contact",
    SPOKE_WITH_CUSTOMER = "Spoke With Customer",
    APPOINTMENT_SET = "Appointment Set",
    MET_WITH_CUSTOMER = "Met With Customer",
    LISTING_AGREEMENT = "Listing Agreement",
    ACTIVE_LISTING = "Active Listing",
    SALE_CLOSED = "Sale Closed",
    REJECTED = "Rejected"
}

registerEnumType(ContactStatus, {
    name: "ContactRequestPosition",
    description: "Describing whether you are sender or reciever of a request"
})

registerEnumType(ContactRequestPosition, {
    name: "ContactStatus",
    description: "Describing current status of communication with contact"
})

@ObjectType()
export class Contact{
    @Field(() => ID, {nullable: true})
    id: string

    @Field(() => String, {nullable: true})
    name: string

    @Field(() => String, {nullable: true})
    photo: string

    @Field(() => String, {nullable: true})
    email: string

    @Field(() => Number, {nullable: true})
    createdAt: number

    @Field(() => ContactStatus, {nullable: true})
    status: ContactStatus
}

@ObjectType()
export class ContactRequest{
    @Field(() => ID, {nullable: true})
    id: string

    @Field(() => String, {nullable: true})
    name: string

    @Field(() => String, {nullable: true})
    photo: string

    @Field(() => String, {nullable: true})
    email: string

    @Field(() => String, {nullable: true})
    msg: string

    @Field(() => Number, {nullable: true})
    createdAt: number

    @Field(() => ContactRequestPosition, {nullable: true})
    position: ContactRequestPosition
}

@InputType()
export class ContactRequestInput{
    @Field(() => ID, {nullable: true})
    id: string
    
    @Field(() => String, {nullable: true})
    name: string

    @Field(() => String, {nullable: true})
    photo: string

    @Field(() => String, {nullable: true})
    email: string

    @Field(() => String, {nullable: true})
    msg: string
}

// @InputType()
// export class SendContactInput {
//     @Field(() => String, {nullable: true})
//     _id: string

//     @Field(() => String, {nullable: true})
//     firstname: string

//     @Field(() => String, {nullable: true})
//     lastname: string

//     @Field(() => String, {nullable: true})
//     photo: string
// }