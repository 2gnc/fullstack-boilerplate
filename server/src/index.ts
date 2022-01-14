import { MikroORM } from '@mikro-orm/core';
import express from 'express';
// import { Example } from './entities/Example';
import mikroOrmPgConfig from '../mikro-orm.config';
import { PORT } from './constants';

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

    app.listen(PORT, listenCallback).addListener('error', errorCallback);
}

main().catch(console.error);

/** Create record example */
// const post = orm.em.create(Example, {
//   createdAt: new Date(),
//   title: 'Example3',
// });

// await orm.em.persistAndFlush(post);

/** Get records example */
// const examples = await orm.em.find(Example, {});
