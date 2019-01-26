'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _generator = require('./endpoint/generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questions = [{
  type: 'input',
  name: 'endpoint',
  message: 'Endpoint name (eg order, account, payment)'
}, {
  type: 'input',
  name: 'title',
  message: 'Endpoint title (eg Order, Account, Payment)',
  default: function _default(answers) {
    return (0, _capitalize2.default)(answers.endpoint);
  }
}, {
  type: 'input',
  name: 'endpoints',
  message: function message() {
    return 'Endpoint pluralisartion (eg orders, accounts, payments)';
  },
  default: function _default(answers) {
    return answers.endpoint + 's';
  }
}, {
  type: 'input',
  name: 'folder',
  message: 'Endpopint installation folder',
  default: function _default() {
    return _path2.default.resolve(__dirname, '../', './src');
  }
}];

var build = async function build() {
  try {
    var _ref = await _inquirer2.default.prompt(questions),
        endpoint = _ref.endpoint,
        endpoints = _ref.endpoints,
        title = _ref.title,
        folder = _ref.folder;

    (0, _generator.generator)({ endpoint: endpoint, endpoints: endpoints, title: title, folder: folder });
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
};

build();