const webpack = require('webpack');
const path = require('path');

const webpackExports = (env) => {
    const webpackConfig = {
        cache: false,
        entry: {
            preload: './src/preload.js',
            'intersection-observer': 'intersection-observer',
        },
        output: {
            path: path.resolve('wp-image-preload/assets/js/'),
            publicPath: '/js/',
            filename: '[name].js',
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        // https://github.com/babel/babel-loader#options
                        cacheDirectory: true,
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['last 2 versions'],
                                },
                            }],
                        ],
                        plugins: [
                            'transform-object-rest-spread',
                            'transform-class-properties',
                        ],
                    },
                    exclude: /(node_modules\/(?!p-wait-for)|bower_components)/,
                },
            ],
        },
        plugins: [
        ],
    };

    if (env === 'development') {
        webpackConfig.devtool = 'source-map';
        webpack.debug = true;
    }

    if (env === 'production') {
        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    drop_console: true,
                },
                output: {
                    comments: false,
                },
            }),
            new webpack.NoEmitOnErrorsPlugin(),
        );
    }
    return webpackConfig;
};

module.exports = webpackExports;
