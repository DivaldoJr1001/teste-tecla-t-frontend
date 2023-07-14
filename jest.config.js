const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.app.json');
module.exports  =   {
    preset:   'jest-preset-angular',
    roots:  ['<rootDir>/src/'],
    testMatch:  ['**/+(*.)+(spec).+(ts|js)'],
    setupFilesAfterEnv:  ['<rootDir>/src/window-mock.ts'],
    collectCoverage:  true,
    coverageReporters:  ['html'],
    coverageDirectory:   'coverage/my-ng-app',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '/' })
};
