/**
 * 因为new 是关键字，模拟不了
 * 所以我们用 函数myNew()模拟
 */

// 构造函数
// 如果构造函数执行完成后返回对象，则实例化时返回的对象，而不是构造函数构造的{ }
function test(a, b) {
    console.log(this);
    this.a = a;
    this.b = b;
    // return {
    //     c: 3,
    //     d: 4
    // }
}

/**
 * new 实例化过程
 * 1. 生成一个{ }
 * 2. this -> {}
 * 3. {}.__proto__ = 构造函数.prototype
 */
function myNew() {
    // 第一个参数为构造器，剩下的为实参要传递给构造函数
    // 对arguments不能直接调用api
    // 要call调用，并修改[]的this指向
    var constructor = [].shift.call(arguments);

    // 1. 生成一个{ }
    var _ret = {}
    // 2. 构造函数的 this -> {}, 剩下的参数呈递给constructor
    var cReturn = constructor.apply(_ret, arguments)
    // 3. {}.__proto__ = 构造函数.prototype
    _ret.__proto__ = constructor.prototype;
    // 判断 构造函数执行后的返回值是否是对象,是的话返回构造函数的返回值
    // 不是则返回构造出来的新对象
    return Object.prototype.toString.call(cReturn) === '[object Object]'
        ? cReturn : _ret;

}

var instance = myNew(test, 1, 2);
console.log(instance);
var ins1 = new test(1, 2);
console.log(ins1);