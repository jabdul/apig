import { pickBy, path } from 'ramda';
import { timezone, intl } from '@elephant-healthcare/primary-care-utils';

import {{{scaffold_entity_capitalise}}} from './model';

const create = async ({ payload }) => {
  const {{{scaffold_entity}}} = new {{{scaffold_entity_capitalise}}}({
    name: payload.name,
    meta: { ...payload.meta, ...{ created: timezone.parse(Date.now(), intl.tz.LB) } },
  });

  return await {{{scaffold_entity}}}.save();
};

const findAll = async ({ payload }) => {{{scaffold_entity_capitalise}}}.paginate(
  {
    ...pickBy(val => val !== undefined, {
      name: path(['name'], payload),
      'meta.created': path(['from'], payload) && {
        $gte: path(['from'], payload),
        $lte: path(['to'], payload)
      },
    }),
  },
  {
    page: payload.pageid,
    limit: payload.limit,
    sort: { 'meta.created': 'desc', 'meta.updated': 'desc' }
  }
);

const findById = async ({ payload }) => {{{scaffold_entity_capitalise}}}.findOne({ uuid: payload.uuid });

const removeById = async ({ payload }) => await Patient.updateOne(
  { uuid: payload.uuid },
  { $set: { 'meta.active': false, 'meta.updated': Date.now() } }
);

const updateById = async ({ payload }) => {{{scaffold_entity_capitalise}}}.updateOne(
  { uuid: payload.uuid },
  {
    ...pickBy(val => val !== undefined, {
      ...payload,
      ...{
        $set: {
          'meta.updated': Date.now(),
        }
      }
    })
  }
);

export default client => ({
  create: async ({ ...rest }) => create({ client, ...rest }),
  findAll: async ({ ...rest }) => findAll({ client, ...rest }),
  findById: async ({ ...rest }) => findById({ client, ...rest }),
  removeById: async ({ ...rest }) => removeById({ client, ...rest }),
  updateById: async ({ ...rest }) => updateById({ client, ...rest }),
});
