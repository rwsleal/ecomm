import redis from 'redis';

const client = redis.createClient({
  host: 'ecomm-redis',
  port: 6379,
  prefix: 'blacklist:',
});

client.on('connect', () => {
  console.log('Redis succesfully connected!');
});

client.on('error', (err) => {
  console.log(err);
});

export default client;