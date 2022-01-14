import { Ctx, Query, Resolver } from 'type-graphql';
import { Example } from '../entities/Example';
import { MyContext } from '../../@types';

@Resolver()
export class PostResolver {
    @Query(() => [Example])
    static examples(
        @Ctx() ctx: MyContext,
    ): Promise<Example[]> {
        return ctx.em.find(Example, {});
    }
}
