/**
 * 当内部函数被返回到外部并进行保存时，一定会产生闭包
 * 闭包会使原来产生的[[scope]]作用域链不释放，
 * 因此过度使用闭包可能会导致内存泄漏
 */

function test1() {
    function test2() {
        console.log(a);
    }
    let a = 1;
    // a执行结束 将test2返回出去,按理来说test1.AO应该被释放掉，
    // 但由于test2.[[scope]]仍然还有test1.AO，此时返回的 test1.AO -> GO
    // 所以外部test3 = test1() = test2,在外部仍然能访问test1的作用域
    return test2; // test2没有执行
}

var test3 = test1();
test3(); // 实际上执行test2() [[scope]] = test2.AO -> test1.AO-> GO

// test3执行结束后 test2.AO释放， test1.AO依旧存在 [[scope]] = test1.AO-> GO
test3();// 依旧能访问到 a

function ttt() {
    var n = 100;
    function add() {  
        n++;
        console.log(n);
    }

    function reduce() {
        n--;
        console.log(n);                        
    }
    // 返回数组形式的闭包
    return [add, reduce];
}
 
var arr = ttt();
// ttt.AO 始终存在
arr[0]();// 101
arr[1]();// 100
arr[1]();// 99
arr[1]();// 98
arr[1]();// 97