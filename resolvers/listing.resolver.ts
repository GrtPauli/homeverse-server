import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { CreateListingInput, Listing } from "../schema/listing.schema";
import ListingService from "../service/listing.service";
import Context from "../types/context";

export default class ListingResolver {

    constructor(private listingService: ListingService) {
        this.listingService = new ListingService()
    }   

    // @Authorized()
    @Mutation(() => Listing)
    createListing(@Arg('userId') userId: string, @Arg('listing') listing: CreateListingInput){
        // const user = context.user
        return this.listingService.createListing({ ...listing, agent: userId })
    }

    // @Authorized()
    @Query(() => [Listing])
    getUserListings(@Arg('userId') userId: string){
        // const user = context.user
        // const userId = user?._id ? user?._id : user?.sub
        return this.listingService.getUserListings(userId)
    }

    @Query(() => [Listing])
    getListings(){
        return this.listingService.getListings()
    }

    @Query(() => Listing)
    getListing(@Arg('id') id: string){
        return this.listingService.getListing(id)
    }
}