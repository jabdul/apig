import { streams } from '@ctt/service-utils';

import tmplJson from './parsers/json';

const create = async ({
  db, payload, config, json
}) => {
  const {{{scaffold_entity}}} = await db.{{{scaffold_entities}}}.create({ payload, config });

  if (!{{{scaffold_entity}}}) {
    throw Error({{{scaffold_entity}}});
  }

  return streams.format('json', {
    json: {
      transformer: json,
      template: tmplJson,
      results: {
        {{{scaffold_entities}}}: [{{{scaffold_entity}}}],
      },
      config
    }
  });
};

const findById = async ({
  db, payload, config, json
}) => {
  const {{{scaffold_entity}}} = await db.{{{scaffold_entities}}}.findById({ payload, config });

  if (!{{{scaffold_entity}}}) {
    throw Error({{{scaffold_entity}}});
  }

  return streams.format('json', {
    json: {
      transformer: json,
      template: tmplJson,
      results: {
        {{{scaffold_entities}}}: [{{{scaffold_entity}}}],
      },
      config
    }
  });
};

const findAll = async ({
  db, payload, config, json
}) => {
  const {{{scaffold_entities}}} = await db.{{{scaffold_entities}}}.findAll({ payload, config });

  if (!{{{scaffold_entities}}}) {
    throw Error({{{scaffold_entities}}});
  }

  if ({{{scaffold_entities}}}.docs.length < 1) {
    throw Error('Could not find {{{scaffold_entities}}}');
  }

  const {
    docs, total, limit, page, pages, offset
  } = {{{scaffold_entities}}};

  return streams.format('json', {
    json: {
      transformer: json,
      template: tmplJson,
      results: {
        {{{scaffold_entities}}}: docs,
        total,
        limit,
        page,
        pages,
        offset,
      },
      config
    }
  });
};

const removeById = async ({ db, payload, config }) => {
  const result = await db.{{{scaffold_entities}}}.removeById({ payload, config });

  if (!result) {
    throw Error(result);
  }
};

const updateById = async ({ db, payload, config }) => {
  const result = await db.{{{scaffold_entities}}}.updateById({ payload, config });

  if (!result) {
    throw Error(result);
  }

  return result;
};

export default db => ({
  create: async ({ payload, config, json }) => create({
    db, payload, config, json
  }),
  findById: async ({ payload, config, json }) => findById({
    db, payload, config, json
  }),
  findAll: async ({ payload, config, json }) => findAll({
    db, payload, config, json
  }),
  removeById: async ({ payload, config, json }) => removeById({
    db, payload, config, json
  }),
  updateById: async ({ payload, config, json }) => updateById({
    db, payload, config, json
  }),
});
