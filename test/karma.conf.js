var webpackConfig = require('./../webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [
            'timeline/thread-status-benchmark.spec.ts',
            'xy/cpu-usage-benchmark.spec.ts',
            'xy/disks-io-benchmark.spec.ts',
            'xy/kernel-memory-benchmark.spec.ts',
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
        browsers: ['Chromium', 'Chrome'],
        singleRun: false
    })
}