/**
 * 数据 <-> 视图 数据改变 试图也跟着改变，视图改变，数据也跟着改变
 * 仿vue v-model
 */

// 1.数据转换成响应式的 Object.defineProperty Proxy
// 2.input -> 事件处理函数绑定-> 改变数据
// 3.数据绑定dom视图
class MVVM {
    constructor(el, data) {
        this.el = document.querySelector(el);
        this._data = data;
        this.domPool = {};
        this.init();
    }

    init() {
        this.initData();
        this.initDom();
    }
    // 1。数据劫持，改成响应式
    initData() {
        let _this = this;
        this.data = {};// data用于响应式数据，修改data，_data也会改变
        // 循环所有data里的属性
        for (let key in this._data) {
            // this指向改变了，需要用外部的this
            Object.defineProperty(this.data, key, {
                get() {
                    console.log("获取数据");
                    // 获取数据
                    return _this._data[key];
                },
                set(newVal) {
                    // 响应式修改对象_this._data
                    _this._data[key] = newVal;
                    // 根据domPool更改替换花括号的内容
                    _this.domPool[key].innerHTML = newVal;
                }
            });
        }
    }
    initDom() {
        this.BindDom(this.el);
        this.BindInput(this.el);
    }
    // 2.绑定输入事件，输入时改变data
    BindInput(el) {
        // 获取所有input框
        const inputs = el.querySelectorAll('input');
        var _this = this;
        // 给每个input绑定事件
        inputs.forEach((inputItem) => {
            // 获取含有“v-model”属性的input元素的值
            let key = inputItem.getAttribute('v-model');
            inputItem.addEventListener('keyup', (e) => {
                _this.data[key] = e.target.value;
            })
        })
    }
    // 3. 数据和dom绑定在一起 ,把双括号区域替换成输入的值
    /**
     * 通过递归查找子标签，建立dom池,双括号中的key对应一个dom
     * {
     *      'name':span
     * }
     */
    BindDom(el) {
        const childNodes = el.childNodes;
        // 遍历app的所有子节点
        childNodes.forEach((nodeItem) => {
            // 代表是文本标签
            if (nodeItem.nodeType === 3) {
                //获取文本类型节点的值
                const _value = nodeItem.nodeValue;
                if (_value.trim().length > 0) {
                    // 正则匹配双括号,找到双括号所在的子节点
                    let _isVaild = /\{\{(.+?)\}\}/.test(_value);
                    if (_isVaild) {
                        // 正则匹配掉双括号得到key
                        const _key = _value.match(/\{\{(.+?)\}\}/)[1].trim();
                        // 赋值给domPool
                        this.domPool[_key] = nodeItem.parentNode;
                        // 有初始值时赋值初始值，没有时赋值undefined
                        nodeItem.parentNode.innerText = this.data[_key] || undefined;
                    }
                }
            }
            // 如果app的子节点还有子节点的话，递归查找一直查找到底，直到没有子节点为止
            nodeItem && this.BindDom(nodeItem);
        })
    }
}