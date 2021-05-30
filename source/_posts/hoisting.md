---
title: JavaScript 提升（Hoisting）
date: 2021-4-28 21:55
updated: 
toc: false
comments: true
thumbnail: ''
categories:
 - FontEnd
tags:
 - javascript
 - hositing
---

JavaScript 的语法来源于C。在所有其他类似C语言风格的语言里，一个代码块（包括一对花括号中的一组语句）会创造一个作用域。代码中声明的变量在其外部是不可见的。<!-- more -->JavaScript 采用了这样的语法，却没有提供块级作用域：**代码块中声明的变量在包含此代码块的函数的任何位置都是可见的**。这让其他语言编程的程序员们大为意外。

在大多数语言中，一般来说，变量声明最好的地方是在第一次用到它的地方。但这种做法在JavaScript里反而是一个坏习惯，因为它没有块级作用域。更好的方式是**在每个函数的开头部分声明所有变量**。

> *《JavaScript 语言精粹》（修订版）Douglas Crockford著 电子工业出版社*

## JavaScript 声明会被提升

**提升（Hoisting）是 JavaScript 将声明移至顶部的默认行为**。ECMAScript 并没有给出提升这一概念，而是人们对JavaScript执行上下文工作方式抽象出来的一种性质。

实际的实现方式是 JavaScript 的变量和函数的声明会在编译阶段放入内存这意味着使用者在正式声明一个函数或者变量之前就能够使用它。

```js
//ReferenceError: foo1 is not defined
console.log(foo1);  

//undefined
console.log(foo2)
var foo2 = bar2;

//function fn is not defined
fn();
function fn(){

}
```
为了理解这一点，您必须理解术语 "hoisting"。Hoisting 是 JavaScript 将所有声明提升到当前作用域顶部的默认行为（提升到当前脚本或当前函数的顶部）。

## let 和 const 关键字

用 `let` 或 `const` 声明的变量和常量不会被提升！

```js
// ReferenceError: a is not defined
console.log(a);
let a = 10;
```

## JavaScript 初始化不会被提升

**JavaScript 只提升声明，而非初始化**。

```js
var x = 5;
console.log(x + " " + y);   // 5 undefined
var y = 7;
```

## 在顶部声明您的变量！

Hoisting（对很多开发者来说）是 JavaScript 的一种未知的或被忽视的行为。如果开发者不理解 hoisting，程序也许会包含 bug（错误）。为了避免 bug，**请始终在每个作用域的开头声明所有变量**。
由于这就是 JavaScript 解释代码的方式，请保持这个好习惯。严格模式中的 JavaScript 不允许在未被声明的情况下使用变量。

> 参考 *[w3school:js_hoisting](https://www.w3school.com.cn/js/js_hoisting.asp)*

## 为什么会存在提升

关于为什么存在变量提升和函数提升 JavaScript 开发者 Brendan Eich 在与 Dmitry Soshnikov 的 twitter 话题交流中曾有提到过，关于变量提升是由于第一代JS虚拟机中的抽象纰漏导致的，编译器将变量放到了栈槽内并编入索引，然后在（当前作用域的）入口处将变量名绑定到了栈槽内的变量。（注：这里提到的抽象是计算机术语，是对内部发生的更加复杂的事情的一种简化。），Brendan Eich 很确定的说，**函数提升是为了解决相互递归的问题，大体上可以解决像ML语言这样自下而上的顺序问题**。

```js
// 验证偶数
function isEven(n) {
    if (n === 0) {
        return true;
    }
    return isOdd(n - 1);
}
// 验证奇数
function isOdd(n) {
    if (n === 0) {
        return false;
    }
    return isEven(n - 1);
}
```

如果没有函数提升，而是按照自下而上的顺序，当`isEven`函数被调用时，`isOdd`函数还未声明，所以`isEven`内部无法调用`isOdd`函数，形成了死循环。所以 Brendan Eich 设计了函数提升这一形式，将函数提升至当前作用域的顶部。

> ![](https://i.jpg.dog/img/cbb43f09d226cac5cfa207115c7beb8f.png)

最后 Brendan Eich 总结到：**变量提升是人为实现的问题，而函数提升在当初设计时是有目的的**。

> *参考 [liuhe688 博文 《JavaScript: 变量提升和函数提升》](https://www.cnblogs.com/liuhe688/p/5891273.html)*