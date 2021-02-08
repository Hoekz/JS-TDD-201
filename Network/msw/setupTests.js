require('core-js/stable');
require('regenerator-runtime/runtime');
require('isomorphic-fetch');

const server = require('./server');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
