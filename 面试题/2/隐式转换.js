/**
 *  怎么样定义创建a，可以使得 以下表达式成立 
 *  if(a==1&&a==2&&a==3){
        console.log("success");
    }
 */
/**
 * 1. toString隐式转换
 *      一个对象默认会含有toString方法，当用对象进行比较时
 *      会执行这个隐式方法，
 *      所以我门可以重写toString，使其比较时自动执行该方法
 *      如果时===则比较时不会进行toString隐式转换
 */
var a = {
    _default: 0,
    toString: function () {
        return ++this._default;
    }
}
// 每次进行比较时，a对象自动toString，并返回一个自增的default
// 实现题意
if (a == 1 && a == 2 && a == 3) {
    console.log("success");
}

/**
 * 2. b Object.defineProperty(window, 'b',实现
 */
var _default = 0;
Object.defineProperty(window, 'b', {
    get() {
        return ++_default;
    }
})
if (b == 1 && b == 2 && b == 3) {
    console.log("success b");
}

// 同步代码执行完成 函数执行栈(call stack)清空 => event loop 轮询微任务 => 渲染dom => event loop 轮询宏任务
// new Promise((resolve, reject) => {
//     console.log("123");// 同步代码 1
//     resolve();
// }).then(() => {
// 微任务
//     console.log("1234");// 4
// })
// setTimeout(() => {
//     console.log("setTimeout");//6
// }, 0);
// async function async1() {
//     console.log("111");//同步代码 2
//     await async2(); // 同步代码
// await 后面相当于then()的回调函数属于微任务
//     console.log("333");// 微任务 5
// }
// async1();
async function async2() {
    console.log("2222");//同步代码 3
}
async function async1() {
    console.log('async1 start');// 2
    await async2();
    console.log('async1 end');// 6
}
async function async2() {
    console.log('async2');// 3
}
console.log('script start'); // 1
setTimeout(function () { console.log('setTimeout') }, 0);//8

async1();
new Promise(function (resolve) {
    console.log('promise1');// 4
    resolve();
}).then(function () {
    console.log('promise2');//7
});
console.log('script end');// 5


