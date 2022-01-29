import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import mikroOrmPgConfig from './mikro-orm.config';
import { PORT } from './constants';
import { HelloResolver } from './resolvers/hello';
import { ExampleResolver } from './resolvers/example';
import { UserResolver } from './resolvers/user';

function errorCallback(err: Error): void {
    console.error('Application start error ', err);
}

function listenCallback(): void {
    console.info(`Application started on port ${PORT}`);
}

async function main() {
    const orm = await MikroORM.init(mikroOrmPgConfig);
    await orm.getMigrator().up();

    const app = express();
    const appoloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ExampleResolver, UserResolver],
            validate: false,
        }),
        context: () => ({
            em: orm.em,
        }),
    });

    await appoloServer.start();
    appoloServer.applyMiddleware({ app });

    app.listen(PORT, listenCallback).addListener('error', errorCallback);
}

main().catch(console.error);
