---
title: JavaScript基础（五）函数
date: 2020-08-16
sidebar: false
categories:
 - FrontEnd
tags:
 - JavaScript
publish: true
---



## 函数的概念

在 JS 里面，可能会定义非常多的相同代码或者功能相似的代码，这些代码可能需要大量重复使用。虽然 for循环语句也能实现一些简单的重复操作，但是比较具有局限性，此时我们就可以使用 JS 中的函数。

函数：就是**封装了一段可被重复调用执行的代码块**。通过此代码块可以**实现大量代码的重复使用**。  



## 函数的使用

### 声明函数

```js
// 声明函数
function 函数名() {
    //函数体代码
}
```

- function 是声明函数的关键字,必须小写
- 由于函数一般是为了实现某个功能才定义的， 所以通常我们将函数名命名为动词，比如 getSum



### 调用函数

```js
// 调用函数
函数名();  // 通过调用函数名来执行函数体代码
```

- 调用的时候千万不要忘记添加小括号
- 声明函数本身并不会执行代码，只有调用函数时才会执行函数体代码。



### 函数封装

函数的封装是把一个或者多个功能通过函数的方式封装起来，对外只提供一个简单的函数接口

```js
/* 
   计算1-100之间值的函数 函数封装示例
*/
// 声明函数
function getSum(){
  var sumNum = 0;// 准备一个变量，保存数字和
  for (var i = 1; i <= 100; i++) {
    sumNum += i;// 把每个数值 都累加 到变量中
  }
  alert(sumNum);
}
// 调用函数
getSum();
```



## 函数的参数

- 形参：函数定义时设置接收调用时传入

- 实参：函数调用时传入小括号内的真实数据

参数的作用 : 在函数内部某些值不能固定，我们可以通过参数在调用函数时传递不同的值进去。

```js
// 带参数的函数声明
function 函数名(形参1, 形参2 , 形参3...) { // 可以定义任意多的参数，用逗号分隔
  // 函数体
}
// 带参数的函数调用
函数名(实参1, 实参2, 实参3...); 
```

1. 调用的时候实参值是传递给形参的
2. 形参简单理解为：不用声明的变量
3. 实参和形参的多个参数之间用逗号（,）分隔



**函数形参和实参数量不匹配时**

- 实参等于形参
  - 输出正确结果
- 实参个数多余形参个数
  - 只取到形参个数
- 实参个数小于形参个数
  - 多的形参定义为 `Undefined` ，结果为 `NaN` 





## 函数的返回值

**`return`**

返回值：函数调用整体代表的数据；函数执行完成后可以通过return语句将指定数据返回 。

```js
// 声明函数
function 函数名（）{
    ...
    return  需要返回的值；
}
// 调用函数
函数名();    // 此时调用函数就可以得到函数体内return 后面的值
```

-  在使用 return 语句时，函数会停止执行，并返回指定的值
-  如果函数没有 return ，返回的值是 undefined



> `break` , `continue` , `return` 的区别：
>
> - break ：结束当前的循环体（如 for、while）
> - continue ：跳出本次循环，继续执行下次循环（如 for、while）
> - return ：不仅可以退出循环，还能够返回 return 语句中的值，同时还可以结束当前的函数体内的代码





## arguments 的使用

当不确定有多少个参数传递的时候，可以用 arguments 来获取。

JavaScript 中，arguments实际上它是当前函数的一个内置对象。所有函数都内置了一个 arguments 对象，arguments 对象中存储了传递的所有实参。arguments展示形式是一个伪数组，因此可以进行遍历。

伪数组具有以下特点：

- 具有 length 属性

- 按索引方式储存数据

- 不具有数组的 push , pop 等方法





## 函数复调

函数内部可以调用另一个函数，在同一作用域代码中，函数名即代表封装的操作，使用函数名加括号即可以将封装的操作执行。



## 函数的两种声明方式

### 命名函数

利用函数关键字 function 自定义函数方式

```js
// 声明定义方式
function fn() {...}
// 调用  
fn();  
```

> JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
>
> JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
>
> 详见：[JavaScript 变量提升](https://www.runoob.com/js/js-hoisting.html) 



### 匿名函数

利用函数表达式，可以将函数匿名。

```js
// 这是函数表达式写法，匿名函数后面跟分号结束
var fn = function(){
    // code
};
// 调用的方式，函数调用必须写到函数体下面
fn();
```




