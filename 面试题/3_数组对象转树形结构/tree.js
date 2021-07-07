/**
 * 
 * 将一个扁平的数组，根据 parentID->id 的关系转化为树形结构
 * 0{
 *      {
            id: 1,
            parentID: 0,
            name: 'fhw',
            price: 99,
            children:[{
                id: 4,
                parentID: 1,
                name: 'asd',
                price: 11,
                children:[{
                    id: 6,
                    parentID: 4,
                    name: 'hao',
                    price: 995
                }]
            },{
                id: 7,
                parentID: 1,
                name: 'fzg',
                price: 997
            }]
        },{
            id: 2,
            parentID: 0,
            name: 'hhh',
            price: 929,
            children:[{
                id: 3,
                parentID: 2,
                name: 'hkj',
                price: 33,
                children:[{
                    id: 5,
                    parentID: 3,
                    name: 'jun',
                    price: 991
                }]
            }]
        },
 * 
 * }
 */
var data = [{
    id: 1,
    parentID: 0,
    name: 'fhw',
    price: 99
}, {
    id: 2,
    parentID: 0,
    name: 'hhh',
    price: 929
}, {
    id: 3,
    parentID: 2,
    name: 'hkj',
    price: 33
}, {
    id: 4,
    parentID: 1,
    name: 'asd',
    price: 11
}, {
    id: 5,
    parentID: 3,
    name: 'jun',
    price: 991
}, {
    id: 6,
    parentID: 4,
    name: 'hao',
    price: 995
}, {
    id: 7,
    parentID: 1,
    name: 'fzg',
    price: 997
}]

var treeData = formatTreeData(data);
console.log(JSON.stringify(treeData));
function formatTreeData(data) {
    // 将data分为两部分，pid=0的一部分为第一层，和pid!==0的部分
    let root = data.filter((item) => {
        return item.parentID === 0;
    })
    let son = data.filter((item) => {
        return item.parentID !== 0;
    })
    return deepFormat(root, son);
}

function deepFormat(father, son) {

    let NextFather = father.map((fatherItem) => {
        // 将son分为两部分，pid=当前父节点的一部分，和pid!==当前父节点的部分
        let Children = son.filter(SonItem => {
            return SonItem.parentID === fatherItem.id
        });
        let nonChildren = son.filter(SonItem => {
            return SonItem.parentID !== fatherItem.id
        });
        // 深入递归将所有的 节点都分割为两部分，直到不能分割
        deepFormat(Children, nonChildren);
        // 将对应的子节点数组赋值给父亲节点
        if (Children.length > 0) {
            fatherItem.chlidren = Children;
        }
        // 返回处理好的父亲节点数据
        return fatherItem;
    })

    return NextFather;
}

let list = [{ id: 1, name: '部门 A', parentID: 0 }, { id: 2, name: '部门 B', parentID: 0 }, { id: 3, name: '部门 C', parentID: 1 }, { id: 4, name: '部门 D', parentID: 1 }, { id: 5, name: '部门 E', parentID: 2 }, { id: 6, name: '部门 F', parentID: 3 }, { id: 7, name: '部门 G', parentID: 2 }, { id: 8, name: '部门 H', parentID: 4 }];
const result = formatTreeData(list);
console.log(result);
console.log(JSON.stringify(result));

console.log(4%3);