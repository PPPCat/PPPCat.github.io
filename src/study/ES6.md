# ES6

## let

###### 变量声明

```javascript
let a;
let b,c,d;
let e = 100;
let f = 521, g = 'iiiii', h = [];
```

###### 1.变量不能重复声明

```javascript
let star = 'lzx';
let star = 'xz';//报错
```

###### 2.块级作用域

```javascript
{
    let girl = 'zyq';
}
console.log(girl);//报错
```

###### 3.不存在变量提升

```javascript
console.log(song);//报错
let song = 'ladr';
```

###### 4.不影响作用域链

```javascript
{
    let school = 'sgg';
    function fn(){
        console.log(school);//块内没有school，向上寻找
    }
    fn();
}
```



## const

常量声明

```javascript
const SCHOOL = 'sgg';
```

###### 1.必须赋初始值

```javascript
const a;//报错
```

###### 2.一般常量使用大写

```javascript 
const A = 100;
```

###### 3.常量的值不能修改

```javascript
SCHOOL = 'ATG'//报错
```

###### 4.块级作用域

```javascript
{
    const PLAYER = 'UZI';
}
console.log(PLAYER);//报错
```

###### 5.对于数组和对象的元素修改不算对常量的修改

```javascript
const TEAM = ['UZI','MLXG','Ming','letme'];
TEAM.push('Meiko');
```



## 变量解构赋值

###### 1.数组的解构

```javascript
cosnt F$ = ['x','l','z','s'];
let ['xiao','liu','zhao','song'] = F4;
console.log(xiao);//x
console.log(liu);//l
console.log(zhao);//z
console.log(song);//s
```

###### 2.对象的解构

```javascript
const zhao = {
    name:'zbs';
    age;'nuknow';
    xiaopin: function(){
        console.log('play xiaopin');
    }
}
let {name,age,xiaopin} = zhao;
console.log(name);//zbs
console.log(age);//unknow
xiaopin();//play xiaopin
```



## 模板字符串

###### 1.声明

```javascript
let str = `im string`;
console.log(str, typeof str);//im string string
```

###### 2.内容中可以直接出现换行符

```javascript
let str = '<ul><li>xt</li><li>ml</li><li>wx</li></ul>';//报错
let str1 = `<ul><li>xt</li><li>ml</li><li>wx</li></ul>`;
```

###### 3.变量拼接

```javascript
let lovest = 'fx';
let out = `${lovest} is best`;
console.log(out);//fx is best;
```



## 箭头函数

```javascript
let fn = (a,b) => {
    return a + b;
};
let result = fu(1,2);
console.log(result);//3
```

###### 1.this是静态的

this始终指向函数声明时所在作用域下的this的值

```javascript
function getName(){
    console.log(this.name);
}
let getName2 = () => {
    console.log(this.name);
}
window.name = 'sgg';
const school = {
    name:'ATG';
}
//直接调用,this指向window
getName();//sgg
getName2();//sgg
//call方法调用,call可以改变函数内部this的值
getName.call(school);//ATG
getName2.call(school);//sgg
```

###### 2.不能作为构造函数实例化对象

```javascript
let Person = (name,age) => {
    this.name = name;
    this.age = age;
}
let me = new Person('xiao',30);
console.log(me);//报错，Person不是一个构造器
```

###### 3.不能使用arguments变量

```javascript
let fn = () => {
    console.log(arguments);
}
fn(1,2,3);//报错，argument未定义
```

###### 4.箭头函数的简写

```javascript
//省略小括号，当形参有且只有一个
let add = n =>{
    return n + n;
}
console.log(add(9));//18
//省略花括号，当代码体只有一条语句时,同时必须省略return，此时语句结果就是返回值
let pow = n => n*n;
console.log(pow(9));
```

###### 实例

```html
<div id="ad"></div>
<sript>
    let ad = document.querySelectById('ad');
    ad.addEventLietener("click",function(){
        //保存this值 
        let _this = this;
        setTimeout(function{
            console.log(this);
            _this.style.background = 'pink';
        },2000)
    })
</sript>
//使用箭头函数
<script>
    let ad = document.querySelectById('ad');
    ad.addEventLietener("click",function(){
        setTimeout(() => {
            this.style.background = 'pink';//
        },2000)
    })
</script>
```

