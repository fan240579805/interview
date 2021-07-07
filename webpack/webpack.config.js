const path = require('path');
const UglifyJS = require('uglifyjs-webpack-plugin');

// webpack配置文件
module.exports = {
    entry: './src/index.js',// 指定入口文件
    // 输出打包后的文件位置
    output: {
        path: path.join(__dirname, 'bulid'),// 输出路径
        filename: 'bundle.js',// 输出文件名
    },
    // loader 帮助webpack解析非js文件，如css/png/less
    module: {
        // 规则
        rules: [
            {
                // 正则表达式匹配 .css文件
                test: /\.css$/,
                // use loader 解析css文件 stye-loader解析样式
                // webpack 执行loader的顺序与数组顺序相反
                // 一定要先解析css 再执行style 因此 'css-loader'写在后面
                use: ['style-loader', 'css-loader']
            },
            // 解析图片
            {
                // 正则表达式匹配 ，图片
                test: /\.jpg|png$/,
                use: ['url-loader']
            },
            // ES6 -> ES5 BABEL 因为有一些浏览器不支持ES6为了兼容，要转成ES5
            // 排除掉node_modules中的js文件转化
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // plugins插件压缩代码体积
    plugins: [
        new UglifyJS()
    ],
    // resolve 解决
    resolve:{
        // extensions 可以忽略 import 文件的后面的后缀 
        // 如 import 'index.js' 设置extensions后可以 简写成 import 'index'
        extensions:['.js']
    }
}