const PENDING = "PENDGING",
    FULLFILLED = "FULFILLED",
    REJECTED = "REJECTED"
/**
 * 1. pending -> fulfilled/rejected
*     fulfilled 不能转成别的状态
*     rejected  不能转成别的状态
*     pending可以
*  2.
    Promise.then() 执行后返回的是一个新的Promise
 */
/**
 * 3. 
 * promiseResolve 判断executor的两个回调函数的返回值到底是 普通值 or Promise or throw Error
 */
function promiseResolve(promise2, x, resolve, reject) {
    // promise2 和 x 指向同一个地址，即 回调函数返回一个promise2
    if (promise2 === x) {
        reject(new TypeError("TypeError:"))
    }

    // 如果 x 是一个对象或者函数
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then; // 可能会 throw err
            // Promise 一定有then() 方法 
            if (typeof then === 'function') {
                // x 是个Promise，执行这个新的Promise.then()
                then.call(x, (y) => {
                    // resolve(y);
                    // y 可能也是个新的Promise，所以递归调用
                    promiseResolve(promise2, y, resolve, reject)
                }, (r) => {
                    reject(r)
                })

            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }

    } else {
        // x = 普通值 ，直接resolve
        resolve(x);
    }
}

class MyPromise {

    constructor(executor) {

        this.status = PENDING; // Promise状态
        this.reason = undefined;// Promise 错误原因
        this.value = undefined;// Promise 成功时得值

        this.onFullFilledCbs = [];
        this.onRejectCbs = [];

        // 要用箭头函数 箭头函数会继承 constructor得this 也就是实例
        // 不定义在constructor外部是因为每个实例的 resolve都不一样，应该在构造时就重新设定
        const resolve = (res) => {
            // resolve 只有在pengding等待状态才能执行
            if (this.status === PENDING) {
                this.status = FULLFILLED;
                this.value = res;

                // 发布 resolve()在异步函数中时
                this.onFullFilledCbs.forEach(fn => fn());
            }
        }


        const reject = (err) => {
            // reject 只有在pengding等待状态才能执行
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = err;

                // 发布 reject() 在异步函数中时
                this.onRejectCbs.forEach(fn => fn());
            }
        }
        // 立即执行，传入的函数立即执行
        executor(resolve, reject);
    }
    // then方法，FULLFILLED
    // x 为普通值，直接返回一个成功态的promise
    then(onFullFilled, onReject) {
        // 判断是否有传值给 这两个回调函数，没有则给他们一个默认值
        onFullFilled = typeof onFullFilled === 'function' ? onFullFilled : value => value;
        onReject = typeof onReject === 'function' ? onReject : reason => { throw reason };
        
        let promise2 = new MyPromise((resolve, reject) => {

            // 成功态，执行onFullFilled
            if (this.status === FULLFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFullFilled(this.value);
                        // 判断onFullFilled 返回值到底是一个新的Promise 还是一个普通值，还是抛出一个error
                        // 要获取 promise2 ，但是promise2还没构建好，所以要用宏任务包裹起来 settimeout
                        promiseResolve(promise2, x, resolve, reject);
                    } catch (error) {
                        console.log(error);
                        reject(error)
                    }
                }, 0);
            }
            // 失败态，执行onReject
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onReject(this.reason);
                        promiseResolve(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0);
            }
            // 等待态，为什么要处理pending，因为有可能executor中含有异步函数
            /**
             *      setTimeout(() => {
                        resolve(1) 
                    }, 3000);
                    这种情况resolve(1) 会最后执行，而promise.then()会先执行，
                    等到3000ms后执行resolve()，处于pending状态的promise.then()已经执行完成了
                    他没有进行任何操作，最后执行resolve()时也没有用了，
                    因为这时已经没有then()来接受成功状态的结果了
                    所以要处理pending状态，
                    将所有onFullFilled，onReject收集起来，等到最后执行异步函数中的resolve在发不出去
             */
            if (this.status === PENDING) {
                // 订阅
                this.onFullFilledCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFullFilled(this.value);
                            promiseResolve(promise2, x, resolve, reject);
                        } catch (error) {
                            console.log(error);
                            reject(error)
                        }
                    }, 0);
                })
                this.onRejectCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onReject(this.reason);
                            promiseResolve(promise2, x, resolve, reject);
                        } catch (error) {
                            console.log(error);
                            reject(error)
                        }
                    }, 0);
                });
            }
        })


        return promise2;// then要返回一个新的Promise才能实现链式调用
    }
}

var promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("异步任务")
    }, 10);
})

let promise2 = promise.then((res) => {
    console.log("success1:" + res);
    return new MyPromise((resolve, reject) => {
        resolve(new MyPromise((resolve, reject) => {
            resolve(new MyPromise((resolve, reject) => {
                resolve("nimasile");
            }));
        }));
    })
    // return ' asdasd'
    // return Promise.resolve('Promise.resolve')
    // return new Error("err")
}, (err) => {
    console.log("fail" + err);
})
// 二次 then
promise2.then().then().then().then((res) => {
    console.log(res);
})
// promise.then((res) => {
//     console.log("success2:" + res);
// }, (err) => {
//     console.log("fail" + err);
// })
// promise.then((res) => {
//     console.log("success3:" + res);
// }, (err) => {
//     console.log("fail" + err);
// })