```html
<div id="ad"></div>
<script>
    let ad = document.querySelectById('ad');
    ad.addEventLietener("click",function(){
        const arr = [1,6,9,10,100,25];
        const result = arr.filter(function(item){
            if(item%2 === 0){
                return true;
            }else{
                return false;
            }
        })
        console.log(result);
    })
</script>
<script>
    let ad = document.querySelectById('ad');
    ad.addEventLietener("click",function(){
        const arr = [1,6,9,10,100,25];
        const result = arr.filter(item => item % 2 === 0);
        console.log(result);
    })
</script>
```

箭头函数适合与this无关的回调。定时器，数组的方法回调

箭头函数不适合与this有关的回调。事件回调，对象的方法



## 拓展运算符

拓展运算符能将数组转化为逗号分隔的参数序列

```javascript
const tf = ['yy','ww','wj'];
function cw(){
    console.log(arguments);
}
cw(...tf);//cw('yy','ww','wj');
```

###### 实例

1.数组的合并

```javascript
const kz = ['wtl','xy'];
const fh = ['zy','lh'];
const zxmzf = [...kz,...fh];
console.log(zxmzf);//[['wtl','xy','zy','lh'];
```

2.数组的克隆

```javascript
const szh = ['e','g','m'];
const syc = [...szh];//浅拷贝
console.log(syc)//['e','g','m']
```

3.将伪数组转为真数组

```html
<div></div>
<div></div>
<div></div>
<script>
    const divs = document.querySelectAll('div');
    cosnt divArr = [...divs]l
    console.log(divArr);//也可以转化arguments
</script>
```



## Promise

Promise时ES6引入异步编程的新解决方案，语法上Promise时构造还能输，用来封装异步操作并且可以获得其成功或者失败的结果

###### 实例化Promise对象

```javascript
const p = new Promise(function(resolve,reject){
    setTimeout(function(){
        let data = 'user data';
        resolve(data);
    },2000)
})
p.then(function(value){
    console.log(value);//user data
},function(reason){})
```

###### Promise封装读取文件

```javascript
//1.引入fs模块
const fs = require('fs');

//2.调用方法读取文件
fs.readFile('./resources/wx.md',(err,data)=>{
    //如果错误抛出异常
    if(err) throw err;
    //没错输出内容
    console.log(data,toString());
})

//3.使用Promise封装
const p = new Promise(function(resolve,reject){
    fs.readFile("./resources/wx.md",(err,data)=>{
        if(err) reject(err);
        resolve(data);
    });
});
p.then(function(value){
    console.log(value.toString());
},function(reason){
    console.log('read error');
})
```

###### Promise封装ajax

```javascript
const p = new Promise((resolve, reject) => {
        //1.创建对象
        const xhr = new XMLHttpRequest();
        //2.初始化
        xhr.open("GET", "https://api.apiopen.top/getJoke");
        //3.发送
        xhr.send();
        //4.绑定事件，处理响应结果
        xhr.onreadystatechange = function () {
          //判断
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(xhr.response);
            } else {
              reject(xhr.status);
            }
          }
        };
});
p.then(function(value){
    console.log(value);
},function(reason){
    console.log(reason);
})
```

###### Promise的then方法

```javascript
const p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('user data');
    },2000)
});
//then方法的返回结果是Promise对象，对象状态由回调函数的执行结果决定
//1.如果回调函数中返回的结果是非Promise类型的属性，状态为成功，返回值为对象的成功值，但是抛出错误时status只会是rejected
const result = p.then(value=>{
    console.log(value);
    return 'success';
},reason=>{
    console.log(reason);
})
console.log(result);//Promise对象，值为success
```

###### 链式调用

```javascript
p.then(value=>{},reason=>{}).then(value=>{})
```

###### 实例

```javascript

const fs = require('fs');
//回调地狱
fs.readFile('./resource/wx.md',(err,data1)=>{
    fs.readFile('./resources/cyg.md',(err,data1)=>{
        fs.readFile('./resources/gsyg.md',(err,data1)=>{
            const result = data1 + data2 = daata3;
            console.log(result);
        })
    })
})

//Promise实现
const p = new Promise((resolve,reject)=>{
    fs.readFile("./resources/wx.md",(err,data)=>{
        resolve(data);
    })
})
p.then(value=>{
    return new Promise((resolve,reject)=>{
        fs.readFile("./resources/cys.md",(err,data)=>{
            resolve([value,data]);
        })
    })
}).then(value=>[
     return new Promise((resolve,reject)=>{
        fs.readFile("./resources/gsyg.md",(err,data)=>{
            value.push(data);
            resolve(value);
        })
    })
]).then(value=>{
    console.log(value.join('\n'))
})
```

