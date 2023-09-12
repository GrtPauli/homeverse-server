import { CreateProfileInput, Profile, ProfileModel, UpdateProfileInput } from "../schema/profile.schema";
import { UserModel } from "../schema/user.schema";


class ProfileService {
    async createProfile(userId: string) {
        return ProfileModel.create({userId})
    }

    // async createProfile(userId: string, conversationListId: string) {
    //     return ProfileModel.create({userId, conversationListId})
    // }

    async getUserProfile(userId: string) {
        return ProfileModel.find().findByUserId(userId)
    }

    async updateProfile(userId: string, profile: UpdateProfileInput){ 
        const prof = await ProfileModel.find().findByUserId(userId)

        const updatedUser = await ProfileModel.findByIdAndUpdate(prof._id, 
            { ...profile }, 
            // { returnDocument: "after" }
        )

        return true
    }
}

export default ProfileService