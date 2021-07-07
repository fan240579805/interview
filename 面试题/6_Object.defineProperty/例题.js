/**
 * 1.
 * console.log(_+_+_+_+_);
 * 完成上面打印出 a+b+c+d+e, 字母递增替换占位符操作
 * 思路：通过Object.defineProperty和ASCII码
 */

Object.defineProperty(window, '_', {
    get() {
        // 访问_进行ASCII 递增 this->window
        if (!this.code) {
            // this.code不存在，说明访问第1个占位符，给this。code赋值为'a'的ASCII码
            this.code = 'a'.charCodeAt(0);
        } else {
            // 存在 ASCII码递增
            ++this.code;
        }
        if (this.code >= 'a'.charCodeAt(0) + 26) {
            // 超过26个占位符，直接返回
            return;
        }
        return String.fromCharCode(this.code);
    }
})
console.log(_ + _ + _ + _ + _ + _);//abcdef

/**
 * 2. 不改变如下代码中的obj 是打印obj = {a:3,b:3,c:5}
    var obj = {
        a: 1,
        b: 2,
        c: 3
    }
    for (const k in obj) {
        ++obj[k];
    }
    console.log(obj);
 *  思路 Object.defineProperty
 * 
 */
var _obj = {
    a: 1,
    b: 2,
    c: 3
}
// 因为Object.defineProperty会改变原来的对象，所以我们新建一个_obj
var obj = {}
for (const k in _obj) {
    // 给新的obj对象设置 描述
    Object.defineProperty(obj, k, {
        writable: true, // 可写入描述，默认false
        enumerable: true,// 可枚举描述，默认false
        value: k === 'b' ? _obj[k] : ++_obj[k] // 当k=b 时，不++
    })
}
for (let k in obj) {
    obj[k] += 1
}
console.log(obj);

let n = 0 ^ 1 ^ 2 ^ 3;
let n1 = 0 ^ 0 ^ 0 ^ 0 ^ 6;
console.log(n1);