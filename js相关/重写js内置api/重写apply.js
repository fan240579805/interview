/**
 * 思路和call相同
 * @param {} ctx 
 * @returns 
 */
Function.prototype.myApply = function (ctx) {
    ctx = ctx ? Object(ctx) : window;
    ctx.originFn = this;

    // 原生apply只取到第二个参数，也就是arguments[1]
    let args = arguments[1];
    let as = [];
    for (let i = 0; i < args.length; i++) {
        as.push("args[" + i + "]");// ***
    }
    // ctx.originFn(args[0],args[1],args[2])
    console.log('ctx.originFn(' + as + ')');
    // context.fn(...args);直接扩展运算符也可以，就不用字符串处理这么麻烦
    var ret = eval('ctx.originFn(' + as + ')')
    delete ctx.originFn;
    return ret;
}

var objT = {
    t: 1,
    a: 222
}
function tt() {
    console.log(this);
    console.log(arguments);
    return 'MYapply'
}

var r = tt.myApply(objT, [{
    t: 1,
    a: 222
}, "1", "2"])
console.log(r);