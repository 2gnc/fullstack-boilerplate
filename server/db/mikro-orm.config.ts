import path from 'path';
import { IS_PROD } from '../src/constants';
import { Example } from '../src/entities/Example';
import { MikroORM, Options } from '@mikro-orm/core'

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    dbName: 'mtrader01',
    password: 'boolo4ka',
    debug: !IS_PROD,
    type: 'postgresql',
    entities: [Example],
} as Options;