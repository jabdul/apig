import services from '../services';

describe('Services: {{{scaffold_entities}}}', () => {
  const config = {
    get: (): unknown => jest.fn(),
  };

  const {{{scaffold_entity}}} = {
    name: 'Bolatan Ibrahim',
    id: '5c3cab69ffb5bd22494a8484',
  };
  const json = jest.fn().mockReturnValue(() => {{{scaffold_entity}}});

  describe('.create', () => {
    const payload = {};

    it('returns stringified record of newly created {{{scaffold_entity}}}', async () => {
      const db = {
        {{{scaffold_entities}}}: {
          create: jest.fn().mockReturnValue({{{scaffold_entity}}}),
        },
      };

      const { {{{scaffold_entities}}} } = services(db);
      const actual = await {{{scaffold_entities}}}.create({ json, config, payload });
      expect(JSON.parse(JSON.stringify(actual))).toEqual({{{scaffold_entity}}});
    });

    it('throws an error when new record creation fails', async () => {
      const db = {
        {{{scaffold_entities}}}: {
          create: jest.fn().mockReturnValue(Promise.reject(new Error('db Error'))),
        },
      };

      try {
        await expect(
          await (async (): Promise<unknown> =>
            services(db).{{{scaffold_entities}}}.create({ json, config, payload }))(),
        ).resolves.toThrow();
      } catch (e) {
        expect(e).toEqual(new Error('db Error'));
      }
    });
  });

  describe('.findById', () => {
    let db = {
      {{{scaffold_entities}}}: {
        findById: jest.fn().mockReturnValue({{{scaffold_entity}}}),
      },
    };
    const payload = { id: '5c3cab69ffb5bd22494a8484' };

    it('returns hal-json formatted record of fetched {{{scaffold_entity}}}', async () => {
      const { {{{scaffold_entities}}} } = services(db);
      const actual = await {{{scaffold_entities}}}.findById({ payload, json, config });
      expect(JSON.parse(JSON.stringify(actual))).toEqual({{{scaffold_entity}}});
    });

    it('raises exception when {{{scaffold_entity}}} not found', async () => {
      db = {
        {{{scaffold_entities}}}: {
          findById: jest.fn().mockReturnValue(null),
        },
      };

      try {
        await expect(
          await (async (): Promise<unknown> =>
            services(db).{{{scaffold_entities}}}.findById({ json, config, payload }))(),
        ).resolves.toThrow();
      } catch (e) {
        expect(e).toEqual(new Error(null));
      }
    });
  });
});
