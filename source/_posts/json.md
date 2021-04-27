---
title: 深入浅出 JSON
date: 2021-4-26 22:30
updated: 
toc: false
comments: true
thumbnail: ''
categories:
 - [FontEnd]
 - [BackEnd]
tags:
 - json
 - javascript
---

JavaScript 对象表示法（JavaScript Object Notation, 简称 JSON ）是一种轻量级的数据交换格式。**它基于 JavaScript 的对象字面量表示法，那是 JavaScript 最精华的部分之一**。<!-- more -->尽管只是 **JavaScript 的一个子集**，但它与语言无关。所有以现代编程语言编写的程序，都可以用它来彼此交换数据。它是一种文本格式，所以可以被人和机器阅读。它易于实现且易于使用。大量关于 JSON 的资料都可以在 [http:///www.json.org/](http:///www.json.org) 中找到。

## JSON 语法

JSON 有 6 种类型的值：对象，数组，字符串，数字，布尔值和特殊值 null。空白（空格符，制表符，回车符和换行符）可被插到任何值的前后。这使得 JSON 文本能更容易被人阅读。为了减少传输和存储的成本，空白可以省略。

JSON 对象是一个容纳 "名/值" 对的无序集合。名字可以是任何字符串。值可以是任何类型的 JSON 值，包括数组和对象。JSON 对象可以被无限层地嵌套，但一般来说保持其结构的相对扁平是最高效的。大多数语言都有容易映射为 JSON 对象的数据类型，比如对象（object),结构（struct)，字典（dictionary），哈希表（hash table），属性列表（property list）或关联数组（associative array）。

JSON 数组是一个值的有序序列。其值可以是任何类型的 JSON 值，包括数组和对象。大多数语言都有容易被映射为 JSON 数组的数据类型，比如数组（array），向量（vector），列表（list）或序列（sequence）。

JSON 字符串被包围在一对双引号之间。`\`字符被用于转义。JSON 允许`/`字符被转义，所以 JSON 可以嵌入 HTML 的`<script>`标签之中。

JSON 数字与 JavaScript 的数字相似。整数的首位不允许为 0 ，因为一些语言用它来表示八进制数。这种基数混乱在数据交换格式中是不可取的。数字可以是整数，实数或科学计数。

```json
{
    "foo": "bar",
    "key" : "value",
    "outter" : {
        "inner": "innerval"
    }
}
```

就是这样。这就是 JSON 的全部。JSON 的设计目标是成为一个极简的，轻便的和文本式的 JavaScript 子集。**实现互通所需要的共识越少，互通就越容易实现。**

## 安全地使用 JSON

JSON 特别易于用在 Web 应用中，因为 JSON 就是 JavaScript。使用 `eval` 函数可以把一段 JSON 文本转化成一个有用的数据结构：
```js
var myData = eval('('+ nyJSONText + ')');
```
(用圆括号把 JSON 文本括起来是一种避免 JavaScript 语法歧义的变通方案)

然而，`eval` 函数有着骇人的安全问题。用`eval` 去解析 JSON 文本安全吗？...


通过使用 `JSON.parse` 方法代替 `eval` 就能避免这种危险。如果文本中包含任何危险数据，那么 `JSON.parse` 将抛出一个异常...


在外部数据与 `innerHTML` 进行交互时还存在一个危险...


## 一个 JSON 解析器

这是一个用 JavaScript 编写 JSON 解析器的实现方案：

```js
// 代码略
```

> *《JavaScript 语言精粹》（修订版）Douglas Crockford著 电子工业出版社*