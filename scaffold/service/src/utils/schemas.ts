import { Root, StringSchema } from 'joi';

export const makeMetaRequestPayloadSchema = (validate: Root): object => ({
  active: validate.boolean(),
});

export const metaResponseSchema = {
  meta: {
    description: 'Metadata',
    type: 'object',
    properties: {
      active: {
        type: 'boolean',
      },
      created: {
        type: 'string',
        format: 'date-time',
      },
      updated: {
        type: 'string',
        format: 'date-time',
      },
    },
  },
};

export const errorResponseSchema = {
  error: {
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: {
        type: 'integer',
        format: 'int32',
      },
      message: {
        type: 'string',
      },
    },
  },
};

export const arraySchema = (template: object): object => ({
  type: 'array',
  items: {
    type: 'object',
    ...template,
  },
});

export const responseDocumentSchema = (template: object): object => ({
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        ...template,
        id: {
          type: 'string',
        },
        ...metaResponseSchema,
      },
    },
    ...errorResponseSchema,
  },
});

export const validateObjectId = (validator: Root): StringSchema =>
  validator.string().regex(/\b[0-9a-fA-F]{24}\b/);
