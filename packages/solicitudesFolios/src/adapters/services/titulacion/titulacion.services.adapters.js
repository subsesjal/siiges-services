const axios = require('axios');
const { config } = require('../../../../config/environment');

const makeRequest = async (url, method = 'GET', data = null) => {
  const apiUrl = config.apiBaseUrl + url;

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    url: apiUrl,
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.data = data;
  }

  return axios(options);
};

makeRequest.create = async (data) => {
  const url = '/individual';
  return makeRequest(url, 'POST', data);
};

makeRequest.findOne = async (id) => {
  const url = `/find/${id}`;
  return makeRequest(url, 'GET');
};

makeRequest.findAll = async () => {
  const url = '/findAll';
  return makeRequest(url, 'GET');
};

makeRequest.update = async (id, data) => {
  const url = `/update/${id}`;
  return makeRequest(url, 'PUT', data);
};

makeRequest.delete = async (id) => {
  const url = `/delete/${id}`;
  return makeRequest(url, 'DELETE');
};

module.exports = {
  create: makeRequest.create,
  findOne: makeRequest.findOne,
  findAll: makeRequest.findOne,
  update: makeRequest.update,
};
