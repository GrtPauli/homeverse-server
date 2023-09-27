import { ListingModel } from "../schema/listing.schema";
import { ProfileModel } from "../schema/profile.schema";
import { UserType } from "../schema/user.schema";

export class GeneralService {
    async homePage() {
        const newListings = await ListingModel.find().sort({'createdAt': -1}).limit(10)
        const topAgents = await ProfileModel.find({ userType: UserType.AGENT }).sort({'createdAt': -1}).limit(10)
        
        return {
            newListings,
            topAgents
        }
    }
}