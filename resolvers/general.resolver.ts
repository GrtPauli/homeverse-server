import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { GenerateZegoTokenInput, HomePage } from "../schema/general.schema"
import { generateToken04 } from "../utils/zegoServerAssistant";
import { GeneralService } from "../service/general.service";


@Resolver()
export default class GeneralResolver {
    constructor(private generalService: GeneralService) {
        this.generalService = new GeneralService()
    }

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

    @Query(() => HomePage)
    homePage(){
        return this.generalService.homePage()
    }
}