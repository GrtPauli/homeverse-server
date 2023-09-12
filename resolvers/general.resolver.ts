import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { GenerateZegoTokenInput } from "../schema/general.schema"
import { generateToken04 } from "../utils/zegoServerAssistant";


@Resolver()
export default class GeneralResolver {

    @Mutation(() => String)
    generateZegoToken(@Arg('generateZegoTokenInput') generateZegoTokenInput: GenerateZegoTokenInput){
        const token =  generateToken04(
            generateZegoTokenInput.appID, 
            generateZegoTokenInput.userId, 
            generateZegoTokenInput.secret, 
            3600, 
            ""
        );
        return token
    }
}