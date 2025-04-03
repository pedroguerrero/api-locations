import configuration from './configuration';

describe('configuration', () => {
  beforeAll(() => {
    process.env.DATABASE_HOST = 'sample1';
    process.env.DATABASE_PORT = '1234';
    process.env.DATABASE_USERNAME = 'sample3';
    process.env.DATABASE_PASSWORD = 'sample4';
    process.env.DATABASE_NAME = 'sample5';
  });

  it('should have a valid configuration', () => {
    const response = configuration();

    expect(response).toEqual({
      database: {
        host: 'sample1',
        port: 1234,
        username: 'sample3',
        password: 'sample4',
        name: 'sample5',
      },
    });
  });
});
