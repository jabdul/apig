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

const link = {
  type: 'object',
  properties: {
    href: {
      type: 'string',
    },
  },
};

export const paginationResponseSchema = {
  pagination: {
    type: 'object',
    required: ['items', 'pages'],
    properties: {
      pages: {
        type: 'integer',
        format: 'int32',
      },
      items: {
        type: 'integer',
        format: 'int32',
      },
      first: link,
      last: link,
      next: link,
      current: link,
      previous: link,
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

export const responseDocumentSchema = (template): object => ({
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        required: template.required,
        properties: {
          ...template.properties,
          id: {
            type: 'string',
          },
          ...metaResponseSchema,
        },
      },
    },
    ...errorResponseSchema,
    ...paginationResponseSchema,
  },
});

export const validateObjectId = (validator: Root): StringSchema => validator.string().regex(/\b[0-9a-fA-F]{24}\b/);

export const createPaginationLink = (endpoint: string): Function => (
  page: number,
  limit?: number,
  offset?: number
): object => ({
  href: `/${endpoint}?page=${page}&limit=${limit}${offset ? `&offset=${offset}` : ''}`,
});
