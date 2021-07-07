/**
 * 
 * instanceof 可以检验出是由说明构造函数构造出来的
 */

function Test() {

}

const test1 = new Test();

console.log(test1 instanceof Test);

// 数组instanceof
console.log([] instanceof Array);// true
console.log([] instanceof Object);// true
/**
 * 为什么会这样？
 * 因为 []是由 new Array() 构造的，即[].__proto__ = Array.prototype
 * 但是Array()构造函数Array.prototype也是一个对象{}，由Object构造而得
 * Array.prototype.__proto__ = Object.prototype,
 * instanceof沿着原型链可以找到Array.prototype和Object.prototype故，都为true
 * Object.prototype.__proto__ = null，找到顶端，结束查找
 */

// 实现instanceof ，一样是关键字，所以通过函数实现
function myInstanceof(origin, type) {
    origin = origin.__proto__;
    type = type.prototype; // 等于构造函数自己的prototype

    while (true) {
        // 到了原型链顶端都没有找到与类型的prototype相等的__proto__，说明于传进来的类型不一致
        if (origin === null) {
            return false;
        }

        if (origin === type) {
            return true;
        }
        // 沿着原型链向下一层查找
        origin = origin.__proto__;
    }
}

console.log(myInstanceof([], Array));// true
console.log(myInstanceof([], Object));// true
