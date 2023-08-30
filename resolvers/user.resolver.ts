import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { CreateUserInput, LoginInput, UpdateUserInput, User } from "../schema/user.schema"
import UserService, { LoginResponse } from "../service/user.service"
import Context from "../types/context"
import { sendOtp, verifyOtp } from "../utils/otp"

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService()
    }

    @Mutation(() => User)
    createUser(@Arg('user') user: CreateUserInput){
        return this.userService.createUser(user)
    }

    @Mutation(() => LoginResponse) // Returns JWT
    login(@Arg('user') user: LoginInput, @Ctx() context: Context){
        return this.userService.login(user, context)
    }

    @Authorized()
    @Mutation(() => User)
    updateUser(@Arg('user') user: UpdateUserInput, @Ctx() context: Context){
        const currentUser = context.user
        const userId = currentUser?._id ? currentUser?._id : currentUser?.sub
        return this.userService.updateUser(user, userId)
    }

    @Authorized()
    @Query(() => User)
    getMe(@Ctx() context: Context){
        if(context.user._id){
            return context.user
        }
        return this.userService.getUser(context.user.sub)
    }

    @Query(() => User)
    getUser(@Arg('id') id: string){
        return this.userService.getUser(id)
    }

    @Query(() => [User])
    getAgents(){
        return this.userService.getAgents()
    }

    @Query(() => String)
    async sendOTP(@Arg('number') number: string){
        return await sendOtp(number)
    }

    @Query(() => String)
    async verifyOTP(@Arg('number') number: string, @Arg('otp') otp: string ){
        return await verifyOtp(number, otp)
    }
}