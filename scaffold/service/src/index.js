import server from './server';

(async () => {
  const app = await server();

  await app.start();
  console.log(`App started.... runninng on ${app.info.uri}`) // eslint-disable-line
})();
