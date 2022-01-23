import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';

export interface Config {
    port: number;
}

export interface Context {
    em: EntityManager<IDatabaseDriver<Connection>>
}
