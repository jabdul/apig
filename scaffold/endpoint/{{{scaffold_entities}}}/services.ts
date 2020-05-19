import tmplJson from './parsers/json';
import { Dict, Crud, ServiceArgs } from '@ctt/crud-api';
import { {{{scaffold_entities}}}I } from '../persistence/mongoose/{{{scaffold_entities}}}/model';
import { PaginateResult } from 'mongoose';
import { arraySchema } from '../utils/schemas';

const create = async ({ db, payload, config, json }: ServiceArgs): Promise<string> => {
  const {{{scaffold_entity}}} = await db.{{{scaffold_entities}}}.create({ payload, config });

  if (!{{{scaffold_entity}}}) {
    throw Error({{{scaffold_entity}}});
  }

  return json(tmplJson)({{{scaffold_entity}}});
};

const findById = async ({ db, payload, config, json }: ServiceArgs): Promise<string> => {
  const {{{scaffold_entity}}} = await db.{{{scaffold_entities}}}.findById({ payload, config });

  if (!{{{scaffold_entity}}}) {
    throw Error({{{scaffold_entity}}});
  }

  return json(tmplJson)({{{scaffold_entity}}});
};

const findAll = async ({ db, payload, config, json }: ServiceArgs): Promise<string> => {
  const {{{scaffold_entities}}} = (await db.{{{scaffold_entities}}}.findAll({ payload, config })) as PaginateResult<{{{scaffold_entities}}}I>;

  if (!{{{scaffold_entities}}}) {
    throw Error(`${{{{scaffold_entities}}}}`);
  }

  if ({{{scaffold_entities}}}.docs.length < 1) {
    throw Error('Could not find {{{scaffold_entities}}}');
  }

  const { docs } = {{{scaffold_entities}}};

  return json(arraySchema(tmplJson))(docs);
};

const removeById = async ({ db, payload, config }: ServiceArgs): Promise<void> => {
  const result = await db.{{{scaffold_entities}}}.removeById({ payload, config });

  if (!result.nModified) {
    throw Error(result);
  }
};

const updateById = async ({ db, payload, config }: ServiceArgs): Promise<object> => {
  const result = await db.{{{scaffold_entities}}}.updateById({ payload, config });

  if (!result.nModified) {
    throw Error(result);
  }

  return result;
};

export default (db: Dict): Crud<string> => ({
  create: async ({ payload, config, json }: ServiceArgs): Promise<string> =>
    create({
      db,
      payload,
      config,
      json,
    }),
  findById: async ({ payload, config, json }: ServiceArgs): Promise<string> =>
    findById({
      db,
      payload,
      config,
      json,
    }),
  findAll: async ({ payload, config, json }: ServiceArgs): Promise<any> => // eslint-disable-line
    findAll({
      db,
      payload,
      config,
      json,
    }),
  removeById: async ({ payload, config, json }: ServiceArgs): Promise<void> =>
    removeById({
      db,
      payload,
      config,
      json,
    }),
  updateById: async ({ payload, config, json }: ServiceArgs): Promise<object> =>
    updateById({
      db,
      payload,
      config,
      json,
    }),
});
