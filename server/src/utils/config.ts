import { Config } from '../../@types';
import { ENV } from '.';

// eslint-disable-next-line
export const config = require(`../configs/${ENV}`).default as Config;