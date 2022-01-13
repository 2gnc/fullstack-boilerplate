import { MikroORM } from '@mikro-orm/core';
import { Example } from './entities/Example';

async function main() {
  const orm = await MikroORM.init();

  const post = orm.em.create(Example, {
    createdAt: new Date(),
    title: 'Example1',
  });

  await orm.em.persistAndFlush(post);
}

main().catch(console.error);
