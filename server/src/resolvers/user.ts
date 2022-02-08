import {
    Arg, Ctx, Resolver, Mutation, InputType, Field, ObjectType,
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { Context } from '../../@types';

@InputType()
class UsernamePasswordInput {
    @Field()
        username: string;

    @Field()
        password: string;
}

@ObjectType()
class FieldError {
    @Field()
        field: string;

    @Field()
        message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
        errors?: FieldError[];

    @Field(() => User, { nullable: true })
        user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: Context,
    ): Promise<UserResponse> {
        const errors: FieldError[] = [];
        if (options.username.length <= 2) {
            errors.push({
                field: 'username',
                message: 'username is too short',
            });
            return { errors };
        }

        if (options.password.length <= 5) {
            errors.push({
                field: 'password',
                message: 'password is too short',
            });
            return { errors };
        }
        const password = await argon2.hash(options.password);
        const user = em.create(User, { username: options.username, password });
        await em.persistAndFlush(user);

        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: Context,
    ): Promise<UserResponse> {
        const user = await em.findOne(User, { username: options.username.toLowerCase() });
        const errors: FieldError[] = [];
        if (!user) {
            errors.push({
                field: 'username',
                message: 'username doesn`t exist',
            });
            return { errors };
        }

        const isPasswordValid = await argon2.verify(user.password, options.password);

        if (!isPasswordValid) {
            errors.push({
                field: 'password',
                message: 'incorrect password',
            });
            return { errors };
        }

        // const password = await argon2.hash(options.password);
        // const user = em.create(User, { username: options.username, password });
        // await em.persistAndFlush(user);

        return { user };
    }
}
