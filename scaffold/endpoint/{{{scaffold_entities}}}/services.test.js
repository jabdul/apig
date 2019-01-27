import services from '../services';

describe('Services: {{{scaffold_entities}}}', () => {
  const config = {
    get: () => jest.fn(),
  };

  describe('.create', () => {
    const payload = {};
    const hal = {};
    const json = jest.fn(() => ({
      addLink: jest.fn().mockReturnValue(hal),
    }));

    it('returns hal-json formatted record for newly created consultation', async () => {
      const db = {
        {{{scaffold_entities}}}: {
          create: jest.fn().mockReturnValue({}),
        },
      };

      const { {{{scaffold_entities}}} } = services(db);
      const actual = await {{{scaffold_entities}}}.create({ json, config, payload });
      expect(JSON.parse(JSON.stringify(actual))).toEqual(hal);
    });

    it('throws an error when new record creation fails', async () => {
      const db = {
        {{{scaffold_entities}}}: {
          create: jest.fn().mockReturnValue(Promise.reject(new Error('db Error'))),
        }
      };

      try {
        await expect(await (async () => services(db)
          .{{{scaffold_entities}}}.create({ json, config, payload }))()).resolves.toThrow();
      } catch (e) {
        expect(e).toEqual(new Error('db Error'));
      }
    });
  });

  describe('.findById', () => {
    let db = {
      {{{scaffold_entities}}}: {
        findById: jest.fn().mockReturnValue({}),
      }
    };
    const payload = { uuid: 'dfa7fd57-5d6b-4563-b60e-6c9f78f19579' };
    const hal = {};
    const json = jest.fn(() => ({
      addLink: jest.fn().mockReturnValue(hal),
    }));

    it('returns hal-json formatted record of fetched resource', async () => {
      const { {{{scaffold_entities}}} } = services(db);
      const actual = await {{{scaffold_entities}}}.findById({ payload, json, config });
      expect(JSON.parse(JSON.stringify(actual))).toEqual(hal);
    });

    it('raises exception when resource not found', async () => {
      db = {
        {{{scaffold_entities}}}: {
          findById: jest.fn().mockReturnValue(null),
        }
      };

      try {
        await expect(await (async () => services(db)
          .{{{scaffold_entities}}}.findById({ json, config, payload }))()).resolves.toThrow();
      } catch (e) {
        expect(e).toEqual(new Error(null));
      }
    });
  });
});
