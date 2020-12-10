'use strict';

const packageJSON = require('./package.json');
const applicationVersion =  packageJSON.version

const Hapi = require('@hapi/hapi');
const axios = require('axios')

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

  server.route({
    method: 'GET',
    path: '/pix-api-production-version',
    handler: async (request, h) => {
      const baseUrl = 'https://api.pix.fr/api';
        let response;
        try {
            response = await axios.get(baseUrl);
        } catch (error) {
            response = error;
        }

        return JSON.stringify(response.data);
    }})

    server.route({
      method: 'GET',
      path: '/getVersion',
      handler: (request, h) => {
  
        return applicationVersion;
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
