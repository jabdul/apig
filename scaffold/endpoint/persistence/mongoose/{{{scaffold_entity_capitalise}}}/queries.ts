import { pickBy, path } from 'ramda';
import { timezone, intl } from '@ctt/service-utils';

import {{{scaffold_entity_capitalise}}}, { {{{scaffold_entity_capitalise}}}I } from './model';
import { PaginateResult } from 'mongoose';
import { QueryArgs, DbClient, Query } from '@ctt/crud-api';

const create = async ({ payload }: QueryArgs): Promise<{{{scaffold_entity_capitalise}}}I> => {
  const {{{scaffold_entity}}} = new {{{scaffold_entity_capitalise}}}({
    ...payload,
    meta: { ...payload.meta, ...{ created: timezone.parse(Date.now(), intl.tz.LB) } },
  });

  return (await {{{scaffold_entity}}}.save()).toObject();
};

const findAll = async ({ payload }: QueryArgs): Promise<PaginateResult<{{{scaffold_entity_capitalise}}}I>> =>
  {{{scaffold_entity_capitalise}}}.paginate(
    {
      ...pickBy(val => !!val, {
        name: path(['name'], payload),
        'meta.created': path(['from'], payload) && {
          $gte: path(['from'], payload),
          $lte: path(['to'], payload),
        },
      }),
    },
    {
      page: payload.page,
      limit: payload.limit,
      lean: true,
      leanWithId: true,
      sort: { 'meta.created': 'desc', 'meta.updated': 'desc' },
    },
  );

const findById = async ({ payload }: QueryArgs): Promise<{{{scaffold_entity_capitalise}}}I> =>
  {{{scaffold_entity_capitalise}}}.findById(payload.id).lean({ virtuals: true });

const removeById = async ({ payload }: QueryArgs): Promise<object> =>
  {{{scaffold_entity_capitalise}}}.updateOne(
    { _id: payload.id },
    { $set: { 'meta.active': false, 'meta.updated': Date.now() } },
  );

const updateById = async ({ payload }: QueryArgs): Promise<object> =>
  {{{scaffold_entity_capitalise}}}.updateOne(
    { _id: payload.id },
    {
      ...pickBy(val => !!val, {
        ...payload,
        ...{
          $set: {
            'meta.updated': Date.now(),
          },
        },
      }),
    },
  );

export default (client: DbClient): Query<{{{scaffold_entity_capitalise}}}I> => ({
  create: async ({ payload, config }: QueryArgs): Promise<{{{scaffold_entity_capitalise}}}I> =>
    await create({ client, payload, config }),
  findAll: async ({ payload }: QueryArgs): Promise<PaginateResult<{{{scaffold_entity_capitalise}}}I>> =>
    await findAll({ payload, client }),
  findById: async ({ payload }: QueryArgs): Promise<{{{scaffold_entity_capitalise}}}I> =>
    await findById({ payload, client }),
  removeById: async ({ payload }: QueryArgs): Promise<object> =>
    await removeById({ payload, client }),
  updateById: async ({ payload }: QueryArgs): Promise<object> =>
    await updateById({ payload, client }),
});
