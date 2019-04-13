import inquirer from 'inquirer';
import { Subject } from 'rxjs';

import { generator as endpointGenerator, questions as endpointQuestions } from './endpoint/generator';
import { generator as serviceGenerator, questions as serviceQuestions } from './service/generator';

export const questions = {
  selection: {
    type: 'checkbox',
    name: 'scaffold',
    message: 'What would you like to scaffold?',
    choices: [
      {
        name: 'Endpoint',
        value: 'endpoint',
      },
      new inquirer.Separator(),
      {
        name: 'Microservice API',
        value: 'service',
      }
    ]
  },
  endpoint: [ endpointQuestions, endpointGenerator ],
  service: [ serviceQuestions, serviceGenerator ],
};

const build = async () => {
  try {
    const prompts = new Subject();

    let scaffold;
    let generator;
    let answers = {};
    let i = -1;

    inquirer.prompt(prompts)
      .ui.process.subscribe(
        ({ answer, name }) => {
          if (i == -1) {
            scaffold = questions[answer][0];
            generator = questions[answer][1];
          }

          i++;
          answers[name] = answer;

          if (scaffold.length !== i) prompts.next(scaffold[i]);
          else prompts.complete();
        },
        err => {
          console.warn(err); // eslint-disable-line no-console
        },
        () => {
          generator(answers);
          console.log('Code generation completed.👋\n'); // eslint-disable-line no-console
        }
      );
    prompts.next(questions.selection);
  }
  catch(err) {
    console.log(err); // eslint-disable-line no-console
  }
}

build();
