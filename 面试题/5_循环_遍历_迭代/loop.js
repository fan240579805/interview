// 循环：语言层面上的语法 -> 重复执行一段程序的方案
// 遍历：业务层面上的做法 -> 观察或获取集合中的元素的方法
// 迭代：实现层面上的概念 -> 实现遍历的底层方案就是迭代

var set = new Set([1, 2, 2, 3, 4, 5, 5, 6]);
for (const iterator of set) {
    console.log(iterator);
}

let arr = [1,2,3,4,5,6] 

let result = arr.splice(0)
console.log(arr) // [1, "x", "y", "z", 5, 6]
console.log(result) // [2, 3, 4]


let map = new Map();
map.set(0,3);
map.set(1,2);
map.set(2,4);
map.set(3,1);
for (const iterator of map) {
    console.log(iterator[1]);
}