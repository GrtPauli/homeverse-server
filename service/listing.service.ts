import { CreateListingInput, Listing, ListingModel } from "../schema/listing.schema";
import { User } from "../schema/user.schema";


export default class ListingService {
    // async createListing(listing: CreateListingInput & {user: User['_id']}) {
    async createListing(listing: CreateListingInput) {
        return ListingModel.create(listing)
    }

    async getUserListings(userId: string) {
        return ListingModel.find().findByUserId(userId).sort({'createdAt': -1})
    }

    async getListings(){
        return ListingModel.find().sort({'createdAt': -1})
    }

    async getListing(id: string) {
        return ListingModel.findById(id)
    }
}