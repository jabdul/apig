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

  const SCAFFOLD = path.resolve(__dirname, '../../', 'scaffold/endpoint');
  const DEST_DIR = folder;

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
  .copy(SCAFFOLD, DEST_DIR)
  .then(() => {
    console.log('done'); // eslint-disable-line no-console
  })
  .catch(e => {
    console.log(e); // eslint-disable-line no-console
  });
}
