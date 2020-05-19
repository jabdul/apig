import { responseDocumentSchema } from '../../utils/schemas';

export default {
  type: 'object',
  required: ['name', 'id'],
  properties: {
    name: {
      type: 'string',
    },
    ...responseDocumentSchema,
  },
};
