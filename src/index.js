import inquirer from 'inquirer';

import { generator as generateEndpoint, questions } from './endpoint/generator';

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
