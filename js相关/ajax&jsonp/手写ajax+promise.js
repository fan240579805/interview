
// ajax + promise =>axios
const ajax = function (options) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var defaults = {
            type: '',
            url: '',
            data: {},
            success: function () { },
            error: function () { }
        }
        Object.assign(defaults, options);
        
        // 开启链接
        xhr.open(defaults.type, defaults.url);
        // 监听状态变化
        // xhr.onreadystatechange = function () {
        //     console.log(xhr.readyState);
        //     // xhr.readyState === 4代表服务器响应已经到达
        //     // xhr.status === 400 成功
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         console.log(xhr.responseText);
        //     }
        // }
        xhr.send();

        // 数据请求成功，自动执行onload方法
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText)
            if (xhr.status === 400) {
                resolve(res);// resolve出去
            } else {
                alert('error')
            }
        };
    })
}

var config = {
    type: 'post',
    url: 'http://localhost:9998/api/AJAX/123',
    data: {},
    success: function (res) {
        console.log(res);
    },
    error: function () {
    }
}
ajax(config).then(res => {
    console.log(res.msg + 123);
})





