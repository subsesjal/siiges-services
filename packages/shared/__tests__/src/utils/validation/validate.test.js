// External dependencies
const { faker } = require('@faker-js/faker');
// Internal dependencies
const { fakeData } = require('../../../auxiliary-constants');
const Logger = require('../../../../src/utils/logger');
const validate = require('../../../../src/utils/validation/validate');

Logger.warn = jest.fn();

const randomValue = faker.helpers.objectValue(fakeData);
const datatypeRandomValue = typeof randomValue;

const argumentsObject = {
  nameVar: 'randomValue',
  valueVar: randomValue,
  expectedDatatype: datatypeRandomValue,
};

describe('GIVEN a call to validate function', () => {
  test('THEN should return nothing', () => {
    const returnValue = validate(argumentsObject);
    expect(returnValue).toBeUndefined();
  });

  describe("WHEN the variable to validate isn't the expected datatype", () => {
    test('THEN it should call Logger.info with this parameters', () => {
      argumentsObject.expectedDatatype = 'invalidType';
      validate(argumentsObject);

      expect(Logger.warn).toHaveBeenCalledWith(
        `[shared/validate] TypeError this ${argumentsObject.nameVar} \
is not "${argumentsObject.expectedDatatype}"`,
      );
    });
  });
});
