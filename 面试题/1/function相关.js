function Foo() {
  getName = function () {
    console.log(1);
  };
  // 默认值，不要理会，会干扰判断
  return this;
}

Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
// function getName() 5 函数声明会在预编译时跑到代码顶端
// 而函数表达式则在代码下方 var getName = function () 4
// 函数表达式的值覆盖了 函数声明 所以打印 4
console.log(myNew(Foo));
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // = (new Foo()).getName() 3
new new Foo().getName(); // 3

/**
 * 2
 */
function Foo1() {
  Foo1.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo1.prototype.a = function () {
  console.log(3);
};
Foo1.a = function () {
  console.log(4);
};

Foo1.a(); // 4
let obj = new Foo1(); // this -> obj, obj.a = console.log(2);
obj.a(); // 2
Foo1.a(); // 1

/**
 * 3
 */
var a = 0;
function aaa() {
  var a = 111;
  return function () {
    console.log(a++);
  };
}

var fa = aaa();
fb = aaa();

fa(); // 111
fa(); // 112
fb(); // 111

var obj1 = {
  a: 1,
  b: 2,
  c: 3,
};

console.log(Object.keys(obj1));
Object.create();
