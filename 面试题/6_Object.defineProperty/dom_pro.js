"use strict";
/** 1 */
let x = 5;
function fn(x) {
    return function (y) {
        console.log('result = ', y + (++x));
    }
}
let f = fn(6);
f(7);// 14
console.log('x=', x);// 5



/** 2 */
function Animal(params) {
    console.log(params);
    this.hasTail = true
    return params
}
console.log(new Animal);// 实例
console.log(new Animal());// 实例
console.log(new Animal({}));// { }

var var1 = 1;
function b() {
    var var1 = 1;
    var var2 = 2;
    a();
}
function a() {
    console.log(var1);
    //console.log(var2);
}
b();// 1 // error 因为a()的作用域在全局，全局下没有var2
console.log(var1);

console.log("-----------");

let obj1 = {
    func1: function () {
        console.log(this);
    },
    // 箭头函数this 永远不会改变，定义在哪就永远指向哪
    func2: () => {
        console.log(this);
    }
}
var list = [obj1.func1, obj1.func2];
var a1 = obj1.func1;
var a2 = obj1.func2;
obj1.func1();
obj1.func2();
a1();// 相当于 window.a1();this->window ; "use strict"模式下 this->undefined
a2();
list[0]();// 相当于list调用函数
list[1]();


