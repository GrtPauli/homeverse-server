import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { TourService } from "../service/tour.service";
import { CreateTourInput, CreateTourRequestInput, GetTourInfoInput, GetToursInput, Tour, TourRequest, TourRequestStatus, UpdateTourInput, UpdateTourRequestStatusInput } from "../schema/tour.schema";


@Resolver()
export default class TourResolver {
    constructor(private tourService: TourService) {
        this.tourService = new TourService()
    }

    @Mutation(() => Tour)
    createTour(@Arg('tour') tour: CreateTourInput){
        return this.tourService.createTour(tour)
    }

    @Mutation(() => TourRequest)
    createTourRequest(@Arg('request') request: CreateTourRequestInput) {
        return this.tourService.createTourRequest(request)
    }

    @Query(() => [TourRequest])
    getTourRequests(@Arg('input') input: GetTourInfoInput){
        return this.tourService.getTourRequests(input)
    }

    @Query(() => [Tour])
    getTours(@Arg('input') input: GetTourInfoInput){
        return this.tourService.getTours(input)
    }

    @Mutation(() => TourRequest)
    updateTourRequestStatus(@Arg('id') id: string, @Arg('request') request: UpdateTourRequestStatusInput, @Arg('vcRoomId', {nullable: true}) vcRoomId: string){
        return this.tourService.updateTourRequestStatus(id, request, vcRoomId)
    }

    @Mutation(() => Tour)
    updateTour(@Arg('id') id: string, @Arg('tour') tour: UpdateTourInput){
        return this.tourService.updateTour(id, tour)
    }
}