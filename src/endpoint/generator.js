import Scaffold from 'scaffold-generator';
import capitalize from 'capitalize';
import mustache from 'mustache';
import path from 'path';
import { pickBy, startsWith } from 'ramda';
import mkdirp from 'mkdirp';

import config from './config';

export const questions = [
  {
    type: 'input',
    name: 'endpoint',
    message: 'Endpoint name (eg order, account, payment)',
  },
  {
    type: 'input',
    name: 'title',
    message: 'Endpoint title (eg Order, Account, Payment)',
    default: answers => capitalize(answers.endpoint),
  },
  {
    type: 'input',
    name: 'endpoints',
    message: () => 'Endpoint pluralisation (eg orders, accounts, payments)',
    default: answers => `${answers.endpoint}s`,
  },
  {
    type: 'input',
    name: 'destination',
    message: 'Endpopint installation destination',
    default: () => path.resolve(__dirname, '../', './src')
  },
];

export const generator = function({ endpoint, endpoints, title, destination }) {
  mkdirp(destination, (err) => {
    if (err) throw err;
  });

  const SCAFFOLD = path.resolve(__dirname, '../../', 'scaffold/endpoint');
  const DEST_DIR = destination;

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
