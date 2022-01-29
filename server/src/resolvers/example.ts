import {
    Arg, Ctx, Query, Resolver, Mutation,
} from 'type-graphql';
import { Example } from '../entities/Example';
import { Context } from '../../@types';

@Resolver()
export class ExampleResolver {
    // query all (no pagination)
    @Query(() => [Example])
    examples(
        @Ctx() { em }: Context,
    ): Promise<Example[]> {
        return em.find(Example, {});
    }

    // query single by id
    @Query(() => Example, { nullable: true })
    example(
        @Arg('id') id: number,
        @Ctx() { em }: Context,
    ): Promise<Example | null> {
        return em.findOne(Example, { id });
    }

    // create new
    @Mutation(() => Example)
    async createExample(
        @Arg('title') title: string,
        @Ctx() { em }: Context,
    ): Promise<Example> {
        const example = em.create(Example, { title });
        await em.persistAndFlush(example);
        return example;
    }

    // update by id
    @Mutation(() => Example, { nullable: true })
    async updateExample(
        @Arg('id') id: number,
        @Arg('title', { nullable: true }) title: string, // makes title possible to be null
        @Ctx() { em }: Context,
    ): Promise<Example | null> {
        const target = await em.findOne(Example, { id });
        if (!target) {
            return null;
        }

        target.title = title;
        await em.persistAndFlush(target);

        return target;
    }

    // delete by id
    @Mutation(() => Boolean, { nullable: true })
    async deleteExample(
        @Arg('id') id: number,
        @Ctx() { em }: Context,
    ): Promise<boolean> {
        // no try/catch because nativeDelete goes well if there if no such entity found
        await em.nativeDelete(Example, { id });
        return true;
    }
}
