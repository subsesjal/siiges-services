const {
  createSearchQuery,
  createUserOrder,
  normalizePagination,
  personaAttributes,
  rolAttributes,
  userAttributes,
} = require('../../../utils/pagination.utils');

const findAllUserUsers = (findAllUserUsersQuery) => async (principalId, params = {}) => {
  const pagination = normalizePagination(params);
  const include = [
    {
      association: 'principal',
      attributes: ['id'],
      include: [{ association: 'persona', attributes: personaAttributes }],
    },
    {
      association: 'secundario',
      attributes: userAttributes,
      include: [
        { association: 'persona', attributes: personaAttributes },
        { association: 'rol', attributes: rolAttributes },
      ],
    },
  ];

  const result = await findAllUserUsersQuery(
    { principalId },
    {
      include,
      strict: true,
      query: createSearchQuery(params.search, 'secundario.'),
      order: createUserOrder(pagination, 'secundario'),
      pagination: {
        limit: pagination.limit,
        offset: pagination.offset,
        distinct: true,
      },
    },
  );

  const data = result.rows.map((userUser) => {
    const userTransformed = userUser.toJSON();
    return userTransformed.secundario;
  });

  return {
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: result.count,
      totalPages: Math.ceil(result.count / pagination.limit),
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder,
      search: params.search || '',
    },
  };
};

module.exports = findAllUserUsers;
