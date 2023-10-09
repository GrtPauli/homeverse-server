import { Ref, ReturnModelType, getModelForClass, index, prop, queryMethod } from "@typegoose/typegoose";
import { Field, Float, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";

@ObjectType()
export class Rental {
    @Field(() => ID)
    _id: string

    @Field(() => String)
    @prop({required: true})
    ownerId: string

    @Field(() => String)
    @prop({required: true})
    homeType: string

    @Field(() => String)
    @prop({required: true})
    state: string

    @Field(() => String)
    @prop({required: true})
    city: string

    @Field(() => String)
    @prop({required: true})
    address: string

    @Field(() => Number)
    @prop({required: true})
    zip: number

    @Field(() => Number)
    @prop({required: true})
    creationStep: number

    @Field(() => Number)
    @prop({required: true})
    creationSubStep: number

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const RentalModel = getModelForClass<typeof Rental>(Rental, {
    schemaOptions: { 
        timestamps : true
    }
})

@InputType()
export class RentalInput {
    @Field(() => String)
    ownerId: string

    @Field(() => String)
    homeType: string

    @Field(() => String)
    state: string

    @Field(() => String)
    city: string

    @Field(() => String)
    address: string

    @Field(() => Number)
    zip: number

    @Field(() => Number)
    creationStep: number

    @Field(() => Number)
    creationSubStep: number
}

@InputType()
export class GetRentalsInput {
    @Field(() => String)
    ownerId: string
}