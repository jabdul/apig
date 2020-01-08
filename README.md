# apig

[![CircleCI](https://circleci.com/gh/CraftTurf/apig.svg?style=svg)](https://circleci.com/gh/CraftTurf/apig)
[![Coverage Status](https://coveralls.io/repos/github/CraftTurf/apig/badge.svg)](https://coveralls.io/github/CraftTurf/apig?branch=master)

apig is the command-line interface tool for [crud-api](https://github.com/jabdul/crud-api).

It auto-generates the scaffolding of an _/endpoint_ or a microservice.

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
