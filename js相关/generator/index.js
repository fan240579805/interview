function* gen(x) {
    var a = 1;
    while (true) {
        yield ++x;
    }
    return;
}
var g = gen(2);
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());

async function ajxa() {
    await func2();
    console.log("async");
}

async function func2() {
    console.log("func2");
}

console.log(ajxa());