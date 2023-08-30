import { index, prop, getModelForClass, pre, ReturnModelType, queryMethod } from "@typegoose/typegoose"
import { IsEmail, MaxLength, MinLength } from "class-validator"
import { Field, ID, InputType, ObjectType, registerEnumType } from "type-graphql"
import bcrypt from "bcrypt"
import { AsQueryMethod } from "@typegoose/typegoose/lib/types"


function findByEmail(this: ReturnModelType<typeof User, QueryHelpers>, email: User['email']){
    return this.findOne({ email })
}

interface QueryHelpers {
    findByEmail: AsQueryMethod<typeof findByEmail>
}

export enum UserType {
    BUYER_OR_SELLER,
    AGENT,
    BUYER,
    SELLER
}

registerEnumType(UserType, {
    name: "UserType",
    description: "Various user types"
})

@pre<User>('save', async function () {
    // Check that the pasword is being modified
    if(!this?.isModified('password')){
        return
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({required: true})
    firstname: string

    @Field(() => String)
    @prop({required: true})
    lastname: string

    @Field(() => String)
    @prop({required: true})
    email: string

    @Field(() => UserType, { nullable: true })
    @prop({default: UserType.BUYER_OR_SELLER})
    userType: UserType

    @Field(() => ID, { nullable: true })
    @prop({default: null})
    profileId: string

    @prop({required: true})
    password: string
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)

@InputType()
export class CreateUserInput {
    @Field(() => String)
    firstname: string

    @Field(() => String)
    lastname: string

    @IsEmail()
    @Field(() => String)
    email: string

    @Field(() => UserType, { nullable: true })
    userType: UserType

    @Field(() => ID, { nullable: true })
    profileId: string

    @MinLength(6, {
        message: 'Password must be at least 6 characters long.'
    })
    @MaxLength(50, {
        message: 'Password must not be longer than 50 characters.'
    })
    @Field(() => String)
    password: string
}

@InputType()
export class LoginInput {
    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}

@InputType()
export class UpdateUserInput {
    @Field(() => String, { nullable: true })
    firstname: string

    @Field(() => String, { nullable: true })
    lastname: string

    @Field(() => UserType, { nullable: true })
    userType: UserType
}