###### catch方法

```javascript
const p = new Promise((resolve,reject)=>{
    setTime(()=>{
        reject("error");
    },1000)
})
p.catch(reason=>[
    console.warn(reason);
])
```



## Set

ES6 提供了新的数据解构 Set（集合）。类似于数组，但成员的值是唯一的，集合实现了 iterator 接口，所以可以使用【拓展运算符】和【for...of】进行遍历

```javascript
let s = new Set();
let s2 = new Set(['b','x','h','h','x']);
console.log(s, typeof s);//Set(0) {} object
console,log(s2);//set(4) {'b','x','h','h','x'}//自动去重
```

###### 元素的个数

```javascript
console.log(s2.size);
```

###### 添加新的元素

```javascript
s2.add('a')
```

###### 删除元素

```javascript
s2.delete('h');
console.log(s2);//Set(3) {"d","x","a"}
```

###### 检测元素

```javascript
console.log(s2.has('z'));//false
console.log(s2);//Set(4) {'d','x','a','h'};
```

###### 清空元素

```javascript
s2.clear();
console.log(s2);//Set(0) {}
```

###### 遍历

```javascript
for(let v of s2){
  console.log(v);//d x a h
}
```

###### 实例

```javascript
let arr = [1,2,3,4,5,4,3,2,1];
```

1.数组去重

```javascript
let result = [...new Set(arr)];
console.log(resulet);//(5) [1,2,3,4,5];
```

2.交集

```javascript
let arr2 = [4,5,6,5,6];
let result = [...new Set(arr)].filter(item=> new Set(arr2).has(item));
console.log(result);//[4,5]
```

3.并集

```javascript
let union = [...new Set([...arr,...arr2])];
consolo.log(union)//[1,2,3,4,5,6]
```

4.差集

```javascript
let diff = [...new Set(arr)].filter(item=> !(new Set(arr2).has(item)));
console.log(diff);//[1,2,3]
```



## Map

ES6提供了Map数据结构，类似于对象，也是键值对的集合。但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当做键。Map也实现了iterator接口，可以使用【拓展运算符】和【for...of】进行遍历

```javascript
let m = new Map();
```

###### 添加元素

```javascript
m.set('name','sgg');
m.set('change',function(){
    console.log('we change');
})
let key = {
    school : 'ATGUIG';
}
m.set(key,['sh','bj','sz']);
```

###### size

```javascript
console.log(m.size)//3
```

###### 删除

```javascript
m.delete('name');
console.log(m);//Map(2) {...}
```

###### 获取

```javascript
console.log(m.get('change'));//f(){console.log('we change')};
console.log(m.get(key));//["bj","sh","sz"]
```

######  清空

```javascript
m.clear();
```

###### 遍历

```javascript
for(let v of m){
    console.log(v);//["name","sgg"] ["change",f] [{...},Array(3)]
}
```

###### 

## class

ES6提供了贴近传统语言的写法，引入了class（类）概念，作为对象的模板。通过class关键字，可以定义类。基本上ES6的类可以视为语法糖，它的绝大部分功能ES5都可以做到，新的class写法只是让对象原型更加清晰、更像面向对象编程的语法而已。

ES5

```javascript
function Phone(brand,price){
    this.brand = brand;
    this.price = price;
}
Phone.prototype.call = function(){
    console.log("i can call");
}
let huawei = new Phone('huawei',5999);
huawei.call();//i can call
console.log(huawei);//Phone{brand:"huawei",price:5999}
```

ES6

```javascript
class Phone{
    //构造方法，名字不能修改
    constructor(brand,price){
        this.brand = brand;
        this.price = price;
    }
    //方法必须使用该语法，不能使用ES5的对象完整形式
    call(){
        console.log("i can call");
    }
}
let oneplus = new Phone("1+",1999);
console.log(oneplus);//Phone{brand:"1+",price:1999}
```

###### 类的静态成员

