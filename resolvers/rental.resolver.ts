import { Arg, Mutation, Query } from "type-graphql";
import RentalService from "../service/rental.service";
import { RentalInput, GetRentalsInput, Rental } from "../schema/rental.schema";

export default class RentalResolver {
    constructor(private rentalService: RentalService){
        this.rentalService = new RentalService()
    }

    @Mutation(() => Rental)
    createRental(@Arg('rental') rental: RentalInput){
        return this.rentalService.createRental(rental)
    }

    @Mutation(() => Rental)
    updateRental(@Arg('rental') rental: RentalInput, @Arg('id') id: string){
        return this.rentalService.updateRental(rental, id)
    }

    @Query(() => [Rental])
    getUserRentals(@Arg('input') input: GetRentalsInput){
        return this.rentalService.getUserRentals(input)
    }
}