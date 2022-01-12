import { MikroORM } from '@mikro-orm/core';
import { IS_PROD } from './constants';
import { Example } from './entities/Example';

async function main() {
  const orm = await MikroORM.init({
    dbName: 'mtrader01',
    // user: '',
    password: 'boolo4ka',
    debug: !IS_PROD,
    type: 'postgresql',
    entities: [Example],
  });

  const post = orm.em.create(Example, {
    createdAt: new Date(),
    title: 'Example1',
  });

  await orm.em.persistAndFlush(post);
}

main().catch(console.error);
