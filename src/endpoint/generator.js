import Scaffold from 'scaffold-generator';
import mustache from 'mustache';
import path from 'path';
import { pickBy, startsWith } from 'ramda';
import mkdirp from 'mkdirp';

import config from './config';

export const generator = function({ endpoint, endpoints, title, folder }) {
  mkdirp(folder, (err) => {
    if (err) throw err;
  });

  const SCAFFOLD_ENDPOINT = '../../scaffold/endpoint';
  const ENTITIES_BOILERPLATE = path.resolve(folder, SCAFFOLD_ENDPOINT, '{{{scaffold_entities}}}');
  const MONGOOSE_ENTITY_BOILERPLATE = path.resolve(folder, SCAFFOLD_ENDPOINT, 'persistence/mongoose/{{{scaffold_entity_capitalise}}}');
  const ENTITIES_DIR = folder;
  const MONGOOSE_ENTITY_DIR = path.resolve(folder, 'persistence/mongoose');

  mustache.escape = v => v;

  new Scaffold({
    data: {...pickBy(
      (val, key) => startsWith('scaffold_', key),
      { ...config, ...{
        scaffold_entities: endpoints,
        scaffold_entity: endpoint,
        scaffold_entity_capitalise: title,
      }}
    )},
    ignore: config.FILES_IGNORE,
    render: mustache.render,
  })
  .copy(ENTITIES_BOILERPLATE, ENTITIES_DIR)
  .copy(MONGOOSE_ENTITY_BOILERPLATE, MONGOOSE_ENTITY_DIR)
  .then(() => {
    console.log('done'); // eslint-disable-line no-console
  })
  .catch(e => {
    console.log(e); // eslint-disable-line no-console
  });
}
