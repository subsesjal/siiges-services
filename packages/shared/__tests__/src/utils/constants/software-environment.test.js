// Internal dependencies
const softwareEnvironments = require('../../../../src/utils/constants/software-environment');

const expectedObject = {
  DEV: expect.any(String),
  PROD: expect.any(String),
};

describe('Given a call to softwareEnvironments object', () => {
  test('Then it should have this structure', () => {
    expect(softwareEnvironments).toEqual(
      expect.objectContaining(expectedObject),
    );
  });
});
