const path = require('path');

module.exports = {
    testEnvironment: 'jest-environment-jsdom-sixteen',
    setupFilesAfterEnv: [
        path.join(process.cwd(), process.argv[2], 'setupTests.js')
    ]
};
