var webpackConfig = require('./webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'test/xy/test-disks-io.spec.ts',
            'test/xy/test-kernel-memory.spec.ts',
            'test/xy/test-cpu-usage.spec.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        mime: {
            'text/x-typescript': ['ts','tsx']
        },
        reporters: ['progress'],
        port: 8000,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: false,
        browsers: ['Chromium'],
        singleRun: false
    })
}