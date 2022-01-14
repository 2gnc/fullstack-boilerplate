import { Query, Resolver } from 'type-graphql';

@Resolver()
export class HelloResolver {
    @Query(() => String)
    static hello() {
        return 'hello worls';
    }
}
