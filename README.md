[![CircleCI](https://circleci.com/gh/jabdul/apig.svg?style=svg)](https://circleci.com/gh/jabdul/apig)
[![Coverage Status](https://coveralls.io/repos/github/jabdul/apig/badge.svg?branch=master)](https://coveralls.io/github/jabdul/apig?branch=master)

apig
===

apig is the command-line interface tool for [crud-api](https://github.com/jabdul/crud-api).

It auto-generates the scaffolding of an */endpoint* or a microservice.

### installation

```sh
$ npm i -g @ctt/apig
```

### run generator
To generate a **service** or an **endpoint**, simply follow the instructions when you execute the `apig` command

```sh
$ apig
```

### notes

1. After generating a **service**, rename the `package.json.replace` at root of new service to `package.json`
