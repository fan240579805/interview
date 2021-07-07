/**
 * 如果一个对象obj没有被引用
 * 如：  let user = {name:"jack" }
 *       let user = null;
 *       此时已经没有任何变量指向{name:"jack" }这个对象就会变成不可达状态
 *       他就会被js垃圾回收机制回收并释放内存。
 */