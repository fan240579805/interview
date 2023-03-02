var a1 = 111;
let a2 = 222;
function t() {
  /**
   * 全局 var 定义的变量a1会挂载到 window 上
   * let定义的a2则不会
   */
  var a1 = 333;
  console.log(a1); // 333
  console.log(this.a1); // 111
  console.log(this.a2); // undifined
}

t();

// 输出 10 个 11;
for (var index = 1; index <= 10; index++) {
  setTimeout(() => {
    console.log(index);
  }, 1);
}

// for (var index = 1; index <= 10; index++) {
//   (function (index) {
//     setTimeout(() => {
//       console.log(index);
//     }, 1);
//   })(index);
// }
// 输出 0 1 2 3 4 5 6 7 8 9 10
// for (let index = 1; index <= 10; index++) {
//     setTimeout(() => {
//         console.log(index);
//     }, 1000 * index);
// }

function a() {
  var s = 0;
  return function () {
    return ++s;
  };
}

var test1 = a();
console.log("自增" + test1());

// var a = []; {
//     //我是父作用域
//     let i = 0;
//     if (i < 3) {
//         //这一步模拟底层实现
//         let k = i;
//         a[k] = function () {
//             //我是子作用域
//             console.log(k);
//         };
//     };
//     i++; //为1
//     if (i < 3) {
//         let k = i;
//         a[k] = function () {
//             console.log(k);
//         };
//     };
//     i++; //为2
//     if (i < 3) {
//         let k = i;
//         a[k] = function () {
//             console.log(k);
//         };
//     };
//     i++; //为3
//     // 跳出循环
// }
// a[0](); //0
// a[1](); //1
// a[2](); //2
