import { ListingModel } from "../schema/listing.schema";
import { CreateTourRequestInput, TourModel, UpdateTourInput, GetToursInput, TourRequestModel, GetTourInfoInput, TourRequestStatus, UpdateTourRequestStatusInput, CreateTourInput } from "../schema/tour.schema";


export class TourService {
    async createTourRequest(request: CreateTourRequestInput) {
        return TourRequestModel.create(request)
    }

    async createTour(tour: CreateTourInput){
        return TourModel.create(tour)
    }

    async getTourRequests(input: GetTourInfoInput) {
        return TourRequestModel.find(input).sort({'createdAt': -1})
    }

    async getTours(input: GetTourInfoInput) {
       return TourModel.find(input).sort({'createdAt': -1})
    }

    async updateTourRequestStatus(id: string, request: UpdateTourRequestStatusInput, vcRoomId?: string){
        const updatedTourRequest = await TourRequestModel.findByIdAndUpdate(id, 
            { ...request }, 
            { returnDocument: "after" }
        )

        const listing = await ListingModel.findById(updatedTourRequest.propertyId)
        
        const tour = await TourModel.create({
            agentId: updatedTourRequest.agentId,
            agentName: updatedTourRequest.agentName,
            method: updatedTourRequest.method,
            price: listing.price,
            propertyId: updatedTourRequest.propertyId,
            propertyImg: listing.photos[0],
            propertyListingDate: updatedTourRequest.propertyListingDate,
            propertyLocation: {
                country: listing.country,
                countryFlag: listing.countryFlag,
                state: listing.state,
                city: listing.city
            },
            vcRoomId: vcRoomId ? vcRoomId : null,
            touristId: updatedTourRequest.touristId,
            touristName: updatedTourRequest.touristName,
            tourScheduledDate: updatedTourRequest.tourScheduledDate,
        })

        return updatedTourRequest
    }

    async updateTour(id: string, tour: UpdateTourInput){
        const updatedTour = await TourModel.findByIdAndUpdate(id, 
            { ...tour }, 
            { returnDocument: "after" }
        )

        return updatedTour
    }
}