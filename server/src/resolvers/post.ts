import {
    Arg, Ctx, Query, Resolver, Mutation,
} from 'type-graphql';
import { Example } from '../entities/Example';
import { Context } from '../../@types';

@Resolver()
export class PostResolver {
    // query all (no pagination)
    @Query(() => [Example])
    examples(
        @Ctx() ctx: Context,
    ): Promise<Example[]> {
        return ctx.em.find(Example, {});
    }

    // query single by id
    @Query(() => Example, { nullable: true })
    example(
        @Arg('id') id: number,
        @Ctx() ctx: Context,
    ): Promise<Example | null> {
        return ctx.em.findOne(Example, { id });
    }

    // create new
    @Mutation(() => Example)
    async createExample(
        @Arg('title') title: string,
        @Ctx() ctx: Context,
    ): Promise<Example> {
        const example = ctx.em.create(Example, { title });
        await ctx.em.persistAndFlush(example);
        return example;
    }

    // update by id
    @Mutation(() => Example, { nullable: true })
    async updateExample(
        @Arg('id') id: number,
        @Arg('title', { nullable: true }) title: string, // makes title possible to be null
        @Ctx() ctx: Context,
    ): Promise<Example | null> {
        const target = await ctx.em.findOne(Example, { id });
        if (!target) {
            return null;
        }

        target.title = title;
        await ctx.em.persistAndFlush(target);

        return target;
    }

    // delete by id
    @Mutation(() => Boolean, { nullable: true })
    async deleteExample(
        @Arg('id') id: number,
        @Ctx() ctx: Context,
    ): Promise<boolean> {
        // no try/catch because nativeDelete goes well if there if no such entity found
        await ctx.em.nativeDelete(Example, { id });
        return true;
    }
}
