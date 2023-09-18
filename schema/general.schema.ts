import { prop } from "@typegoose/typegoose"
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql"


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
    country: string

    @Field(() => String)
    @prop({ required: true })
    countryFlag: string

    @Field(() => String)
    @prop({ required: true })
    state: string

    @Field(() => String)
    @prop({ required: true })
    city: string
}

@ObjectType()
export class Review {
    @Field(() => Number)
    @prop({ required: true })
    rating: number

    @Field(() => String)
    @prop({ required: true })
    review: string

    @Field(() => String)
    @prop({ required: true })
    name: string

    @Field(() => Image)
    @prop({ required: true })
    image: Image

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
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
    country: string

    @Field(() => String)
    countryFlag: string

    @Field(() => String)
    state: string

    @Field(() => String)
    city: string
}

@InputType()
export class ReviewInput {
    @Field(() => Number)
    rating: number

    @Field(() => String)
    review: string

    @Field(() => String)
    name: string

    @Field(() => ImageInput)
    image: ImageInput

    @Field()
    createdAt: Date

    @Field()
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