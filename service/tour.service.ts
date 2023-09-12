import { CreateTourInput, TourModel, UpdateTourInput } from "../schema/tour.schema";


export class TourService {
    async createTourRequest(tour: CreateTourInput) {
        return TourModel.create(tour)
    }

    async getTours(agentId: string, touristId: string) {
        if(agentId){
            return TourModel.find({agent: agentId})
        }
        else if(touristId){
            return TourModel.find({tourist: touristId})
        }
    }

    async updateTour(id: string, tour: UpdateTourInput){
        const updatedTour = await TourModel.findByIdAndUpdate(id, 
            { ...tour }, 
            { returnDocument: "after" }
        )
        
        return updatedTour
    }
}