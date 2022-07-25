// Internal dependencies
const envCheckers = require('../../../../src/utils/env-checkers');

const envCheckersObject = {
  isDevEnvironment: expect.any(Function),
  isProdEnvironment: expect.any(Function),
};

describe('given a programmer who need to import envCheckers modules', () => {
  describe('when they import in their file', () => {
    test('then it should have the right structure', () => {
      expect(envCheckers).toEqual(
        expect.objectContaining(envCheckersObject),
      );
    });
  });
});
