import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import ProfileService from "../service/profile.service";
import { CreateProfileInput, FilterProfileInput, Profile, UpdateProfileInput } from "../schema/profile.schema";
import Context from "../types/context";


@Resolver()
export default class ProfileResolver {
    constructor(private profileService: ProfileService) {
        this.profileService = new ProfileService()
    }

    @Mutation(() => Profile)
    createProfile(@Arg('userId') userId: string) {
        return this.profileService.createProfile(userId)
    }

    // createProfile(@Arg('userId') userId: string, @Arg('conversationListId') conversationListId: string) {
    //     return this.profileService.createProfile(userId, conversationListId)
    // }

    @Authorized()
    @Query(() => Profile)
    getMyProfile(@Ctx() context: Context){
        const user = context.user
        const userId = user?._id ? user?._id : user?.sub
        return this.profileService.getUserProfile(userId)
    }

    // @Authorized()
    @Mutation(() => Boolean)
    updateProfile(@Arg('id') id: string, @Arg('profile') profile: UpdateProfileInput){
        // const currentUser = context.user
        // const userId = currentUser?._id ? currentUser?._id : currentUser?.sub
        return this.profileService.updateProfile(id, profile)
    }

    @Query(() => Profile)
    getUserProfile(@Arg('id') id: string){
        return this.profileService.getUserProfile(id)
    }

    @Query(() => [Profile])
    getProfiles(@Arg('filter') filter: FilterProfileInput){
        return this.profileService.getProfiles(filter)
    }
}