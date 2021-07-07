Function.prototype.myBind = function (ctx) {

    ctx = ctx ? Object(ctx) : window;
    var args = [];
    var fn = this;
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    return function () {
        fn.apply(ctx, args);
    }
}


var obj1 = {
    a: 123,
    b: 222,
    c: 'asd'
}

var test = function () {
    this.a = arguments[2];
    console.log(this);
    console.log(arguments);
}
test.myBind(obj1, 1, 2, 3, 4, 5, 6, 7)();

