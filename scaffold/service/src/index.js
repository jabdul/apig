import hapiAuthJwt2 from 'hapi-auth-jwt2';
import { server, mongooseConnect } from '@ctt/crud-api';
import { permit } from '@ctt/service-utils';
import _ from './env'; // eslint-disable-line no-unused-vars

import conf from './config';
import mongooseSchema from './persistence/mongoose/queries';
import routes from './routes';
import services from './services';

import config, { configFiles } from './utils/loadconfig';

const validate = async ({ permissions }, { route }) => permit.authorize(permissions, {
  method: route.method,
  fingerprint: route.fingerprint,
  domain: config.get('service.name'),
});

server({
  dbConnect: mongooseConnect,
  schema: mongooseSchema,
  config: conf,
  configFiles,
  configOptions: {
    dbConnectOptions: { useNewUrlParser: true }
  },
  routes,
  services,
  plugins: [{ plugin: hapiAuthJwt2, options: {} }],
  postRegisterHook: async (app) => {
    app.auth.strategy('jwt', 'jwt', {
      key: config.get('jwt.secret'),
      validate: await validate,
      verifyOptions: { algorithms: ['HS256'] },
      urlKey: false,
    });
    app.auth.default('jwt'); // JWT auth is required for all routes
  },
  swaggerOptions: {
    auth: false,
    tags: {},
    info: {
      title: '{{{scaffold_project_name}}}',
      description: '{{{scaffold_project_description}}}',
      version: '0.0.1'
    }
  },
  swaggerUiOptions: {
    title: '{{{scaffold_project_name}}}',
    path: '/docs',
    authorization: false,
    auth: false,
    swaggerOptions: {
      validatorUrl: null
    }
  },
  loggerOptions: {
    ops: {
      interval: 1000
    },
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          log: '*',
          response: '*',
          error: '*',
          request: { include: ['hapi'], exclude: 'sensitive' }
        }]
      }, {
        module: 'good-console'
      }, 'stdout'],
    },
  },
});
