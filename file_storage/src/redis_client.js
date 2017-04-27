import redis from 'redis';

export default redis.createClient(
  {
    host: process.env.REDIS_URL || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  }
);