```javascript
function Phone(){
    
}
Phone.name = 'shouji';
Phone.change = function(){
    console.log('i change');
}
let nokia = new Phone;//实例对象属性不通与函数对象，同与构造函数原型对象
console.log(nokia);//undefind

Phone.prototype.size = '5.5inch';
console.log(nokia.name);//undefind
console.log(nokia.size);//5.5inch
```

```javascript
class Phone{
    //静态属性//属于类不属于实例对象
    static name = 'shouji';
    static change(){
        console.log('i change');
    }
}
let nokia = new Phone();
console.log(nokia.name);//undefind
console.log(Phone.name);//shouji
```

###### 类的构造函数继承

```javascript
function Phone(brand, price) {
    this.brand = brand;
    this.price = price;
}
Phone.prototype.call = function () {
    console.log("i can call");
};

function smartPhone(brand,price,color,size){
    Phone.call(this,brand,price);
    this.color = color;
    this.size = size;
}

//设置子级构造函数的原型
smartPhone.prototype = new Phone;
smartPhone.prototype.constructor = smartPhone;//因为继承所以构造方法指向父类，需要手动修改指向子类的构造方法

//声明子类的方法
smartPhone.prototype.photo = function(){
    console.log("i can take picture");
}
smartPhone.prototype.palyGame = function(){
    console.log("i can play game");
}

const chuizi = new smartPhone('chuizi',2499,'black','5.5inch');
console.log(chuizi)


```

###### 类的继承

```javascript
class Phone{
    constructor(brand,price){
        this.brand = brand;
        this.price = price;
    }
    call(){
        console.log("i can call");
    }
}
class smartPhone extends Phone{
    constructor(brand,price,color,size){
        super(brand,price);//类似Phone.call(this,brand,price)
        this.color = color;
        this.size = size;
    }
    photo(){
         console.log('thak photo');
    }
    playGame(){
        console.log('palygame');
    }
}
const xiaomi = new smartPhone('xiaomi',799,'black','4.7inch');
console.log(xiaomi);

```

###### 子类对父类方法的重写

```javascript
class Phone{
    constructor(brand,price){
        this.brand = brand;
        this.price = price;
    }
    call(){
        console.log("i can call");
    }
}
class smartPhone extends Phone{
    constructor(brand,price,color,size){
        super(brand,price);//类似Phone.call(this,brand,price)
        this.color = color;
        this.size = size;
    }
    photo(){
         console.log('thak photo');
    }
    playGame(){
        console.log('palygame');
    }
    call(){
        console.log('vedio call')
    }//重写//本质上是就近原则，表现为重写
}
const xiaomi = new smartPhone('xiaomi',799,'black','4.7inch');
console.log(xiaomi);
xiaomi.call();//vedio call
```

###### get set

```javascript
class Phone{
    get price(){
        console.log('read price');
    }//常用于封装动态属性
    set price(newVal){
        console.log('change price')
    }//常用于输入的判断
}
let s = new Phone();
console.log(s.price)//1111//同时打印read price
s.price = 'free';//change price

```



## 数值拓展

###### Number.EPSILON 

是 js 表示的最小精度，EPSILON属性的值接近于2.220446049250...

```javascript
console.log(0.1 + 0.2 === 0.3)//false//浮点数在二进制里无法精确表示

function equal(a,b){
    if(Math.abs(a-b)<Number.EPSILON){
        return true;//误差小于可以表示的最小值，故忽略不计
    }else{
        return false;
    }
}
console.log(equal(0.1 + 0.2 , 0.3));//true
```

###### 二进制和八进制

```javascript
//0x表示进制类型
let b = 0b1010;//10 二进
let o = 0o777; //511 八进
let x = 0xff;//255 十六进
```

###### Number.isFinite

检测一个数值是否为有限数

```javascript
console.log(Nnmber,isFinite(100));//true
console.log(Nnmber,isFinite(100/0));//false
console.log(Nnmber,isFinite(Infinity));//false
```

###### Number.isNaN

检测一个住址是否为NaN

```javascript
console.log(Number.isNaN(123));
```

###### Number.parseInt     Number.parseFloat

字符串转整形或浮点型

```javascript
console.log(Number.parseInt('5211111love'));//5211111
console.log(Number.parseInt('3.14love'));//3.14
```

###### Number.isInterger

判断一个数是否为整数

