'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
  const port = parseInt(process.env.PORT, 10) || 4000;

  const server = Hapi.server({
    port: port,
    host: '0.0.0.0'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return 'Hello World!';
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
