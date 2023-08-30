import UserResolver from "./user.resolver";
import ListingResolver from "./listing.resolver"
import ProfileResolver from "./profile.resolver";
import { RecipeResolver } from "./recipe.resolver";
import MessageResolver from "./message.resolver";
import ContactResolver from "./contact.resolver";

export const resolvers = [
    UserResolver, 
    ListingResolver, 
    ProfileResolver,
    MessageResolver, 
    ContactResolver,
    RecipeResolver
] as const