/**
 * webpack 入口起点文件
 * 1. 运行指令
 *      开发环境： webpack ./src/index.js -o ./bulid --mode=development
 *                指令     入口文件位置    -o输出 目标位置
 *      生产环境： webpack ./src/index.js -o ./bulid --mode=production
 * 
 * 2. webpack只能处理 js/json 打包文件，img/css/less其他文件都不能打包，需要loader处理
 */
import data from './data.json'
import './index.css'
import  '../app';
const a = 123;
console.log(data);

function add(x, y) {
    return x + y;
}

console.log(add(1, 2));