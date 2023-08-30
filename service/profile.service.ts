import { CreateProfileInput, Profile, ProfileModel, UpdateProfileInput } from "../schema/profile.schema";
import { UserModel } from "../schema/user.schema";


class ProfileService {
    async createProfile(userId: string, conversationListId: string) {
        return ProfileModel.create({userId, conversationListId})
    }

    async getUserProfile(userId: string) {
        return ProfileModel.find().findByUserId(userId)
    }

    async updateProfile(profileId: string, profile: UpdateProfileInput){        
        const updatedUser = await ProfileModel.findByIdAndUpdate(profileId, 
            { ...profile }, 
            // { returnDocument: "after" }
        )

        return true
    }
}

export default ProfileService