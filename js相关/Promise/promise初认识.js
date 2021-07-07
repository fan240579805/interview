/**
 *  执行异步操作的时候，我们希望是结果同步的
    如：异步请求网络数据，我们希望一定要等到数据请求到了，
    再往下拿着data执行相应操作，而不是data还没到就往下执行了
 */
// 普通ajax请求等到结果请求到了，再往下执行存在回调地狱
// $.ajax({
//     data:{
//         d
//     },
//     success(data) {
//         $.ajax({
//             success(data2) {
//                 $.ajax({
//                     success() {
//                         $.ajax({
//                             success() {

//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
// })
// promise 异步编程同步化 异步与异步之间也有一个顺序，promise可以实现
/**
 * Promise 构造函数 new
 * 只有一个参数 执行期 excutor （函数）
 * promise对象存在三种状态：
    1)Fulfilled:成功状态
    2)Rejected：失败状态
    3)Pending：既不是成功也不是失败状态，可以理解为进行中状态
 */

// 1. Promise.all()  
// 多个异步任务结果完成。将结果拼接成数组，等待所有任务完成，
// 如果中间一个任务失败了，Rejected：失败状态，所有成功Fulfilled状态

const test1 = function () {
    return new Promise((resolve, reject) => {
        resolve('1成功')
    })
}
const test2 = function () {
    return new Promise((resolve, reject) => {
        //reject('2失败')
        resolve('2成功')
    })
}
const test3 = function () {
    return new Promise((resolve, reject) => {
        resolve('3成功')
    })
}
// 参数是一个可迭代对象[] , Set , Map，返回一个promise对象
Promise.all([
    test1(), // 一个promise对象
    test2(), // 一个promise对象
    test3(), // 一个promise对象
    { a: 1 }    // 是基本类型，直接拼接数组
]).then((res) => {
    console.log(res);// ["1成功", "2成功", "3成功"]
}).catch((err) => {
    console.log(err);// ('2失败')
})

/**
 * 2. Promise.race() 赛跑
 *    参数是一个可迭代对象[] , Set , Map，返回一个promise对象
 *    哪个异步任务先完成了，就返回完成的异步任务的Promise,
 *    test1()先完成就返回他 无论是Rejected失败状态还是Fulfilled状态
 */

Promise.race([
    test2(), // 一个promise对象
    test1(), // 一个promise对象
    test3(), // 一个promise对象
    { a: 1 },   // 是基本类型，直接拼接数组
]).then((res)=>{
    console.log(res);// 2 成功 test2()最先完成
}).catch((err)=>{
    console.log(err);
})

// async 后面跟着的函数相当于 一个pending状态的Promise
// await 后面相当于 then()