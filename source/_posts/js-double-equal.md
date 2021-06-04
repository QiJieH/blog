---
title: 浅析 JavaScript 中的 == 和 !=
date: 2021-4-27 23:44
updated: 
toc: false
comments: true
thumbnail: 'https://i.jpg.dog/img/cc3724bf8d77b7a3d24bd2efd703b7a8.jpg'
categories:
 - FontEnd
tags:
 - javascript
---

JavaScript 有两组相等运算符：`===` 和 `!==`，以及它们邪恶的孪生兄弟 `==` 和 `!=`。<!-- more -->`===` 和 `!==` 这一组运算符会按照你期望的方式工作。如果两个运算类型一致且拥有相同的值，那么 `===` 返回 `true` ，`!==` 返回 `false` 。而它们邪恶的孪生兄弟只有在两个运算符类型一致时才会做出正确的判断，**如果两个运算数是不同类型，它们试图去强制转换值的类型**。转换的规则复杂且难以记忆。这里有一些有趣的例子：

```js
'' == '0'          //false
0 == ''            //true
0 == '0'           //true

false == 'false'   //false
false == '0'       //true

false == undefined //false
false == null      //false
null == undefined  //true

'\t\r\n' == 0      //true
```

`==` 运算符对*传递性*的缺乏值得我们警惕。我的建议是永远不要使用那对邪恶的孪生兄弟。相反，**请始终使用 `===` 和 `!==`** 。如果以上所有的比较使用 `===` 运算符，结果都是 `false`。

> *传递性*是一种编程约定。可以这么理解：对于任意的引用值`x`, `y`和`z`，如果 `x==y`和`y==z`为`true`，那么`x==z`为`true`。而 JavaScript 中的 `==` 运算符在某些特例是违背了传递性。

> 摘自《JavaScript 语言精粹》（修订版）Douglas Crockford著 电子工业出版社

## 再次探索

使用 `==`时，不同类型的值也可以被看作相等。这样的结果可能会使那些资深的 JavaScript开发者感到困惑。我们用下面的表格分析一下不同类型的值用相等运算符比较后的结果。

| 类型（x）    | 类型（y）    |     结果          |
| ----------- | ----------- | ----------------  |
| null        | undefined   | true              |
| undefined   | null        | true              |
| number      | string      | x == toNumber(y)  |
| string      | number      | toNumber(x) == y  |
| bool        | any         | toNumber(x) == y  |
| any         | bool        | x == toNumber(y)  |
|string,number| object      |x == toPrimitive(y)|
| object      |string,number|toPrimitive(x) == y|

如果 `x`和 `y`的类型相同，JavaScript会用`equals`方法比较这两个值或对象。没有列在这个表里的其他情况会返回 `false`。

`toNumber`和 `toPrimitive`方法是内部的，并工具下表格进行估值。

`toNumber`方法对不同类型返回的结果如下。

| 值类型       | 结果 |
| ----------- | ----------- |
| undefined   | NaN         |
| null        | +0          |
| bool        | true返回1；false返回+0|
| number      | number      |

`toPrimitive`方法对不同类型返回的结果如下。

| 值类型       | 结果 |
| ----------- | ----------- |
| 对象         | 如果对象的valueOf方法的结果是原始值，返回原始值；如果对象的 toString方法返回原始值，就返回这个值；其他情况都返回一个错误|

用例子来验证一下表格的结果。首先，我们知道下面的代码输出 true（字符串长度大于1）。

```js
console.log('packt' ? true : false);
```

那么下面这行代码的结果呢？

```js
console.log('packt' == true);
```

输出是false，为什么会这样呢？
1. 首先，布尔值会被`toNumber`方法转成数，因此得到`packt == 1`
2. 其次，用`toNumber`转换字符串值。因为字符串包含字母，所以会被转成 `NaN`，表达式就变成了`NaN == 1`，结果就是`false`。

那么下面这行代码的结果呢？

```js
console.log('packt' == false);
```

输出也是false，为什么呢？
1. 首先，布尔值会被`toNumber`方法转成数，因此得到`packt == 0`
2. 其次，用`toNumber`转换字符串值。因为字符串包含字母，所以会被转成 `NaN`，表达式就变成了`NaN == 0`，结果就是`false`。

> 摘自《学习JavaScript数据结构与算法》第三版