var webpackConfig = require('./../webpack.config');

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        files: [           
            'protocol/xy/cpu-usage-benchmark.spec.ts',
            'protocol/xy/disks-io-benchmark.spec.ts',
            'protocol/xy/kernel-memory-benchmark.spec.ts',
            'protocol/timeline/thread-status-benchmark.spec.ts'
        ],
        exclude: [
        ],
        preprocessors: {
            './**/*.ts': ['webpack']
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