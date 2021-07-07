// contact 拼接两个数组
let arr1 = [1, 2, 3]
let arr2 = [4, 5]
console.log(new Array().concat(arr1, arr2));// [1, 2, 3, 4, 5]

// some 查询数组中是否有符合条件的1个元素
/**
 *  some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
    some() 方法会依次执行数组的每个元素：
    如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
    如果没有满足条件的元素，则返回false。
    注意： some() 不会对空数组进行检测。
    注意： some() 不会改变原始数组。
 */
let arrSome = [88, 99, 1, 23]
let flag = arrSome.some((item) => {
    return item % 2 == 0;
})
console.log(flag);// true
// every 查询数组中的所有元素是否有符合条件的
/**
 *  every() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
    every() 方法会依次执行数组的每个元素：
    全部元素满足条件，则表达式返回true ,。
    如果有1个不满足条件的元素，则返回false。
    注意： every() 不会对空数组进行检测。
    注意： every() 不会改变原始数组。
 */
let arrEvery = [88, 99, 1, 23]
let Everyflag = arrEvery.every((item) => {
    return item % 2 == 0;
})
console.log(Everyflag);// false

//map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
let res = [{ id: 1, name: 'fhw', sex: 1 }, { id: 2, name: 'hhh', sex: 1 }, { id: 3, name: 'aaa', sex: 2 }]
let resed = res.map((item) => {
    return {
        id: item.id,
        sex: item.sex === 1 ? '男' : '女',
        name: item.name
    }
})
/**
 *  [{…}, {…}, {…}]
    0: {id: 1, sex: "男", name: "fhw"}
    1: {id: 2, sex: "男", name: "hhh"}
    2: {id: 3, sex: "女", name: "aaa"}
 */
console.log(resed);

//Array.flat() 数组扁平化：将[1, [2, 3, [4, 5]]]变为[1, 2, 3, 4, 5]
/**
 * @params nums 表示要拉平的层数，
 *         nums=1表示只去掉1层嵌套括号
 *         nums=2表示只去掉2层嵌套括号
 *         nums=Infinity 不管有多少层嵌套，都要转成一维数组
 * Array.flat(nums) 
 * 返回一个新数组，对原数组无影响
 */
let nums = [1, 2, [3, 4], [5, [6, 7]]];
console.log(nums.flat(1)); // [1, 2, 3, 4 , 5, [6, 7]]
console.log(nums.flat(2));// [1, 2, 3, 4, 5, 6, 7] 
console.log(nums.flat(Infinity));// [1, 2, 3, 4, 5, 6, 7] 

// Array.from() 用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。
let objArr = Array.from("asdas");
console.log(objArr); // ["a", "s", "d", "a", "s"]
let objArr1 = Array.from(new Set([1,2,3]));
console.log(objArr1);