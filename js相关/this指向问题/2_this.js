
/**
 * 2.
 */
 class Test {
    constructor() {
        console.log(this);
        // 类的非静态方法 直接 new 时定义在 类的最外层上
        this.test = function () {
            console.log("non-static：" + this);
        }
    }
    // 类的静态方法 定义在 Test实例{}的__proto__上 即构造函数Test 的prototype上
    test() {
        console.log("static：" + this);
    }
}
// new 实例化类 其实就是 将 this 指向这个对象  this-> { }
const t = new Test();
console.log(t);
//执行非静态方法  因为在最外层找到了非静态的test()，所以不会沿着原型链继续往下找 
t.test();// console.log("non-static：" + this);