Function.prototype.myCall = function (ctx) {
    // ctx 上下文，就相当于传进来的obj 目的是将调用myCall()的函数this->ctx

    // 如果有传参数ctx则直接转换为Object类型赋值，没有传则赋值给window
    ctx = ctx ? Object(ctx) : window;

    // 当前myCall的this->调用myCall的test this->test
    console.log(this);
    /**
     * 思路：我们需要将 this->test 改成 this -> ctx
     * 谁调用this就指向谁的原则
     * 那么就需要ctx.test() => test.this -> ctx 
     *                     => myCall.this -> test.this -> ctx
     */
    // 所以此时,领ctx.originFn == this == test
    ctx.originFn = this;
    // 想办法把实参传给 ctx.originFn执行，ctx.originFn()执行就相当于test()执行
    // i为什么从1开始，因为arguments[0] = ctx，所以1之后才是真正要传递的参数
    var args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');// ["arguments[1]", "arguments[2]"]
    }
    // eval()可以将字符串转化为方法执行
    // 为什么要这么麻烦的把转化为字符串再执行？
    // 因为arguments[]实参列表
    // 很难以这种形式ctx.originFn(arguments[1],arguments[2])传进函数中执行
    // args数组遇到字符串拼接就会=> ctx.originFn(arguments[1],arguments[2])
    // 实现实参传递 myCall -> ctx.originFn -> test, res接收test()的返回值
    var res =  eval('ctx.originFn('+args+')');
    //执行完成，删掉ctx中的originFn属性，以免污染对象成员
    delete ctx.originFn;
    // 将返回值返回出去
    return res;
}

var obj = {
    a:1,b:2
}
function test() {
    console.log(this);
    console.log(arguments);

    return 'Over';
}

var ret = test.myCall(obj,333,444);

console.log(ret);


