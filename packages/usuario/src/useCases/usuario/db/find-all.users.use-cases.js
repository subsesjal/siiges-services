const {
  createSearchQuery,
  createUserOrder,
  normalizePagination,
  personaAttributes,
  rolAttributes,
  userAttributes,
} = require('../../../utils/pagination.utils');

const findAllUsers = (findAllQuery) => async (params = {}) => {
  const {
    page,
    limit,
    search = '',
    sortBy,
    sortOrder,
  } = params;
  const pagination = normalizePagination({
    page,
    limit,
    sortBy,
    sortOrder,
  });
  const include = [
    { association: 'persona', attributes: personaAttributes },
    { association: 'rol', attributes: rolAttributes },
  ];

  const result = await findAllQuery({}, {
    attributes: userAttributes,
    include,
    query: createSearchQuery(search),
    order: createUserOrder(pagination),
    pagination: {
      limit: pagination.limit,
      offset: pagination.offset,
      distinct: true,
    },
  });

  return {
    data: result.rows,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: result.count,
      totalPages: Math.ceil(result.count / pagination.limit),
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      search,
    },
  };
};

module.exports = findAllUsers;
