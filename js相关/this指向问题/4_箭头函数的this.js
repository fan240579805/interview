/**
 * 4.箭头函数的this指向 = 外层的第一个非箭头函数的this指向
 */
var obj1 = {
    ttt: function () {
        // t2 为普通函数的话 t3 this -> window
        // t2 为箭头函数的话 t3 this 找到的是ttt这个非箭头函数 gu this -> obj
        var t2 = function () {
            console.log(this);// this-> window
            var t3 = () => {
                console.log(this);// this -> window
            }
            t3();// t3 是箭头函数 箭头函数的this指向 = 外层的第一个非箭头函数的this指向
        }
        t2();// 因为 t2是window调用的所以他的this指向window
        console.log(this);
    }
}
obj1.ttt();

