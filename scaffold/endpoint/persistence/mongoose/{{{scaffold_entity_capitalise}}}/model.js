import mongoose from 'mongoose';
import paginate from 'mongoose-paginate';
import uuid from 'uuid';

import { MetaSchema } from '../schemas';

paginate.paginate.options = {
  limit: 1000,
};

const { Schema } = mongoose;

export const {{{scaffold_entity_capitalise}}}Schema = new Schema({
  uuid: { type: String, default: uuid.v4 },
  name: { type: String, required: true },
  meta: { type: MetaSchema },
});

{{{scaffold_entity_capitalise}}}Schema.index({ 'meta.created': -1, 'meta.updated': -1 });

{{{scaffold_entity_capitalise}}}Schema.plugin(paginate);

const {{{scaffold_entity_capitalise}}} = mongoose.model('{{{scaffold_entity_capitalise}}}', {{{scaffold_entity_capitalise}}}Schema);

export default {{{scaffold_entity_capitalise}}};
