const path = require("path");
const {VueLoaderPlugin}=require('vue-loader')
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    devtool: 'source-map',
    entry: NODE_ENV == "development" ? "./example/main.js" : "./src/index.js",
    output: {
        path: path.resolve(__dirname, './lib'),
        publicPath: '/lib/',
        filename: 'tl.scroll.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/lib|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets: ["env"]
                    }
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase: path.resolve(__dirname, "example"),
        host : "localhost",
        port : 80,
        compress : true
    }
};