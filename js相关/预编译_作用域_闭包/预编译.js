// 预编译
// 1.检查语法错误
// 2.预编译的过程
// 3.解释一行，执行一行
/**
 * 函数声明会在预编译时提升到代码的最顶层，整体提升
 * console.log(test());// f test(){var a = 1}
 * test(){
 *  var a = 10
 * }
 * 变量声明也会提升到最顶层，但是赋值不提升，
 * console.log(a) // undifined
 * var a = 10;
 */
function test(a) {
    console.log(a);
    var a = 1;
    console.log(a);
    function a() { }
    console.log(a);
    var b = function () { }
    console.log(b);
    function d() { }
}
test(3);
// AO = active object 活跃对象 函数上下文
// test()函数内部的预编译过程 先生成AO

// AO = {
//     1. 寻找函数的形参和变量声明(寻找var 无视if语句)
//     2. 把实参参数值赋给形参
//     3. 寻找函数声明
//     4. 开始执行，将值赋给变量声明
//     a:undefined -> 实参2 -> function a(){} -> 1
//     b:undefined -> function () { }
//     d:function()
// }

// GO = global object 全局上下文 相当于window
// 和 AO 比少了一步实参形参，如果AO 中能找到a则不去GO中找反之则去Go中找
var ta = 2;
function ta() {
    console.log(2);
}
console.log(ta); //  2
//     1. 寻找变量声明 var ta
//     2. 寻找函数声明 function ta()
//     3. 按顺序开始执行，将值赋给变量声明 ta= xxx;
/**
 * GO = {
 *    ta:undefined(变量声明) -> function ta() -> 2
 * }
 */
/**
 * 立即执行函数的AO问题
 * 立即执行函数是 函数表达式(function b() {}) 执行()，本质是表达式，也不会提升到顶部
 * 所以他不会进入AO/GO只用在他执行之后，才会进入自己的AO中
 */
var b = 20;
(function b() {
    b = 10;
    console.log(b);// f b(){...}
})()
/**
 * 1. 找到变量声明 var b ; (function b() {})是表达式不是声明
 * 2. 无声明了，开始按顺序执行
 * 3. b = 20 执行,function b()执行
 * 4. 立即执行函数的AO = { b:undefined -> function b() }
 * 5. function b()没有定义变量b，所以b是暗示全局变量，执行 b = 10，全局的 b由20->10
 * 6. 打印 b ，从作用域链找到最顶部的b，也就是立即执行函数的AO的b -> function b()
 * GO = {
 *     b: undefined -> 20 -> 10
 * }
 */