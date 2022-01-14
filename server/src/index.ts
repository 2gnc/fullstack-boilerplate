import { MikroORM } from '@mikro-orm/core';
import { Example } from './entities/Example';
import mikroOrmPgConfig from '../mikro-orm.config';

async function main() {
    const orm = await MikroORM.init(mikroOrmPgConfig);
    await orm.getMigrator().up();

    const examples = await orm.em.find(Example, {});
    console.log(examples);
}

main().catch(console.error);

/** Create record example */
// const post = orm.em.create(Example, {
//   createdAt: new Date(),
//   title: 'Example3',
// });

// await orm.em.persistAndFlush(post);
