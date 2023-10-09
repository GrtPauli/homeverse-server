import { RentalInput, GetRentalsInput, RentalModel } from "../schema/rental.schema";

export default class RentalService {
    async createRental(rental: RentalInput){
        return RentalModel.create(rental)
    }

    async getUserRentals(input: GetRentalsInput){
        return RentalModel.find(input)
    }

    async updateRental(rental: RentalInput, id: string){
        const updatedRental = await RentalModel.findByIdAndUpdate(id, 
            {...rental},
            { returnDocument: "after" }
        )

        return updatedRental
    }
}