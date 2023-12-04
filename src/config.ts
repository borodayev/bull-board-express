// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const PORT = Number(process.env.PORT || 3000);
export const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const USERNAME = process.env.USERNAME || '';
export const PASSWORD = process.env.PASSWORD || '';

export const QUEUES_NAMES: string[] = process.env.QUEUE_NAMES?.split(',') || [];
