import {
    Arg, Ctx, Resolver, Mutation, InputType, Field,
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

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: Context,
    ) {
        const password = await argon2.hash(options.password);
        const user = em.create(User, { username: options.username, password });
        await em.persistAndFlush(user);

        return user;
    }
}
