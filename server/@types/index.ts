import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';

export interface Config {
    port: number;
}

export interface MyContext {
    em: EntityManager<IDatabaseDriver<Connection>>
}
