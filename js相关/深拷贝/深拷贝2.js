/**
 * map -> 键名 任意类型->{},[]
 * WeakMap -> 键名 只能是对象 ->{}
 * {} -> 键名（属性） -> Symbol类型，字符串
 */

/**
 * es6 深拷贝
 */
const obj1 = {}
// 通过 new obj1继承而来的构造函数得到的newObj1也是深拷贝对象
// 所以不用像es5那样用 Object.prototype.toString 判断是[] 还是{}
// 直接 把要深拷贝的orgin.constructor 给实例化，orgin是数组则实例化出[]是对象则实例化{}
// 不会指向同一个{}
let newObj1 = new obj1.constructor();
newObj1.a = 1;
console.log(obj1); // {}
console.log(newObj1); // {a: 1}
// 同理数组[] 也是
const arr1 = []
let newArr1 = new arr1.constructor();
newArr1.push(1);
console.log(arr1); // []
console.log(newArr1); // [1]


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
var ES6DeepObj = {
    infos: { a: 1, b: 2, c: 3 },
    hobby: ['paint', 'singer'],
    name: 'fhw',
    lalal: {
        item: [1, 3, 5, 6, 78],
        deep: {
            hhh: 11,
            aaa: 22,
        },
    }
}
let newTobj = ES6deepClone(ES6DeepObj);
newTobj.lalal.item[0] =999;
console.log(ES6DeepObj); // item[0]= 1
console.log(newTobj); // item[0] = 999 深拷贝成功