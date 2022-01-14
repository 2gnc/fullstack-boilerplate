import assert from 'assert';
import { ENV, config } from '../utils';

const { NODEJS_PORT } = process.env;

export const IS_PROD = ENV === 'production';

let customPort: number | undefined;
if (NODEJS_PORT !== undefined) {
    customPort = parseInt(NODEJS_PORT, 10);
    assert(!Number.isNaN(customPort), 'Environment variable MAPS_NODEJS_PORT must be an integer');
}

export const PORT = customPort || config.port;
