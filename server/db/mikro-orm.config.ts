import { IS_PROD } from "../src/constants";
import { Example } from "../src/entities/Example";

export const PG_COFIG = {
    dbName: 'mtrader01',
    password: 'boolo4ka',
    debug: !IS_PROD,
    type: 'postgresql',
    entities: [Example],
};