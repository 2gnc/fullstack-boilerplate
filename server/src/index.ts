import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import mikroOrmPgConfig from '../mikro-orm.config';
import { PORT } from './constants';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

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
            resolvers: [HelloResolver, PostResolver],
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

/** Create record example */
// import { Example } from './entities/Example';
// const post = orm.em.create(Example, {
//   createdAt: new Date(),
//   title: 'Example3',
// });

// await orm.em.persistAndFlush(post);

/** Get records example */
// const examples = await orm.em.find(Example, {});
