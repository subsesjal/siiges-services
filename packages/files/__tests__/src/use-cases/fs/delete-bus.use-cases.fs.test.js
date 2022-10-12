// External dependencies
const { faker } = require('@faker-js/faker');
const fsp = require('fs/promises');
const { checkers } = require('@siiges-services/shared');
// Internal dependencies
const { deleteBus } = require('../../../../src/useCases/fs');
const { directory, file } = require('../../../../src/adapters/fs');
const { fileData } = require('../../../constants');

jest.mock('fs/promises', () => ({
  unlink: jest.fn(),
}));

jest.mock('@siiges-services/shared', () => ({
  checkers: {
    isDefined: jest.fn(),
  },
}));

jest.mock('../../../../src/adapters/fs', () => {
  const originalModule = jest.requireActual('../../../../src/adapters/fs');
  return {
    ...originalModule,
    directory: { createPath: jest.fn() },
  };
});

const unlinkIfNameIsDefined = jest.spyOn(file, 'unlinkIfNameIsDefined');

describe('Given a file instance', () => {
  test('THEN it should call direcroy.createPath', () => {
    unlinkIfNameIsDefined.mockImplementationOnce(jest.fn());
    deleteBus(fileData).then(() => expect(directory.createPath).toHaveBeenCalledWith(fileData));
  });

  test('THEN it should call file.unlikIfNameIsDefined', () => {
    const filePath = faker.system.filePath();

    directory.createPath.mockReturnValue(filePath);
    unlinkIfNameIsDefined.mockImplementationOnce(jest.fn());
    deleteBus(fileData).then(() => expect(
      unlinkIfNameIsDefined,
    ).toHaveBeenCalledWith(fileData, filePath));
  });

  describe('When nombre propetry exist in currentFile params', () => {
    test('THEN it should call fsp.unlik', () => {
      const filePath = faker.system.filePath();

      directory.createPath.mockReturnValue(filePath);
      checkers.isDefined.mockReturnValueOnce(true);
      deleteBus(fileData).then(() => expect(fsp.unlink).toHaveBeenCalled());
    });
  });
});
