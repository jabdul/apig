import path from 'path';
import inquirer from 'inquirer';
import capitalize from 'capitalize';

import { generator as generateEndpoint } from './endpoint/generator';

const questions = [
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
    message: () => 'Endpoint pluralisartion (eg orders, accounts, payments)',
    default: answers => `${answers.endpoint}s`,
  },
  {
    type: 'input',
    name: 'destination',
    message: 'Endpopint installation destination',
    default: () => path.resolve(__dirname, '../', './src')
  },
];

const build = async () => {
  try {
    const { endpoint, endpoints, title, destination } = await inquirer.prompt(questions);

    generateEndpoint({ endpoint, endpoints, title, destination });
  }
  catch(err) {
    console.log(err); // eslint-disable-line no-console
  }
}

build();
