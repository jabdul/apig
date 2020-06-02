import { http } from '@ctt/service-utils';
import { factory } from 'factory-girl';
import application, {
  parsedSingleResponse,
  parsedErrorResponse,
} from '../../test/utils/requestHelper';

import '../../test/factories/{{{scaffold_factory}}}';
import { verify{{{scaffold_entity_capitalise}}}, verifyResponse } from '../../test/helpers/{{{scaffold_entities}}}';

import { ROUTE_NAME } from './routes';

const { response: { CREATED, JSON_TYPE , BAD_REQUEST} } = http;

let app = null;
const url =  `/${ROUTE_NAME}`

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
        payload,
      });

      expect(response.statusCode).toBe(CREATED.code);
      expect(response.statusMessage).toBe('Created');
      expect(response.headers['content-type']).toMatch(JSON_TYPE);

      const {{{scaffold_entity_capitalise}}} = parsedSingleResponse(response);

      verify{{{scaffold_entity_capitalise}}}({{{scaffold_entity_capitalise}}});

      verifyResponse({{{scaffold_entity_capitalise}}}, payload);
      expect({{{scaffold_entity_capitalise}}}.id).toBeValidObjectId();
    });

    it('Cannot create {{{scaffold_entity_capitalise}}}', async () => {
      const payload = await factory.attrs('{{{scaffold_entity_capitalise}}}', { name: null });
      const response = await app.inject({
        method: 'POST',
        url,
        payload,
      });

      expect(response.statusCode).toBe(BAD_REQUEST.code);
      expect(response.statusMessage).toBe('Bad Request');
      expect(response.headers['content-type']).toMatch(JSON_TYPE);

      const res = parsedErrorResponse(response);
      expect(res).toHaveProperty('message');
      expect(res.message).toBe(BAD_REQUEST.message);
    });
  });
});
