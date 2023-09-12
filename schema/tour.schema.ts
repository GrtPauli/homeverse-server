import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { IImage, IImageInput, ILocation, ILocationInput, IReview, IReviewInput } from "./general.schema";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";

enum TourMethod {
    IN_PERSON,
    VIDEO_CALL
}

enum TourRequestStatus {
    ACCEPTED,
    PENDING,
    CANCELLED
}

enum TourStatus {
    REQUEST_NOT_ACCEPTED,
    COMPLETED,
    PENDING,
    CANCELLED
}

registerEnumType(TourMethod, {
    name: "TourMethod",
    description: "Two different methods used for touring homes"
})

registerEnumType(TourRequestStatus, {
    name: "TourRequestStatus",
    description: "Representing the status of a tour request"
})

registerEnumType(TourStatus, {
    name: "TourStatus",
    description: "Representing the status of a tour"
})

function findByAgentId(this: ReturnModelType<typeof Tour, QueryHelpers>, agent: Tour['agent']) {
    return this.findOne({agent})
}

interface QueryHelpers {
    findByAgentId: AsQueryMethod<typeof findByAgentId>
}

@ObjectType()
export class Tour {
    @Field(() => ID)
    _id: string

    @Field(() => IImage)
    @prop({ required: true })
    propertyImg: IImage

    @Field(() => ID)
    @prop({ required: true })
    listingId: string

    @Field(() => Number)
    @prop({ required: true })
    price: number

    @Field(() => ILocation)
    @prop({ required: true })
    propertyLocation: ILocation

    @Field()
    @prop({ required: true })
    listedAt: Date

    @Field(() => String)
    @prop({ required: true })
    tourist: string

    @Field(() => String)
    @prop({ required: true })
    agent: string

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    vcUrl: string

    @Field(() => TourMethod)
    @prop({ required: true })
    method: TourMethod

    @Field(() => TourRequestStatus, { nullable: true })
    @prop({ default: TourRequestStatus.PENDING })
    requestStatus: TourRequestStatus

    @Field(() => TourStatus, { nullable: true })
    @prop({ default: TourStatus.REQUEST_NOT_ACCEPTED })
    tourStatus: TourStatus

    @Field(() => String)
    @prop({ required: true })
    tourScheduledDay: string

    @Field(() => String)
    @prop({ required: true })
    tourScheduledTime: string

    @Field(() => IReview, { nullable: true })
    @prop({ default: null })
    tourReview: IReview

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const TourModel = getModelForClass<typeof Tour>(Tour, {
    schemaOptions: { 
        timestamps : true
    }
})

@InputType()
export class CreateTourInput {
    @Field(() => IImageInput)
    propertyImg: IImageInput

    @Field(() => ID)
    listingId: string

    @Field(() => Number)
    price: number

    @Field(() => ILocationInput)
    propertyLocation: ILocationInput

    @Field()
    listedAt: Date

    @Field(() => String)
    tourist: string

    @Field(() => String)
    agent: string

    @Field(() => TourMethod)
    method: TourMethod

    @Field(() => String)
    tourScheduledDay: string

    @Field(() => String)
    tourScheduledTime: string
}

@InputType()
export class UpdateTourInput {
    @Field(() => String, { nullable: true })
    vcUrl: string

    @Field(() => TourRequestStatus, { nullable: true })
    requestStatus: TourRequestStatus

    @Field(() => TourStatus, { nullable: true })
    tourStatus: TourStatus

    @Field(() => IReviewInput, { nullable: true })
    tourReview: IReviewInput
}