let arr = [{
    id: 1,
    name: 'fhw'
}, {
    id: 2,
    name: 'hkj'
}, {
    id: 3,
    name: 'jack'
}, {
    id: 4,
    name: 'yyy'
}, {
    id: 5,
    name: 'xxx'
},]
var obj = {
    name: 'objName'
}
// forEach的第二个参数是将回调函数的this改成->obj
arr.forEach(function (item, index, ary) {
    console.log(this.name);
    console.log(item, index, ary);
}, obj)

// 1. 重写forEach
Array.prototype.myForEach = function (cb) {
    // 谁调用指向谁
    var _arr = this;
    var _len = _arr.length;
    // 如果有传第二个参数给myForEach就赋值给_arg2,否则则赋window
    var _arg2 = arguments[1] || window;
    for (let index = 0; index < _len; index++) {
        // 将回调函数cb的this指针改成_arg2,并将参数层递出去
        cb.apply(_arg2, [_arr[index], index, _arr]);
    }

}
console.log("----------------------------");
arr.myForEach(function (item, index, ary) {
    console.log(this.name);
    console.log(item, index, ary);
}, obj)

/**
 * 2. 重写map()
 */
function ES6deepClone(origin) {
    // 如果要拷贝得源不存在或者 不是一个对象/数组这类引用值 直接返回不用深拷贝
    if (origin == undefined || typeof origin !== 'object') {
        return origin;
    }
    let target = new origin.constructor();
    for (let k in origin) {
        if (origin.hasOwnProperty(k)) {
            // 有可能value origin[k]还是一个数组/对象
            // 所以递归进行深拷贝
            target[k] = ES6deepClone(origin[k]);
        }
    }
    return target;
}
Array.prototype.myMap = function (cb) {
    // 谁调用指向谁
    var _arr = this;
    var _len = _arr.length;
    // 如果有传第二个参数给myForEach就赋值给_arg2,否则则赋window
    var _arg2 = arguments[1] || window;
    var _newArr = []
    // 回调函数执行结果的返回值可能是引用类型 要深拷贝
    var _item;
    // 对返回值判空
    var _res;
    for (let i = 0; i < _len; i++) {
        _item = ES6deepClone(_arr[i]);
        _res = cb.apply(_arg2, [_item, i, _arr]);

        // map 返回新数组，所以需要将回调函数执行结果的返回值push到新数组
        if (_res) {
            // 存在返回值才推入
            _newArr.push(_res);
        }
    }
    return _newArr
}

let newArr = arr.myMap(function (item, index, ary) {
    console.log(this.name);
    item.id += 100;
    return item;
}, obj)
console.log(newArr);


/**
 * 3.重写 some()
 */

Array.prototype.mySome = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;

    var _res = false;
    for (let i = 0; i < _len; i++) {
        _res = cb.apply(_arg2, [_arr[i], i, _arr]);;
        if (_res) {
            return _res;
        }
    }
    return _res;
}
let flag = arr.mySome(function (item, index, ary) {
    console.log(this);
    return item.id >= 3;
}, obj)
console.log(flag);

/**
 * 4. 重写filter()
 */
Array.prototype.myFilter = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window
    var _newArr = [];
    for (let i = 0; i < _len; i++) {
        // 满足过滤条件
        if (cb.apply(_arg2, [_arr[i], i, _arr])) {
            // 将满足条件的item深拷贝并推入新数组
            var _rightItem = ES6deepClone(_arr[i]);
            _newArr.push(_rightItem)
        };
    }
    return _newArr;
}

var newFilter = arr.filter(function (item, index, ary) {
    console.log(this.name);
    return item.id >= 3;
}, obj);
console.log(newFilter);


/**
 * 5. 重写reduce()
 * prev 是一个容器 ，initValue是容器的初始值
 */
Array.prototype.myReduce = function (cb, initValue) {
    var _arr = this;
    var _len = _arr.length;
    var _arg3 = arguments[2] || window
    var _item;
    initValue = initValue || 0;
    for (let i = 0; i < _len; i++) {
        _item = ES6deepClone(_arr[i]);
        // 新的值 = 旧的值经过回调函数运算
        initValue = cb.apply(_arg3, [initValue, _item, i, _arr]);
    }
    return initValue;
}
let initValue = []
let ans = arr.myReduce(function (prev, item) {
    item.id >= 3 && prev.push(item);
    return prev;
}, initValue)
console.log(ans);