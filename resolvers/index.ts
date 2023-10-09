import UserResolver from "./user.resolver";
import ListingResolver from "./listing.resolver"
import ProfileResolver from "./profile.resolver";
import { RecipeResolver } from "./recipe.resolver";
import MessageResolver from "./message.resolver";
import ContactResolver from "./contact.resolver";
import GeneralResolver from "./general.resolver";
import TourResolver from "./tour.resolver";
import RentalResolver from "./rental.resolver";

export const resolvers = [
    UserResolver, 
    ListingResolver, 
    ProfileResolver,
    MessageResolver, 
    ContactResolver,
    GeneralResolver,
    RecipeResolver,
    TourResolver,
    RentalResolver
] as const