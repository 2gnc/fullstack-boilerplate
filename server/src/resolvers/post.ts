import {
    Arg, Ctx, Query, Resolver, Int,
} from 'type-graphql';
import { Example } from '../entities/Example';
import { Context } from '../../@types';

@Resolver()
export class PostResolver {
    @Query(() => [Example])
    examples(
        @Ctx() ctx: Context,
    ): Promise<Example[]> {
        return ctx.em.find(Example, {});
    }

    @Query(() => Example, { nullable: true })
    example(
        @Arg('id', () => Int) id: number,
        @Ctx() ctx: Context,
    ): Promise<Example | null> {
        return ctx.em.findOne(Example, { id });
    }
}
