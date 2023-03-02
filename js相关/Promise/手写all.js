myall = function () {
    return new Promise((resolve, reject) => {
        let args = arguments[0];
        let ans =[]
        let rightCnt = 0;
        let curIndex = 0;
        for (const promiseItem of args) {
            curIndex++;
            // 包一层Promise.resolve来过滤参数不为promise的情况
            Promise.resolve(promiseItem).then((res) => {
                ans[rightCnt] = res;
                rightCnt++;
                if (rightCnt == args.length) {
                    resolve(ans)
                }
            }).catch((err) => {
                reject(err);
            })
        }
    })
}

const test1 = function () {
    return new Promise((resolve, reject) => {
        resolve('1成功')
    })
}
const test2 = function () {
    return new Promise((resolve, reject) => {
        reject('2失败')
        // resolve('2成功')
    })
}
const test3 = function () {
    return new Promise((resolve, reject) => {
        resolve('3成功')
    })
}
// 参数是一个可迭代对象[] , Set , Map，返回一个promise对象
myall([
    test1(), // 一个promise对象
    test2(), // 一个promise对象
    test3(), // 一个promise对象
    { a: 123 }
]).then((res) => {
    console.log(res);// ["1成功", "2成功", "3成功"]
}).catch((err) => {
    console.log(err);// ('2失败')
})