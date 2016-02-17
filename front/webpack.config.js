var webpack = require('webpack');

module.exports = {
    context: __dirname + "/js",
    devtool: '#eval',
    entry: {
        js: "./main.js"
    },
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel' ,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
    ]
}
