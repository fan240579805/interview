// 浅拷贝：可以看到 改变的是 newObj.a 但是 obj也跟着变了
// 因为 newObj = obj 只是浅拷贝，他们指向同一个地址的对象，所以他们更改的也是同一个对象
// 数组[]和对象{ } 都是引用类型，var b = a 直接赋值都是浅拷贝
var obj = { a: 1, b: 2, c: 3 };
var newObj = obj;
newObj.a = 333;
console.log(obj); // {a: 333, b: 2, c: 3}
console.log(newObj);// {a: 333, b: 2, c: 3}
var arr = [1, 3, 4]
// 同样两个都变了
var newArr = arr;
newArr[1] = 2;
console.log(arr);// [1, 2, 4]
console.log(newArr);// [1, 2, 4]
/**
 * 什么是深拷贝
 * 就是完全的将一个数组/对象 拷贝给另一个变量newObj，a改动不会影响到旧对象/数组    
 */

// es5 深拷贝写法 ;// typeof [] === object 数组其实也是对象{ }
/**
 * 
 * @param {*} origin 传进来的将要被深拷贝的对象/数组
 * @param {*} target 传进来的目标
 */
// 判断到底是[]还是{}
console.log(Object.prototype.toString.call([]));// [object Array]
console.log(Object.prototype.toString.call({}));// [object Object]

var deepClone = function (origin, target) {
    // 如果没有传进目标，赋值给他一个空对象
    var tar = target || {};
    var toStr = Object.prototype.toString;
    for (const k in origin) {
        // 判断k这个键是在源的自己的层下，而不是在原型链上
        if (origin.hasOwnProperty(k)) {
            // 如果k键对应得value 是对象或者数组
            // typeof { } typeof [] 都等于 object，所以可以这么判断
            if (typeof origin[k] === 'object' && origin[k] !== null) {
                // 如何知道value：origin[k]到底是数组[]还是{}呢
                // 需要用到 Object上的原型方法toString 来判断
                // 判断出是[]还是{} 再赋值给目标对象tar
                tar[k] = toStr.call(origin[k]) === '[object Array]' ? [] : {};
                // 它本身也是个对象，对他自己进行递归深拷贝
                deepClone(origin[k], tar[k]);
            } else {
                // 如果k键对应得value 不是对象也不是数组这类引用类型，直接等于tar[k]
                tar[k] = origin[k];
            }
        }
    }
    return tar;
}
var testDeepClone = {
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

// 对 testDeepClone 进行深拷贝得到newnew
const newnew = deepClone(testDeepClone, {});
// const newnew = newDeep(testDeepClone);
// 更改newnew得其中属性
newnew.lalal.deep.hhh = 333;
// lalal {deep: {hhh: 11, aaa: 22}}
console.log(testDeepClone);
// lalal {deep: {hhh: 333, aaa: 22}}
console.log(newnew);

