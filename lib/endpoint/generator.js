'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generator = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _scaffoldGenerator = require('scaffold-generator');

var _scaffoldGenerator2 = _interopRequireDefault(_scaffoldGenerator);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ramda = require('ramda');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generator = exports.generator = function generator(_ref) {
  var endpoint = _ref.endpoint,
      endpoints = _ref.endpoints,
      title = _ref.title,
      destination = _ref.destination;

  (0, _mkdirp2.default)(destination, function (err) {
    if (err) throw err;
  });

  var SCAFFOLD = _path2.default.resolve(__dirname, '../../', 'scaffold/endpoint');
  var DEST_DIR = destination;

  _mustache2.default.escape = function (v) {
    return v;
  };

  new _scaffoldGenerator2.default({
    data: (0, _extends3.default)({}, (0, _ramda.pickBy)(function (val, key) {
      return (0, _ramda.startsWith)('scaffold_', key);
    }, (0, _extends3.default)({}, _config2.default, {
      scaffold_entities: endpoints,
      scaffold_entity: endpoint,
      scaffold_entity_capitalise: title
    }))),
    ignore: _config2.default.FILES_IGNORE,
    render: _mustache2.default.render
  }).copy(SCAFFOLD, DEST_DIR).then(function () {
    console.log('done'); // eslint-disable-line no-console
  }).catch(function (e) {
    console.log(e); // eslint-disable-line no-console
  });
};