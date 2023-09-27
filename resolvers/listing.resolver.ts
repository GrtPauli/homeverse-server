import { Arg, Authorized, Ctx, Mutation, Query } from "type-graphql";
import { CreateListingInput, Listing, ListingFilterInput, UpdateListingInput } from "../schema/listing.schema";
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
    getListings(@Arg('filter', {nullable: true}) filter?: ListingFilterInput){
        return this.listingService.getListings(filter)
    }

    @Mutation(() => Listing)
    updateListing(@Arg('id') id: string, @Arg('listing') listing: UpdateListingInput){
        return this.listingService.updateListing(id, listing)
    }

    @Query(() => Listing)
    getListing(@Arg('id') id: string){
        return this.listingService.getListing(id)
    }
}