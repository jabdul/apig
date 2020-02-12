import application from '../../test/utils/requestHelper';
import { factory } from 'factory-girl';

import _ from '../../test/factories/{{{scaffold_factory}}}'; // eslint-disable-line no-unused-vars
import { ROUTE_NAME } from './routes';

let app = null;
const url =  `/${ROUTE_NAME}`

const parsedResponse = ({ payload }) => JSON.parse(payload);

describe('Users', () => {
  beforeAll(async () => {
    app = await application();
    await app.start();
  });

  afterAll(async () => {
    const db = await app.db;
    await db.disconnect();
    await app.stop({ timeout: 10 });
  });

  describe('Create', () => {
    it('Create {{{scaffold_entity_capitalise}}}', async () => {
      const payload = await factory.attrs('{{{scaffold_entity_capitalise}}}');
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });

      expect(response.statusCode).toBe(201);
      expect(response.statusMessage).toBe('Created');
      expect(response.headers['content-type']).toEqual('application/hal+json');

      const {{{scaffold_factory}}} = parsedResponse(response)
      expect({{{scaffold_factory}}}).toHaveProperty('name')
      expect({{{scaffold_factory}}}).toHaveProperty('uuid')
      expect({{{scaffold_factory}}}['name']).toEqual(payload['name'])
      expect({{{scaffold_factory}}}['uuid']).toBeValidUUID();
    })

    it('Cannot create {{{scaffold_entity_capitalise}}}', async () => {
      const payload = await factory.attrs('User', { firstname: null });
      const response = await app.inject({
        method: 'POST',
        url,
        payload
      });

      expect(response.statusCode).toBe(400);
      expect(response.statusMessage).toBe('Bad Request');
      expect(response.headers['content-type']).toEqual('application/json; charset=utf-8');
    });
  });
});
