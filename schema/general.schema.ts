import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql"


@ObjectType()
export class IImage {
    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    uri: string
}

@ObjectType()
export class ILocation {
    @Field(() => String)
    country: string

    @Field(() => String)
    countryFlag: string

    @Field(() => String)
    state: string

    @Field(() => String)
    city: string
}

@ObjectType()
export class IReview {
    @Field(() => Number)
    rating: number

    @Field(() => String)
    review: string

    @Field(() => String)
    name: string

    @Field(() => IImage)
    image: IImage

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

//////---------- INPUT TYPES ----------///////

@InputType()
export class IImageInput {
    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    uri: string
}

@InputType()
export class ILocationInput {
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
export class IReviewInput {
    @Field(() => Number)
    rating: number

    @Field(() => String)
    review: string

    @Field(() => String)
    name: string

    @Field(() => IImageInput)
    image: IImageInput

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