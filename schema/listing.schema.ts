import { Ref, ReturnModelType, getModelForClass, index, prop, queryMethod } from "@typegoose/typegoose";
import { Field, Float, ID, InputType, Int, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./user.schema";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";

enum HomeType {
    SINGLE_FAMILY = "Single Family",
    CONDO = "Condo",
    TOWNHOUSE = "Townhouse",
    MULTI_FAMILY = "Multi Family",
    APARTMENT = "Apartment",
    MOBILE_MANUFACTURED = "Mobile / Manufactured",
    COOP_UNIT = "Coop Unit",
    VACANT_LAND = "Vacant Land",
    OTHER = "Other"
}

enum LotUnit {
    SQ_FT = "Sq ft",
    ACRES = "Acres"
}

enum PropertySizeUnit {
    FT_SQUARE = "ft²",
    MT_SQUARE = "m²"
}

enum BasementType {
    CARPET = "Carpet",
    LAMINATE = "Laminate",
    CONCRETE = "Concrete",
    LINOLEUM_VINYL = "Linoleum / Vinyl"
}

enum ArchitecturalStyle {
    BUNGALOW = "Bungalow",
    MODERN = "Modern",
    GEORGIAN = "Georgian",
    CAPE_COD = "Cape Cod",
    QUEEN_ANE_VICTORIAN = "Queen Anne / Victorian",
    RANCH_RAMBLER = "Ranch / Rambler",
    SANTA_FE_PUEBLO_STYLE = "Santa Fe / Pueblo Style",
    SPLIT_LEVEL = "Split-Level",
    COLONIAL = "Colonial",
    CONTEMPORARY = "Contemporary",
    CRAFTSMAN = "Craftsman",
    TUDOR = "Tudor",
    SPANISH = "Spanish",
    FRENCH = "French",
    LOFT = "Loft",
    OTHER = "Other"
}

enum ListingStatus {
    ACTIVE = "Active",
    SOLD = "Sold",
    IN_TRANSACTION = "In Transaction",
    UNLISTED = "Unlisted"
}

registerEnumType(HomeType, {
    name: "HomeType",
    description: "Various home types for your choosing"
})

registerEnumType(LotUnit, {
    name: "LotUnit",
    description: "Different units for determing the lot size"
})

registerEnumType(BasementType, {
    name: "BasementType",
    description: "Different types for representing house basement"
})

registerEnumType(ArchitecturalStyle, {
    name: "ArchitecturalStyle",
    description: "Different types for representing architectural style"
})

registerEnumType(PropertySizeUnit, {
    name: "PropertySizeUnit",
    description: "Different units for determing the property size"
})

registerEnumType(ListingStatus, {
    name: "ListingStatus",
    description: "Different units for determing the property size"
})

function findByUserId(this: ReturnModelType<typeof Listing, QueryHelpers>, userId: Listing['agent']) {
    return this.find({agent: userId})
}

interface QueryHelpers {
    findByUserId: AsQueryMethod<typeof findByUserId>
}

@ObjectType()
export class IListingImage {
    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    uri: string
}

@index({user: 1})
@queryMethod(findByUserId)
@ObjectType()
export class Listing {
    @Field(() => ID)
    _id: string

    @Field(() => Number, {nullable: true})
    @prop({default: null})
    price: number

    @Field(() => String, {nullable: true})
    @prop({default: null})
    homeType: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    description: string

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

    @Field(() => [IListingImage], {nullable: true})
    @prop({default: null})
    photos: IListingImage[]

    @Field(() => Number, {nullable: true})
    @prop({default: null})
    yearBuilt: number

    @Field(() => String, {nullable: true})
    @prop({default: null})
    owner: string

    @Field(() => String, {nullable: true})
    @prop({default: null})
    agent: string

    @Field(() => ListingStatus, { nullable: true })
    @prop({default: ListingStatus.ACTIVE})
    status: ListingStatus

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    bedrooms: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    totalRooms: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    totalGarages: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    fullBathrooms: number 

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    threeFourBathrooms: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    oneTwoBathrooms: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    oneFourBathrooms: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    propertySize: number

    @Field(() => String, { nullable: true })
    @prop({default: null})
    propertySizeUnit: string

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    basementSqFt: number

    @Field(() => Number, { nullable: true })
    @prop({default: null})
    garageSqFt: number

    @Field(() => String, { nullable: true })
    @prop({default: null}) 
    relatedWebsite: string

    @Field(() => String, { nullable: true })
    @prop({default: null}) 
    virtualTourURL: string

    @Field(() => String, { nullable: true })
    @prop({default: null})
    basement: string

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    rooms: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    floorCovering: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    indoorFeatures: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    appliances: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    heatingType: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    heatingFuel: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    coolingType: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    parking: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    view: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    roof: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    exterior: string[]

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    buildingAmenities: string[]

    @Field(() => String, { nullable: true })
    @prop({default: null})
    architecturalStyle: string

    @Field(() => [String], { nullable: true })
    @prop({default: null})
    outdoorAmenities: string[]

    @Field()
    createdAt: Date

    @Field()
    updatedAt: Date
}

export const ListingModel = getModelForClass<typeof Listing, QueryHelpers>(Listing, {
    schemaOptions: { 
        timestamps : true
    }
})

@InputType()
export class IListingImageInput {
    @Field(() => String)
    id: string

    @Field(() => String)
    name: string

    @Field(() => String)
    uri: string
}

@InputType()
export class CreateListingInput {
    @Field(() => Number, {nullable: true})
    price: number

    @Field(() => String, {nullable: true})
    homeType: string

    @Field(() => String, {nullable: true})
    description: string

    @Field(() => String, {nullable: true})
    country: string

    @Field(() => String, {nullable: true})
    countryFlag: string

    @Field(() => String, {nullable: true})
    state: string

    @Field(() => String, {nullable: true})
    city: string

    @Field(() => [IListingImageInput], {nullable: true})
    photos: IListingImageInput[]

    @Field(() => Number, {nullable: true})
    yearBuilt: number

    @Field(() => String, {nullable: true})
    owner: string

    @Field(() => String, {nullable: true})
    agent: string

    @Field(() => Number, { nullable: true })
    bedrooms: number

    @Field(() => Number, { nullable: true })
    totalRooms: number

    @Field(() => Number, { nullable: true })
    totalGarages: number

    @Field(() => Number, { nullable: true })
    fullBathrooms: number 

    @Field(() => Number, { nullable: true })
    threeFourBathrooms: number

    @Field(() => Number, { nullable: true })
    oneTwoBathrooms: number

    @Field(() => Number, { nullable: true })
    oneFourBathrooms: number

    @Field(() => Number, { nullable: true })
    propertySize: number

    @Field(() => String, { nullable: true })
    propertySizeUnit: string

    @Field(() => Number, { nullable: true })
    basementSqFt: number

    @Field(() => Number, { nullable: true })
    garageSqFt: number

    @Field(() => String, { nullable: true })
    relatedWebsite: string

    @Field(() => String, { nullable: true })
    virtualTourURL: string

    @Field(() => String, { nullable: true })
    basement: string

    @Field(() => [String], { nullable: true })
    rooms: string[]

    @Field(() => [String], { nullable: true })
    floorCovering: string[]

    @Field(() => [String], { nullable: true })
    indoorFeatures: string[]

    @Field(() => [String], { nullable: true })
    appliances: string[]

    @Field(() => [String], { nullable: true })
    heatingType: string[]

    @Field(() => [String], { nullable: true })
    heatingFuel: string[]

    @Field(() => [String], { nullable: true })
    coolingType: string[]

    @Field(() => [String], { nullable: true })
    parking: string[]

    @Field(() => [String], { nullable: true })
    view: string[]

    @Field(() => [String], { nullable: true })
    roof: string[]

    @Field(() => [String], { nullable: true })
    exterior: string[]

    @Field(() => [String], { nullable: true })
    buildingAmenities: string[]

    @Field(() => String, { nullable: true })
    architecturalStyle: string

    @Field(() => [String], { nullable: true })
    outdoorAmenities: string[]
}

@InputType()
export class GetListingInput {
    @Field(() => ID)
    listingId: string
}