# api-chagas
Repositório API Chagas.AI

Para fazer uma migração:
  1- no arquivo: src\database\config.js, alterar o import 'dotenv/config'; por require('dotenv').config(); e alterar o export default {} por module.exports = {};
  2- no arquivo: package.json, remover a linha type: "module"
  3- rodar comando no terminal: yarn run sequelize-cli db:migrate
  4- refazer mudanças
