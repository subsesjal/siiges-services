// External dependencies
const { models, queries } = require('@siiges-services/core');

const {
  Noticia,
} = models;

const {
  findOneQuery,
  findAllQuery,
  createQuery,
  deleteAndFindQuery,
  updateAndFindQuery,
} = queries;

module.exports = {
  findOneNoticiaQuery: findOneQuery(Noticia),
  findAllNoticiaQuery: findAllQuery(Noticia),
  createNoticiaQuery: createQuery(Noticia),
  deleteNoticiaQuery: deleteAndFindQuery(Noticia),
  updateNoticiaQuery: updateAndFindQuery(Noticia),
};
