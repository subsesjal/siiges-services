jest.mock('@siiges-services/shared', () => {
  const originalModule = jest.requireActual('@siiges-services/shared');
  return {
    ...originalModule,
    __esmodule: true,
    checkers: {
      ...originalModule.checkers,
      isDefined: jest.fn(),
    },
    dotenv: {
      getEnvironmentVar: jest.fn(),
    },
    Logger: {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
  };
});

jest.mock('@hapi/boom', () => ({
  notFound: jest.fn().mockImplementation(() => { throw Error; }),
}));

jest.mock('fs/promises', () => ({
  __esmodule: true,
  unlink: jest.fn(),
  stat: jest.fn(),
  mkdir: jest.fn(),
}));

jest.mock('../src/adapters/db/files.db.adapters', () => ({
  deleteFileQuery: jest.fn(),
  updateFileQuery: jest.fn(),
  createFileQuery: jest.fn(),
  findOneFileQuery: jest.fn(),
  findAllFileQuery: jest.fn(),
}));

jest.mock('../src/adapters/db/document-type.db.adapters', () => ({
  findOneQueryDocumentType: jest.fn(),
}));

jest.mock('../src/adapters/db/entity-type.db.adapters', () => ({
  findOneQueryEntityType: jest.fn(),
}));
