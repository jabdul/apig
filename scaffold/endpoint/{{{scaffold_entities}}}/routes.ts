import { http, service } from '@ctt/service-utils';
import { makeMetaRequestPayloadSchema, validateObjectId } from '../utils/schemas';
import { ServerRoute, ResponseObject } from 'hapi';
import { RouteArgs } from '@ctt/crud-api';
import { ObjectSchema, Root } from 'joi';

const {
  response: { UNPROCESSABLE_ENTITY, BAD_REQUEST, NOT_FOUND, CREATED, OK, JSON_TYPE },
} = http;

export const ROUTE_NAME = '{{{scaffold_entities}}}';

export const makeRequestPayloadSchema = (validate: Root): ObjectSchema => validate.object().keys({
  name: validate.string().max(30),
  meta: makeMetaRequestPayloadSchema(validate),
});

const makeRequestHeaderSchema = (validate: Root): ObjectSchema => validate.object({
  authorization: validate.string().required(),
}).unknown();

export default ({ services, config, json, validate }: RouteArgs): ServerRoute => ({
  method: 'POST',
  path: `/${ROUTE_NAME}`,
  options: {
    ...service.options.secureOption,
    validate: {
      headers: makeRequestHeaderSchema(validate),
      failAction: async (request, h, err): Promise<ResponseObject> => {
        request.log('error', err);
        return h
          .response(BAD_REQUEST.message)
          .code(BAD_REQUEST.code)
          .type(JSON_TYPE)
          .takeover();
      },
      payload: makeRequestPayloadSchema(validate)
        .requiredKeys('domain', 'slug')
        .optionalKeys('description', 'meta'),
    },
    tags: ['api'],
  },
  handler: async (request, h): Promise<ResponseObject> => {
    request.log([`/${ROUTE_NAME}`]);
    let response;

    try {
      response = h
        .response(
          await services[ROUTE_NAME].create({
            payload: request.payload,
            config,
            json,
          }),
        )
        .code(CREATED.code);
    } catch (e) {
      request.log([e]);
      response = h
        .response({ error: UNPROCESSABLE_ENTITY.message })
        .code(UNPROCESSABLE_ENTITY.code);
    }

    return response.type(JSON_TYPE);
  },
});

export const find{{{scaffold_entity_capitalise}}} = ({ services, validate, json, config }: RouteArgs): ServerRoute => ({
  method: 'GET',
  path: '/{{{scaffold_entities}}}/{id}',
  options: {
    ...service.options.secureOption,
    validate: {
      headers: makeRequestHeaderSchema(validate),
      failAction: async (request, h, err): Promise<ResponseObject> => {
        request.log('error', err);
        return h
          .response(BAD_REQUEST.message)
          .code(BAD_REQUEST.code)
          .type(JSON_TYPE)
          .takeover();
      },
      params: {
        id: validateObjectId(validate),
      },
    },

    tags: ['api'],
  },
  handler: async (request, h): Promise<ResponseObject> => {
    const payload = { id: request.params.id };
    request.log([`/${ROUTE_NAME}`]);
    let response;

    try {
      response = h
        .response(await services[ROUTE_NAME].findById({ payload, json, config }))
        .code(OK.code);
    } catch (e) {
      request.log([e]);
      response = h.response(NOT_FOUND.message).code(NOT_FOUND.code);
    }

    return response.type(JSON_TYPE);
  },
});

export const findAll{{{scaffold_entity_capitalise}}}s = ({ services, validate, config, json }: RouteArgs): ServerRoute => ({
  method: 'GET',
  path: '/{{{scaffold_entities}}}',
  options: {
    ...service.options.secureOption,
    validate: {
      headers: makeRequestHeaderSchema(validate),
      failAction: async (request, h, err): Promise<ResponseObject> => {
        request.log('error', err);
        return h
          .response(BAD_REQUEST.message)
          .code(BAD_REQUEST.code)
          .type(JSON_TYPE)
          .takeover();
      },
      query: {
        name: validate.string().max(30),
        from: validate.date().iso(),
        to: validate.date().iso(),
        limit: validate
          .number()
          .integer()
          .min(1),
          page: validate
          .number()
          .integer()
          .min(1),
      },
    },

    tags: ['api'],
  },
  handler: async (request, h): Promise<ResponseObject> => {
    const payload = {
      ...(request.query as object)
    };
    request.log([`/${ROUTE_NAME}`]);
    let response;

    try {
      response = h
        .response(await services[ROUTE_NAME].findAll({ payload, json, config }))
        .code(OK.code);
    } catch (e) {
      request.log([e]);
      response = h.response(NOT_FOUND.message).code(NOT_FOUND.code);
    }

    return response.type(JSON_TYPE);
  },
});

export const remove{{{scaffold_entity_capitalise}}} = ({ services, validate, config }: RouteArgs): ServerRoute => ({
  method: 'DELETE',
  path: '/{{{scaffold_entities}}}/{id}',
  options: {
    ...service.options.secureOption,
    validate: {
      headers: makeRequestHeaderSchema(validate),
      failAction: async (request, h, err): Promise<ResponseObject> => {
        request.log('error', err);
        return h
          .response(BAD_REQUEST.message)
          .code(BAD_REQUEST.code)
          .type(JSON_TYPE)
          .takeover();
      },
      params: {
        id: validateObjectId(validate),
      },
    },

    tags: ['api'],
  },
  handler: async (request, h): Promise<ResponseObject> => {
    const payload = { id: request.params.id };
    request.log([`/${ROUTE_NAME}`]);
    let response;

    try {
      response = h.response(await services[ROUTE_NAME].removeById({ payload, config })).code(204);
    } catch (e) {
      response = h
        .response({ error: UNPROCESSABLE_ENTITY.message })
        .code(UNPROCESSABLE_ENTITY.code);
    }

    return response.type(JSON_TYPE);
  },
});

export const update{{{scaffold_entity_capitalise}}} = ({ services, validate, config }: RouteArgs): ServerRoute => ({
  method: 'PUT',
  path: '/{{{scaffold_entities}}}/{id}',
  options: {
    ...service.options.secureOption,
    validate: {
      headers: makeRequestHeaderSchema(validate),
      failAction: async (request, h, err): Promise<ResponseObject> => {
        request.log('error', err);
        return h
          .response(BAD_REQUEST.message)
          .code(BAD_REQUEST.code)
          .type(JSON_TYPE)
          .takeover();
      },
      params: {
        id: validateObjectId(validate),
      },
      payload: makeRequestPayloadSchema(validate),
    },

    tags: ['api'],
  },
  handler: async (request, h): Promise<ResponseObject> => {
    const payload = {
      ...(request.payload as object),
      id: request.params.id,
    };
    request.log([`/${ROUTE_NAME}`]);
    let response;

    try {
      response = h
        .response(await services[ROUTE_NAME].updateById({ payload, config }))
        .code(OK.code);
    } catch (e) {
      request.log([e]);
      response = h
        .response({ error: UNPROCESSABLE_ENTITY.message })
        .code(UNPROCESSABLE_ENTITY.code);
    }

    return response.type(JSON_TYPE);
  },
});
