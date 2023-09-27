import { CreateListingInput, Listing, ListingFilterInput, ListingModel, UpdateListingInput } from "../schema/listing.schema";
import { User } from "../schema/user.schema";


export default class ListingService {
    // async createListing(listing: CreateListingInput & {user: User['_id']}) {
    async createListing(listing: CreateListingInput) {
        return ListingModel.create(listing)
    }

    async getUserListings(userId: string) {
        return ListingModel.find().findByUserId(userId).sort({'createdAt': -1})
    }

    async updateListing(id: string, listing: UpdateListingInput){
        const updatedListing = await ListingModel.findByIdAndUpdate(id, 
            {...listing},
            { returnDocument: "after" }
        )

        return updatedListing
    }

    async getListings(filter?: ListingFilterInput){
        let param: any = {}
        filter?.minPrice && (param = { ...param, price: { ...param?.price, $gte: filter?.minPrice }})
        filter?.maxPrice && (param = { ...param, price: { ...param?.price, $lte: filter?.maxPrice }})
        filter?.state && (param = { ...param, state: filter?.state })
        filter?.city && (param = { ...param, city: filter?.city })
        filter?.bedrooms && ( filter?.bedrooms !== "Any" && (param = { ...param, bedrooms: { $gte: parseInt(filter?.bedrooms) }}))
        filter?.bathrooms && ( filter?.bathrooms !== "Any" && (param = { ...param, bathrooms: { $gte: parseInt(filter?.bathrooms) }}))

        return ListingModel.find(param).sort({'createdAt': -1})
    }

    async getListing(id: string) {
        return ListingModel.findById(id)
    }
}