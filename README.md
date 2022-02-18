# Challenge

## Descrição

O projeto foi desenvolvido utilizando o framework NestJS. Tomei essa decisão pela agilidade + custo-benefício.

## Estrutura de pastas

#### Pasta principal ```src/```
  - ``` /_config ```       configurações gerais como variáveis de ambiente
  - ``` /stock ```         módulo de rawMaterials
  - ``` app.module.ts ```  carrega os demais módulos e configurações globais
  - ``` main.ts ```        bootstrap/inicialização de toda aplicação

#### Estrutura de um módulo
  - services
  - controller
  - /dto/
  - /entities/

## Acesso a documentação da API(Swagger)
- ``` http://localhost:3000/api ```

## Instalação
#### caso na hora de instalar os pacotes dê algum erro, preferível usar o Yarn como instalador de pacote

```bash
$ npm install
$ yarn install
```

## Rodar o projeto com Docker
```bash
$ docker-compose up
```

## Rodar o projeto localmente

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testar localmente

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
