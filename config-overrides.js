const path = require("path");
// const webpack = require("webpack");

module.exports = function override(config, env) {
    config.resolve.alias = {
        '@': path.resolve(__dirname, 'src')
    }

    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]

    // config.resolve.fallback = {
    //     ...config.resolve.fallback,
    // }
    config.resolve.modules = (config.resolve.modules || []).concat([
        path.resolve(__dirname, 'src'),
        'node_modules',
    ])
    // config.plugins = [
    //     ...config.plugins,
    // ]
    return config;
}
