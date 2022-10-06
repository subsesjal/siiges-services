// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { createInclude } = require('../../../../src/adapters/utils');
const {
  includeList,
  includeListResult,
  nestedInclude,
  nestedIncludeResult,
} = require('../../../auxiliary-constants');

jest.mock('sequelize', () => ({
  Op: { is: jest.fn() },
}));
const strict = faker.datatype.boolean();

describe('Given a list with nested includes', () => {
  test('then it should return an object with this structure', () => {
    const returnObjList = createInclude(nestedInclude, strict);

    returnObjList.forEach((returnObj) => {
      expect(returnObj).toMatchObject({ ...nestedIncludeResult });
    });
  });
});

describe('Given a list of columns name', () => {
  test('THEN it should return a list of object with this structure', () => {
    const returnObjList = createInclude(includeList, strict);

    returnObjList.forEach((returnObj) => {
      expect(returnObj).toMatchObject({ ...includeListResult });
    });
  });
});

describe('Given an different value to a list', () => {
  test('THEN it should return undefined', () => {
    const returnValue = createInclude('');
    expect(returnValue).toBeUndefined();
  });
});
