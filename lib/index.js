'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.questions = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _rxjs = require('rxjs');

var _generator = require('./endpoint/generator');

var _generator2 = require('./service/generator');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var questions = (exports.questions = {
  selection: {
    type: 'checkbox',
    name: 'scaffold',
    message: 'What would you like to scaffold?',
    choices: [
      {
        name: 'Endpoint',
        value: 'endpoint',
      },
      new _inquirer2.default.Separator(),
      {
        name: 'Microservice API',
        value: 'service',
      },
    ],
  },
  endpoint: [_generator.questions, _generator.generator],
  service: [_generator2.questions, _generator2.generator],
});

var build = async function build() {
  try {
    var prompts = new _rxjs.Subject();

    var scaffold = void 0;
    var generator = void 0;
    var answers = {};
    var i = -1;

    _inquirer2.default.prompt(prompts).ui.process.subscribe(
      function (_ref) {
        var answer = _ref.answer,
          name = _ref.name;

        if (i == -1) {
          scaffold = questions[answer][0];
          generator = questions[answer][1];
        }

        i++;
        answers[name] = answer;

        if (scaffold.length !== i) prompts.next(scaffold[i]);
        else prompts.complete();
      },
      function (err) {
        console.warn(err); // eslint-disable-line no-console
      },
      function () {
        generator(answers);
        console.log('\nCode generation completed.👋'); // eslint-disable-line no-console
      }
    );
    prompts.next(questions.selection);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
};

build();
