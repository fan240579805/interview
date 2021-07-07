/**
 * 函数声明 !== 函数表达式
 * 只有函数表达式才可以 立即执行
 */

// function test() {
//     console.log("函数声明");
// }
// var test1 = function () {
//     console.log("函数表达式");
// }
// test(); 函数声明
// test1(); 函数表达式

// 立即执行函数 （匿名函数）函数声明 用括号包起来变为函数表达式
(function te(a, b, c, d) {
    console.log("立即执行函数");
    console.log(this); // this 指向window
    console.log(arguments.length);//实参 个数 3（1，2，3）
    console.log(te.length);// 形参个数 4 （a,b,c,d）
})(1, 2, 3);

(function () {
    /**
     *   立即执行函数的好处
     *    1. 独立的作用域 外部不可调用
     *    2. 执行完立刻销毁
     */
    console.log("匿名-》立即执行");

})()

var t1 = function () {
    console.log("函数表达式-》立即执行");
}()

// t1(); 报错 不能调用立即执行函数