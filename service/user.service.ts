import { CreateUserInput, LoginInput, UpdateUserInput, User, UserModel, UserType } from "../schema/user.schema";
import Context from "../types/context";
import { GraphQLError } from 'graphql';
import bcrypt from "bcrypt"
import { signJwt } from "../utils/jwt";
import { ObjectType, Field } from "type-graphql";
import { ProfileModel } from "../schema/profile.schema";

@ObjectType()
export class LoginResponse extends User {
    @Field(() => String)
    access_token: string
}

class UserService {
    async createUser(user: CreateUserInput){
        // call user model to create user
        const data = await UserModel.find().findByEmail(user.email).lean()
        if(!data){
            const createdUser = await UserModel.create(user)
            const profile = await ProfileModel.create({  _id: createdUser._id, userId: createdUser._id })
            const updatedUser = await UserModel.findByIdAndUpdate( createdUser._id, 
                { profileId: profile._id }, 
                { returnDocument: "after" }
            )
            return updatedUser
        } else {
            throw new GraphQLError("User already exists !", {
                extensions: { code: 'USER_EXISTS' },
            });
        }
    }

    async updateUser(user: UpdateUserInput, userId: string) {        
        const updatedUser = await UserModel.findByIdAndUpdate( userId, 
            { ...user }, 
            { returnDocument: "after" }
        )

        return updatedUser
    }

    async getUser(id: string){
        const user = await UserModel.findById(id).lean()
        if(user){
            return user
        }
    }

    async getAgents(){
        const agents = await UserModel.find({userType: UserType.AGENT})
        return agents
    }

    async login(input: LoginInput, context: Context) {
        // get our user by email
        const user = await UserModel.find().findByEmail(input.email).lean()
        if(!user){
            throw new GraphQLError("Invalid email or password", {
                extensions: { code: 'INVALID_CREDENTIALS' },
            });
        }

        // validate password
        const passwordIsValid = await bcrypt.compare(input.password, user.password)
        if(!passwordIsValid) {
            throw new GraphQLError("Invalid email or password", {
                extensions: { code: 'INVALID_CREDENTIALS' },
            });
        }

        // sign a jwt
        const token = signJwt({ 
            _id: user._id,
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname
         })

        // set a cookie for the jwt
        context.res.cookie("access_token", token, {
            maxAge: 3.154e10, // 1 Year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })

        // return the jwt
        const response: LoginResponse = {
            ...user,
            access_token: token
        }

        return response
    }
}

export default UserService