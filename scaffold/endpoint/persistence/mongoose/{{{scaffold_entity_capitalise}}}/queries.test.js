import { factory } from 'factory-girl';

import {{{scaffold_entity_capitalise}}}Factory from '../../../../test/factories/{{{scaffold_factory}}}'; // eslint-disable-line no-unused-vars
import queries from './queries'

import { mongooseConnect, config } from '@ctt/crud-api';

const db = mongooseConnect(config);
let {{{scaffold_factory}}}Queries = queries(db); // eslint-disable-line no-unused-vars

describe('{{{scaffold_entity_capitalise}}} queries', () => {

  describe('create', () => {
    it('can create a {{{scaffold_entity_capitalise}}}', async () => {
      const payload = await factory.attrs('{{{scaffold_entity_capitalise}}}');

      const {{{scaffold_factory}}} = await {{{scaffold_factory}}}Queries.create({ payload });

      expect({{{scaffold_factory}}}).toBeDefined()

      expect({{{scaffold_factory}}}).toHaveProperty('name')
      expect({{{scaffold_factory}}}).toHaveProperty('uuid')
      expect({{{scaffold_factory}}}['name']).toEqual(payload['name'])
    });

    it('cannot create a {{{scaffold_entity_capitalise}}}', async () => {
      const payload = await factory.attrs('{{{scaffold_entity_capitalise}}}', { name: undefined });

      try {
        await expect(
          await (async () => {{{scaffold_factory}}}Queries.create({ payload }))(),
        ).resolves.toThrow();
      } catch ({ errors, name, message }) {
        expect(name).toBe('ValidationError');
        expect(message).toMatch(/`name` is required/);
        expect(errors).toHaveProperty('name')
        expect(errors['name']['path']).toBe('name');
        expect(errors['name']['kind']).toBe('required');
      }

    })
  })
});
