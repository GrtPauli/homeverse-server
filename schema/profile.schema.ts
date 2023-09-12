import { ReturnModelType, getModelForClass, index, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { User, UserType } from "./user.schema";
import { Contact, ContactRequest } from "./contact.schema";

function findByUserId(this: ReturnModelType<typeof Profile, QueryHelpers>, userId: Profile['userId']) {
    return this.findOne({userId})
}

interface QueryHelpers {
    findByUserId: AsQueryMethod<typeof findByUserId>
}

@ObjectType()
class AgentInfo{
    @Field(() => String, {nullable: true})
    professionalTitle: string 

    @Field(() => String, {nullable: true})
    brokerageName: string 

    @Field(() => String, {nullable: true})
    brokerageAddress: string

    @Field(() => String, {nullable: true})
    primaryPhone: string

    @Field(() => String, {nullable: true})
    brokeragePhone: string

    @Field(() => Int, {nullable: true})
    inBusinessSince: string

    // @Field(() => [String], {nullable: true})
    // specialties: string[]

    // @Field(() => [String], {nullable: true})
    // languages: string[]

    @Field(() => String, {nullable: true})
    profileVideo: string

    @Field(() => String, {nullable: true})
    website: string

    @Field(() => String, {nullable: true})
    blog: string
      
    @Field(() => String, {nullable: true})
    facebook: string

    @Field(() => String, {nullable: true})
    twitter: string

    @Field(() => String, {nullable: true})
    linkedIn: string
}

@index({userId: 1})
@queryMethod(findByUserId)
@ObjectType()
export class Profile {
    @Field(() => ID)
    _id: string

    @Field(() => ID)
    @prop({ required: true })
    userId: string

    // @Field(() => ID)
    // @prop({ required: true })
    // conversationListId: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    about: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    phone: string

    @Field(() => UserType, { nullable: true })
    @prop({default: UserType.BUYER_OR_SELLER})
    userType: UserType

    // @Field(() => String, {nullable: true})
    // // @prop({default: process.env.DEFAULT_PHOTO })
    // @prop({default: null})
    // photo: string

    @Field(() => [Contact], {nullable: true})
    @prop({default: null})
    contacts: Contact[]

    @Field(() => [ContactRequest], {nullable: true})
    @prop({default: null})
    contactRequests: ContactRequest[]

    @Field(() => [String], {nullable: true})
    @prop({default: null})
    reviews: string[]

    @Field(() => String, {nullable: true})
    @prop({default: null})
    country: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    countryFlag: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    state: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    city: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    professionalTitle: string 

    @Field(() => String, {nullable: true})
    @prop({default: null})
    brokerageName: string 

    @Field(() => String, {nullable: true})
    @prop({default: null})
    brokerageAddress: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    primaryPhone: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    brokeragePhone: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    inBusinessSince: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    profileVideo: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    website: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    blog: string
      
    @Field(() => String, {nullable: true})
    @prop({default: null})
    facebook: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    twitter: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    linkedIn: string
}

export const ProfileModel = getModelForClass<typeof Profile, QueryHelpers>(Profile)

@InputType()
export class CreateProfileInput {
    @Field(() => ID)
    userId: string

    @Field(() => ID)
    conversationListId: string
}

@InputType()
export class UpdateProfileInput {
    @Field(() => String, {nullable: true})
    phone: string

    @Field(() => String, {nullable: true})
    about: string

    // @Field(() => String, {nullable: true})
    // photo: string

    @Field(() => [String], {nullable: true})
    reviews: string[]

    @Field(() => UserType, { nullable: true })
    userType: UserType

    @Field(() => String, {nullable: true})
    country: string

    @Field(() => String, {nullable: true})
    countryFlag: string

    @Field(() => String, {nullable: true})
    state: string

    @Field(() => String, {nullable: true})
    city: string

    @Field(() => String, {nullable: true})
    professionalTitle: string 

    @Field(() => String, {nullable: true})
    brokerageName: string 

    @Field(() => String, {nullable: true})
    brokerageAddress: string

    @Field(() => String, {nullable: true})
    primaryPhone: string

    @Field(() => String, {nullable: true})
    brokeragePhone: string

    @Field(() => String, {nullable: true})
    inBusinessSince: string

    @Field(() => String, {nullable: true})
    profileVideo: string

    @Field(() => String, {nullable: true})
    website: string

    @Field(() => String, {nullable: true})
    blog: string
      
    @Field(() => String, {nullable: true})
    facebook: string

    @Field(() => String, {nullable: true})
    twitter: string

    @Field(() => String, {nullable: true})
    linkedIn: string
}

@InputType()
export class GetProfileInput {
    @Field(() => ID)
    userId: string
}