## Description

BFF em Nest para atender ao teste técnico da AB InBev

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install

$ cd src/config && docker-compose up

```

Criar arquivo .env com a variável: DATABASE_URL="postgresql://postgres:postgres@localhost:5433/user_db"

Execute o comando para popular as tabelas:

```bash
$ yarn seed
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
