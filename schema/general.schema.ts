import { prop } from "@typegoose/typegoose"
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql"
import { Listing } from "./listing.schema"
import { Profile } from "./profile.schema"


@ObjectType()
export class Image {
    @Field(() => String)
    @prop({ required: true })
    id: string

    @Field(() => String)
    @prop({ required: true })
    name: string

    @Field(() => String)
    @prop({ required: true })
    uri: string
}

@ObjectType()
export class Location {
    @Field(() => String)
    @prop({ required: true })
    state: string

    @Field(() => String)
    @prop({ required: true })
    city: string

    @Field(() => String)
    @prop({ required: true })
    address: string

    @Field(() => Number, {nullable: true})
    @prop({default: null})
    zip: number
}

@ObjectType()
export class Review {
    @Field(() => Number)
    @prop({ required: true })
    rating: number

    @Field(() => String)
    @prop({ required: true })
    comment: string

    @Field(() => String)
    @prop({ required: true })
    name: string

    @Field(() => String)
    @prop({ required: true })
    photo: string

    @Field()
    @prop({ required: true })
    createdAt: Date

    @Field()
    @prop({ required: true })
    updatedAt: Date
}

@ObjectType()
export class HomePage {
    @Field(() => [Listing])
    newListings: Listing[]

    @Field(() => [Profile])
    topAgents: Profile[]
}

//////---------- INPUT TYPES ----------///////

@InputType()
export class ImageInput {
    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    uri: string
}

@InputType()
export class LocationInput {
    @Field(() => String)
    state: string

    @Field(() => String)
    city: string

    @Field(() => String)
    address: string

    @Field(() => Number)
    zip: number
}

@InputType()
export class ReviewInput {
    @Field(() => Number)
    rating: number

    @Field(() => String)
    comment: string

    @Field(() => String)
    name: string

    @Field(() => String)
    photo: string

    @Field({nullable: true})
    createdAt: Date

    @Field({nullable: true})
    updatedAt: Date
}

@InputType()
export class GenerateZegoTokenInput {
    @Field(() => Number)
    appID: number

    @Field(() => String)
    secret: string

    @Field(() => String)
    userId: string
}