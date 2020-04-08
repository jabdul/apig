import server from '../../src/server';

export default async () => await server();

export const resourceId = ({ _links }) => _links.self.href.substr(1);

export const parsedResponse = ({ payload }) => JSON.parse(payload);

export const embeddedResource = ({ _embedded }, key) => _embedded[key];
