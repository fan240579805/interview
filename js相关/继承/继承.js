
//父类
function SuperType(name) {
    //父类实例属性
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
//父类原型方法
SuperType.prototype.sayName = function () {
    alert(this.name);
};
//子类
/**
 * 1. 原型链继承
 * 直接 SubType.prototype = new SuperType();
 * 这样可以继承但是会导致所有继承SuperType的子类共享引用类型，造成数据污染
 */

/**
 * 2. 借用构造函数
 */
function SubType(name, age) {
    SuperType.call(this, name);//借用构造函数：继承父类的实例属性；继承不到原型方法
    this.age = age;
}
var sub1 = new SubType('fff', 123);
sub1.colors[1] = "nms";
console.log(sub1);
var fa1 = new SuperType('fa');
console.log(fa1);

/**
 * 3. 组合式继承，借用 构造函数+原型链 , 这样就可以把父类的原型上的属性也继承
 *    会导致执行两次父类构造函数SuperType，所以最外层和原型上都有name属性
    * function SubType(name, age) {
        SuperType.call(this, name);// 用构造函数：继承父类的实例属性；继承不到原型方法
        this.age = age;
      }
      SubType.prototype = new SuperType();// 用实例
      SubType.prototype.constructor = SubType;
 */

 /**
  * 4. 原型式继承,o是父类，这里的object(o)和Object.create(o)行为相同
  * function object(o){
  *    ‘
  * }
  * 5. 寄生继承
  * 与原型式继承相比多了一层封装
  * function jisheng(origin){
  *     var newObj = object(origin);
  *     newObj.sayHi = function(){ console.log("HI")}
  *     return newObj
  * }
  * 
  **/     

 /**
     * 6. 寄生组合式继承：将父类原型的副本强制赋值给子类原型，实现继承父类的原型方法。
       构造函数 + 寄生
  */
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
    alert(this.age);
};

function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); //创建父类原型的副本（寄生）
    prototype.constructor = subType; //将该副本的constructor属性指向子类
    subType.prototype = prototype; //将子类的原型属性指向副本
}
inheritPrototype(SubType, SuperType);
var sub = new SubType('fff', 123);
sub.colors[1] = "nms";
console.log(sub);
console.log(sub.name);

