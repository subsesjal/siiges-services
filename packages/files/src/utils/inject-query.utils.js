function injectQuery(query, fn) {
  return fn(query);
}

module.exports = injectQuery;
