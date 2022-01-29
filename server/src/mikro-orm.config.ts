import path from 'path';
import { Options } from '@mikro-orm/core';
import { IS_PROD } from './constants';
import { Example } from './entities/Example';
import { User } from './entities/User';

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: 'mtrader01',
    password: 'boolo4ka',
    debug: !IS_PROD,
    type: 'postgresql',
    entities: [Example, User],
} as Options;
