export default ({
  error = {}, {{{scaffold_entities}}}, previousPage = 0, nextPage = 1,
  total, limit, page, pages, offset,
}, config) => ({
  _links: {
    self: { href: '/{{{scaffold_entities}}}' },
    curies: [
      {
        name: 'ea', href: `https://${config.get('server.hostname')}:${config.get('server.port')}/{rel}`, templated: true
      }
    ],
    'ea:find': { href: '/{{{scaffold_entities}}}{?uuid}', templated: true },
    'ea:search': { href: '/{{{scaffold_entities}}}/page/{pageid}?{?limit}&{?name}', templated: true },
    'ea:previous': { prompt: 'Back', href: `/{{{scaffold_entities}}}/page/${previousPage}?limit=${limit}` },
    'ea:current': { prompt: 'Current', href: `/{{{scaffold_entities}}}/page/${page}?limit=${limit}` },
    'ea:next': { prompt: 'Forward', href: `/{{{scaffold_entities}}}/page/${nextPage}?limit=${limit}` }
  },
  [error && 'error']: {
    title: error.title,
    code: error.code,
    message: error.message
  },
  _embedded: {
    'ea:{{{scaffold_entity}}}': {{{scaffold_entities}}}.map(({
      uuid, name, meta
    }) => ({
      _links: {
        self: { href: `/${uuid}` }
      },
      name,
      meta,
    }))
  }
});
