let target = {
    name: "fhw",
    age: 123
};

let proxy = new Proxy(target, {
    get(obj, props) {
        console.log("获取");
        return obj[props] + "asd";
    },
    set(obj, prop, value) {
        if (value < 100) {
            throw new RangeError("太小了")
        } else {
            return Reflect.set(obj, prop, 33 * value);
        }
    }
})

proxy.a = 100;
console.log(target);
console.log(proxy.a);


let arr = [1]
arr = new Proxy(arr, {
    get(obj, prop) {
        // 代理数组时，这个prop不只是index 还可以是arr.xxx，此时 prop == xxx
        console.log("prop: " + prop);
        return obj[prop] + 1;
    },
    set(obj, prop, value) {
        Reflect.set(obj, prop, value + 13);
    }
})
console.log(arr[0]);
arr[0] = 14;
// arrProxy.push(1)
console.log(arr.asd);