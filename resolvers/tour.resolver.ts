import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TourService } from "../service/tour.service";
import { CreateTourInput, Tour, UpdateTourInput } from "../schema/tour.schema";


@Resolver()
export default class TourResolver {
    constructor(private tourService: TourService) {
        this.tourService = new TourService()
    }

    @Mutation(() => Tour)
    createTourRequest(@Arg('tour') tour: CreateTourInput) {
        return this.tourService.createTourRequest(tour)
    }

    @Query(() => [Tour])
    getTours(@Arg('agentId', { nullable: true }) agentId: string, @Arg('touristId', { nullable: true }) touristId: string){
        return this.tourService.getTours(agentId, touristId)
    }

    @Mutation(() => Tour)
    updateTour(@Arg('id') id: string, @Arg('tour') tour: UpdateTourInput){
        return this.tourService.updateTour(id, tour)
    }
}