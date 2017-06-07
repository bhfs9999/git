var webpack = require('webpack');

module.exports = {
    //页面入口文件配置
    entry:  __dirname + "/app/main.jsx",

    //入口文件输出配置
    output: {
        path: __dirname +  "/app/build",
        filename : "bundle.js"
    },
    module: {
        //加载器配置
        loaders: [
             {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                //添加两个预先加载的组件，用来处理js或jsx类型的文件
                presets: ['es2015', 'react']
                }
            }
        ]
    },
    devServer: {
        contentBase: "./app/build",
        historyApiFallback: true,
        hot: true,
        inline: true,
        proxy: {
            '/newsdata.json': {
                target: 'http://localhost:4001/list_user',
                secure: false,
            }
        }
    },
    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.scss', 'jsx'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
        'process.env.NODE.ENV':"development"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};