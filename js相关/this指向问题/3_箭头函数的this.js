/**
 * 3. 箭头函数中的 this  call  apply  bind
 */
var ta = 22;

var obj = {
    ta: 11
}
function testA() {
    console.log(this.ta);
}
testA();//22
/**
 * apply call bind 都是函数的方法 他们将普通函数的 this指向从this->window变为this->传入的obj 
 */
testA.apply(obj);// 11
testA.call(obj);// 11
const TA1 = testA.bind(obj); // bind返回一个函数
TA1();// 11
console.log("--------------");
// 箭头函数则不一样
const arrowTestA = () => {
    console.log(this.ta);
}
/**
 * 可以看到 箭头函数的this 不被任何形式 改变指向 始终是最初定义时的指向
 * 甚至严格模式都改变不了
 * 并且 箭头函数不能被 new 箭头函数一定不是一个构造函数
 */
arrowTestA();// 22
arrowTestA.apply(obj);// 22 
arrowTestA.call(obj);// 22
const arrowBind = arrowTestA.bind(obj);
arrowBind();// 22