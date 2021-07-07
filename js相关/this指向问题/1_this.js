/**
 * 1. this -> js的关键字
 * 当前环境下 上下文对象的一个属性
 * 在不同环境下，表现是不同的 node 啊 浏览器下啊 this的含义表现都不同
 * 

    定时器调用函数，this指向window

    被当做了事件处理函数，this指向触发事件的dom元素

    用new调用函数，this指向函数体内秘密创建的空白对象
 * 
 */
// 全局作用域下的 this -> 全局对象 this === window
// self frames this 都可以获取到全局对象
console.log(self === window);// true
console.log(frames === window);// true


/**
 * this 指向的基本原则: 谁调用this的宿主,this就指向谁
 */
// 对象方法内部的this指向最近的引用
var obj = {
    a: 12,
    b: 34,
    test2: function () {
        // this -> obj
        console.log(this.a);
    },
    c: {
        a: 11,
        test3: function () {
            // this ->obj.c
            console.log(this.a);
            /**
             * 对function t()来说 它并不属于任何对象；不是obj 或者obj.c的成员
             * 它是一个孤立的存在 所以他的最近的引用是window
             */
            function t(){
                // this -> window
                console.log(this);
            }
            t();
        }
    }
}
obj.test2();
obj.c.test3();

