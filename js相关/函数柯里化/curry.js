// 函数柯里化是指，将使用多个参数的函数转换为只用一个参数的函数


function curry(fn, args) {
    // 获取函数需要的参数长度
    let length = fn.length;
    args = args || [];

    return function () {
        // arguments 是fn执行时传给fn的实参
        let subArgs = args.slice(0);// 这一步的目的是不要让args指向同一个数组，不然的话args会一直保存，
        // 拼接得到现有的所有参数
        for (let i = 0; i < arguments.length; i++) {
            subArgs.push(arguments[i]);
        }
        console.log(subArgs);
        // 判断参数的长度是否已经满足函数所需参数的长度
        if (subArgs.length >= length) {
            // 如果满足，执行函数
            return fn.apply(this, subArgs);
        } else {
            // 如果不满足，递归返回科里化的函数，等待参数的传入
            return curry(fn, subArgs);
        }
    };
}
// sum(1,2,3) -> fn(1)(2)(3)



function sum(a, b, c) {
    console.log(a + b + c);
}

// fn 接受一个新的返回函数，还没有执行
const fn = curry(sum);

fn(1, 2, 3); // 6
fn(1, 2)(3); // 6
fn(1)(2, 3); // 6
fn(1)(2)(3); // 6








