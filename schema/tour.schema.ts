import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { Image, ImageInput, Location, LocationInput, Review, ReviewInput } from "./general.schema";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";

enum TourMethod {
    IN_PERSON,
    VIDEO_CALL
}

export enum TourRequestStatus {
    ACCEPTED,
    PENDING,
    CANCELLED
}

enum TourStatus {
    REQUEST_PENDING,
    REQUEST_CANCELLED,
    TOUR_PENDING,
    TOUR_CANCELLED,
    TOUR_COMPLETED
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

// function findByAgentId(this: ReturnModelType<typeof Tour, QueryHelpers>, agent: Tour['agent']) {
//     return this.findOne({agent})
// }

// interface QueryHelpers {
//     findByAgentId: AsQueryMethod<typeof findByAgentId>
// }

@ObjectType()
export class Tour {
    @Field(() => ID)
    _id: string

    @Field(() => ID)
    @prop({ required: true })
    propertyId: string

    @Field()
    @prop({ required: true })
    propertyListingDate: Date

    @Field(() => String)
    @prop({ required: true })
    touristName: string

    @Field(() => String)
    @prop({ required: true })
    touristId: string

    @Field(() => String)
    @prop({ required: true })
    touristPhoto: string

    @Field(() => String)
    @prop({ required: true })
    agentName: string

    @Field(() => String)
    @prop({ required: true })
    agentId: string

    @Field(() => String)
    @prop({ required: true })
    agentPhoto: string

    @Field(() => String, { nullable: true })
    @prop({ default: null })
    vcRoomId: string

    @Field(() => TourMethod)
    @prop({ required: true })
    method: TourMethod

    @Field(() => TourStatus)
    @prop({ required: true })
    tourStatus: TourStatus

    @Field()
    @prop({ required: true })
    tourScheduledDate: Date

    @Field(() => Review, { nullable: true })
    @prop({ default: null, _id: false })
    tourReview: Review

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

@ObjectType()
export class TourRequest {
    @Field(() => ID)
    _id: string

    @Field(() => String)
    @prop({ required: true })
    touristName: string

    @Field(() => String)
    @prop({ required: true })
    touristId: string

    @Field(() => String)
    @prop({ required: true })
    agentName: string

    @Field(() => String)
    @prop({ required: true })
    agentId: string

    @Field()
    @prop({ required: true })
    tourScheduledDate: Date

    @Field(() => TourMethod)
    @prop({ required: true })
    method: TourMethod

    @Field(() => ID)
    @prop({ required: true })
    propertyId: string

    @Field()
    @prop({ required: true })
    propertyListingDate: Date

    @Field(() => TourRequestStatus, { nullable: true })
    @prop({ default: TourRequestStatus.PENDING })
    requestStatus: TourRequestStatus

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const TourRequestModel = getModelForClass<typeof TourRequest>(TourRequest, {
    schemaOptions: { 
        timestamps : true
    }
})

@InputType()
export class CreateTourRequestInput {
    @Field(() => String)
    touristName: string

    @Field(() => String)
    touristId: string

    @Field(() => String)
    agentName: string

    @Field(() => String)
    agentId: string

    @Field()
    tourScheduledDate: Date

    @Field(() => TourMethod)
    method: TourMethod

    @Field(() => ID)
    propertyId: string

    @Field()
    propertyListingDate: Date
}

@InputType()
export class UpdateTourRequestStatusInput {
    @Field(() => TourRequestStatus)
    requestStatus: TourRequestStatus
}

@InputType()
export class GetTourInfoInput {
    @Field(() => String, { nullable: true })
    touristId: string

    @Field(() => String, { nullable: true })
    agentId: string
}

@InputType()
export class CreateTourInput {
    @Field(() => ID)
    propertyId: string

    @Field()
    propertyListingDate: Date

    @Field(() => String)
    touristName: string

    @Field(() => String)
    touristId: string

    @Field(() => String)
    touristPhoto: string

    @Field(() => String)
    agentName: string

    @Field(() => String)
    agentId: string

    @Field(() => String)
    agentPhoto: string

    @Field(() => String, { nullable: true })
    vcRoomId: string

    @Field(() => TourMethod)
    method: TourMethod

    @Field(() => TourStatus)
    tourStatus: TourStatus

    @Field()
    tourScheduledDate: Date
}

@InputType()
export class UpdateTourInput {
    @Field(() => String, { nullable: true })
    vcRoomId: string

    @Field(() => TourStatus, { nullable: true })
    tourStatus: TourStatus

    @Field(() => ReviewInput, { nullable: true })
    tourReview: ReviewInput
}

@InputType()
export class GetToursInput {
    @Field(() => String, { nullable: true })
    tourist: string

    @Field(() => String, { nullable: true })
    agent: string
}