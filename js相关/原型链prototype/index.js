/**
 * prototype : 原型
 * __proto__ : 原型链（连接点）
 *
 * prototype   -> 函数的1个属性 是个对象 {}
 * __proto__   -> 对象Object的1个属性 是个对象 {} 
 * 
 * __proto__ 保存其对象的构造函数 的 prototype
 * 
 * 
 */

function Test() {
    this.a = 1;
    this.b = 222;
}

var t = new Test();
Test.prototype.b = 2; // 相当于 t.__proto__.b = 2

console.log(Test.prototype);

console.log(t.__proto__);

console.log(t.__proto__ === Test.prototype); // true

// 因为 prototype 本身是个对象{ } 所以他也具有 __proto__

// 保存着 Test 的prototype 的构造函数( Object() )的 prototype Object.prototype
console.log(Test.prototype.__proto__);

console.log(Object.prototype === Test.prototype.__proto__);// true
// 已经到原型链的顶部了 不能再往下找到 原形了
console.log(Object.prototype.__proto__);// null 

console.log(t.__proto__);// {b: 2, constructor: ƒ} === Test.prototype

Object.prototype.c = 3;
console.log(t);
/**
 * 实例t的原型链结构
    t{
        a:1,
        __proto__: Test.prototype = {
            b:2,
            __proto__: Object.prototype ={
                // 到底了 没有__proto
                c :3
            }
        }
    }
 */
/**
 * 原型链继承 
 * 虽然 b , c 都不在t的第一层{}底下
 * 但是 对象会一直沿着__proto__ 往上查找 
 * 访问t.a 时 先查找 最外层 找到了 a=1，停止查找 输出t.a 1
 * 访问t.b 时 先查找 最外层 没找到，根据__proto__ 往下一层查找 找到b = 2 输出t.b 2
 * 访问t.c 时 先查找 最外层 没找到，根据__proto__ 往下一层查找 没找到c 
 * 再根据第二层的__proto__找下一层第3层 找到c = 3 输出t.c 3
 */
console.log(t.a);// 1
console.log(t.b);// 2（没有this.b=222的情况） 
console.log(t.c);// 3
// 我们往 Test() 构造函数中初始化 b =333 ,Test.prototype.b =2 仍然保留
/**
 * 新实例t的原型链结构
    t{
        b:222,
        a:1,
        __proto__: Test.prototype = {
            b:2,
            __proto__: Object.prototype ={
                // 到底了 没有__proto
                c :3
            }
        }
    }
 */
console.log(t.a);// 1
console.log(t.b);// 222 找第一层直接找到 b了 停止查找直接输出  所以 第二层的b不能被访问 
console.log(t.c);// 3

console.log("检测实例第一层 是否含有属性");
console.log(t.hasOwnProperty('a')); // true
console.log(t.hasOwnProperty('b')); // true
console.log(t.hasOwnProperty('c')); // false c 在第三层
console.log("检测整个原型链上是否含有属性");
console.log('a' in t); // true 
console.log('b' in t); // true
console.log('c' in t); // true

// 构造函数 Test() 实际上是 const Test = new Function(); 得到的
// 所以他既是函数 Function 又是对象 Object 所以他也有 __proto__
console.log(Test.__proto__);
console.log(Function.prototype);
console.log(Test.__proto__ === Function.prototype);// true

// Function 也是既是函数又是对象 但是他 已经到最顶层了 所以规定
// Function.prototype === Function.__proto__
console.log(Function.__proto__  === Function.prototype); // true


// const obj = {} 相当于 const obj = new Object()
// 同理 Object 是 Function 也是 Object
console.log(Object.__proto__ === Function.prototype);// true
console.log(Object.__proto__ === Function.__proto__);// true