```javascript
console.log(Number.isInterger(5));//true
console.log(Number.isInterger(5.5));//false
```

###### Math.trunc

将数字的小数部分抹除

```javascript
console.log(Math.sign(3.5));//3
```

###### Math.sign

判断一个数是正数 负数 还是零

```javascript
console.log(Math.sing(100));//1
console.log(Math.sing(0));//0
console.log(Math.sing(-1110));//-1
```



## 对象方法的拓展

###### Object.is

判断两个值是否完全相等

```javascript
console.log(Object.is(NaN,NaN));//true
console.log(NaN === NaN);//false//NaN跟任何值都是false这是Object.is跟===不同的地方
```

###### Object.assign

对象的合并

```javascript
const config1 = {
    host: 'localhost',
    port: 3306,
    name: 'root',
    pass: 'root',
    test: 'test',//保留
}
const config2 = {
    host: 'https://4399.com',
    port: 33060,
    name: 'game.com',
    pass: 'iloveyou',
    test2: 'test2'//消失
}
Object.assign(config1,config2);//后面覆盖前面
```

###### Object.setPrototypeof    Object.getPrototypeof

 是指原型对象和获取原型对象

```javascript
const school = {
    name:'sgg';
}
const cities = {
    xiaoqv: ['bj','sh','sz'];
}
Object.setPrototypeof(school,cities);
Object.getPrototypeof(school);
```



## 模块化

将大的文件拆分，再将小文件组合

优势：防止命名冲突、代码复用、高维护性

###### 模块化语法

- export 命令用于规定模块的对外接口
- import 命令用于输入其他模块的功能

```javascript
export let school = 'sgg';
export function teach(){
    console.log('teach sth')
}

import * as 引用名 from ".src/js/文件名";
console.log(引用名)
```



###### 暴露语法的使用

**分别暴露**

```javascript
export let school = 'sgg';
export function teach(){
    console.log('teach sth')
}
```

**统一暴露**

```javascript
let school = 'sgg';
function findJob(){
    console.log('teach sth')
}

export{school,findJob};
```

**默认暴露**

```javascript
export default{
    school:'ATG',
    change:function(){
         console.log('we change');
    }
}

引用名.default.change();//引用需要多加一层defalut结构
```

###### 引入语法的使用

**通用引入**

```javascript
import * as 引用名 from ".src/js/文件名";
```

**解构赋值形式**

```javascript
import {school,teach} from ".src/js/文件名";
import {school as hell,findJob} from ".src/js/文件名";//如果引用的引用名重名可使用别名
```

**默认引入**

```javascript
import {default as 引用名} from ".src/js/文件名";//默认引入必须使用别名，只能用于默认暴露的文件
```

**针对默认暴露的简便形式**

```javascript
import 变量名 from ".src/js/文件名";
```



###### 模块化的浏览器使用方式

创建文件app.js作为代码入口

```javascript
import * as m1 from "./m1.js";
import * as m2 from "./m2.js";
import * as m3 from "./m3.js";
...
```

在index文件中

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./src/js/app.js" type="module"></script>
  </body>
</html>
```

###### 模块化的项目使用方式

为了不同浏览器的不同ES版本的兼容性，需要通过babel进行转化（ES6=>ES5），再进行代码打包

www.babeljs.cn

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
      //1.安装工具babel-cli babel-preset-env browserify（webpack）
      //以下为控制台代码
      //npm i babel-cli babel-preset-env browserify -D
      //npx babel src/js -d dist/js --presets=babel-preset-env
      //2. npx babel src/js -d dist/js
      //3.打包 npx browserify dist/js/app.js -o dist/bundle.js
    <script src="dist/bundle.js"></script>
      //如代码更新则 npx babel src/js -d dist/js --preset=babel-preset-env
      //然后 npx browserify dist/js/app.js -o dist/bundle.js
  </body>
</html>
```

###### 模块化引入npm包

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
      //1.安装jquery包
      //npm i jquery
  </body>
</html>
```

```javascript
import * as m1 from "./m1.js";
import * as m2 from "./m2.js";
import * as m3 from "./m3.js";
...
//2.jquery导入
import $ from 'jquery';
//模拟修改背景颜色
$('body').css('background','pink');
//3.重新打包
// npx babel src/js -d dist/js --preset=babel-preset-env
// npx browserify dist/js/app.js -o dist/bundle.js
```

