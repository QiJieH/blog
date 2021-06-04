---
title: 《JavaScript DOM 编程艺术》 读后心得
date: 2021-5-30 18:39
updated: 
toc: true
comments: true
thumbnail: 'https://i.jpg.dog/img/b7c255605b1a1217699abdb13bfef30c.png'
categories:
 - FontEnd
tags:
 - javascript
 - dom
 - html5
 - ajax
 - book
---

JavaScript是Web开发中最重要的一门语言，它强大而优美。无论是桌面开发，还是移动应用。JavaScript都是必须掌握的技术。W3C的DOM标准是开发Web应用的基石。已经得到所有现代浏览器的支持，这使得跨平台Web开发成了一件轻松惬意的事。<!-- more -->

本书是超级畅销书的升级版，由倡导Web标准的领军人物执笔，揭示了前端开发的真谛，是学习JavaScript和DOM开发的必读之作。

本书在简洁明快地讲述JavaScript和DOM的基本知识之后，通过几个实例演示了专业水准的网页开发技术，透彻阐述了平稳退化等一批至关重要的 JavaScript编程原则和最佳实践，并全面探讨了HTML5以及jQuery等JavaScript库。读者将看到JavaScript、 HTML5和CSS如何协作来创建易用的、与标准兼容的Web设计，掌握使用JavaScript和DOM通过客户端动态效果和用户控制的动画来加强 Web页面的必备技术。同时，还将对如何利用库提高开发效率有全面深入的理解。

> 摘自[豆瓣读书](https://book.douban.com/subject/6038371/)内容简介


## 个人评价

严格上来讲本书作为并非JavaScript这门语言的入门书籍，把它定位为JavaScript操作DOM教程可能更合适，它更适合那些希望通过js操作网页内容的人去阅读。本书标题概况的相当准确 :)

不得不提的是，尽管本书的某些方面的描述与编码已经过时不在适用，或者是有了更好的解决方案，但是依旧不妨碍学习本书，你大可使用更好选择解决这些问题。

不论如何，本书做为JS操作DOM的参考和学习书籍是可以肯定的，通过它你能够很迅速掌握和温习JS对DOM的操作和编程思路。除此之外，本书的某些编程原则和设计思维也是相当值得学习和借鉴的，我会尽可能的将其提炼在下方，以便后期参考和警醒。



## 精华提炼

本书是十分优秀的编程书籍，它的每个章节都是可学习和有用的，本人技术和能力有限仅能记录下一些自认为读有所获的地方。

以下内容都是摘自本书，或结合本人个人见解融汇之后记录下的。没人能确保这些内容都是正确唯一的，你应该有自己的见解和看法。

### 结构与行为分离

谈到 Web设计，最准确的理解是把网页看成三个层：
1. 结构层
2. 样式层（表现层）
3. 行为层

这三个层分别对应不同的技术，分别是
1. 超文本标记语言（HTML）
2. 层叠样式表（CSS）
3. JavaScript，文档对象模型（DOM）和浏览器对象模型（BOM）

作者认为**结构与行为分离程度越大越好**，把事件处理函数分离到外部的 JavaScript文件，使 js代码不再依赖于 HTML文档的内容和结构。编写代码时可以问问自己：“它的js与html标记是分离的吗？”。

```html
  <li>
    <a href="images/01.jpg" onclick="showPic(this); return false;" title="img01">IMG 01</a>
  </li>
```
理想情况下，应该在外部文件完成添加 `onclick`事件处理函数的工作，那样才能让标记文档没有“杂质“，就像下面这样：
```html
  <li>
    <a href="images/01.jpg" title="img01">IMG 01</a>
  </li>
```

最典型的违背结构与行为分离原则的示例是 `document.write`方法：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test</title>
  <script src="insertParagraph.js"></script>
</head>
<body>
  <script>
    insertParagraph("this is inserted")
  </script>
</body>
</html>
```
```js
function insertParagraph(text) {
  document.write(`<p>${text}</p>`)；
}
```
像上面这样把 JavaScript和 HTML代码混杂在一起是一种很不好的做法。这样的标记即不容易阅读和编辑，也无法享受行为与结构分离开来的好处。

### 内容为主

所有的网页开发人员都知道一句话：“内容就是一切”。如果没有内容，创建网站还有何用？

话虽如此，我们也不能一股脑的将原始内容不加描述的发布到网站上，在创网站时给内容加上正确的 HTML标签是第一步，或许也是最重要的步骤。我们可以修正那句格言为：“**标记良好的内容就是一切**”。请正确使用标记语言对内容做出正确描述。

如果你察觉到自己正在使用DOM技术把一些重要的内容添加到网站上，则应该立刻停下来去检讨你的计划和思路。你很可能发现自己正在滥用DOM！

### 渐进增强与平稳退化

这部分内容可以说是本书的重点和精华了，我会尽可能的描述和举例自己的理解和认知。在本书中这两个名词始终贯穿着作者的编码和设计理念，通读体会后受益匪浅。

- **渐进增强**（progressive enhancement）。渐进增强原则基于这样一种思想：你应该总是从最核心的部分，也就是从内容开始。应该根据内容使用标记良好的结构；让后再逐步加强这些内容。这些增强工作即可以是通过 CSS改进呈现效果，也可以是通过 DOM添加各种行为。如果你正在使用 DOM添加核心内容，那么你添加的时机未免太迟了，内容应该在开始编写文档时就成为文档的组成部分。

- **平稳退化**（graceful degradation）。渐进增强的实现必然支持平稳退化。如果你按照渐进增强的原则去充实内容，你为内容添加的样式和行为就自然支持平稳退化，那些缺乏必要的 CSS和 DOM支持的访问者仍可以访问你的核心内容。如果你用 JavaScript去添加这些重要内容，它就没办法支持平稳退化，不支持 JavaScript，就看不到内容。

现在我们有如下场景：用户点击链接，会在预留位置显示当前链接指向的图片，注意没有发生页面跳转。

你可以很容易编写一些像这样的代码去实现这一功能：
```html
<li>
  <a href="javascript:showPic('images/01.jpg'); return false;">IMG 01</a>
</li>
```

```html
<li>
  <a href="#" onclick="sowPic('images/01/jpg'); return false;">IMG 01</a>
</li>
```
第一个问题是：“如果 JavaScript功能被禁用，会怎样？”

如果我把链接写成上面这样，它们在不支持或禁用了 JavaScript功能的浏览器里将毫无用处，也就是说这些代码都无法退化。

```html
<li>
  <a href="images/01/jpg" onclick="sowPic(this); return false;">IMG 01</a>
</li>
```

上面这段代码为此预留了后路：即使 JavaScript功能已被禁用，用户也可以浏览图片库里的所有图片，网页里的链接也可以正常工作。在没有 JavaScript的“干扰”下，浏览器将沿着 `href`属性给出的链接前进，用户将打开一个新窗口显示图片，而不是毫无响应。虽说用户体验不如正常情况，但网页的基本功能未受到损害——页面上的所有内容都可以访问。

把 `href`属性设置为一个真实存在的值不过是举手之劳，但图片库却因此能够**平稳退化**。

另一个更清晰的示例可以体现在一些 js函数上，你也可以使你的函数**平稳退化**，向后兼容：

```js
function prepareGallery() {
  if(!document.getElementById) return false;
  if(!document.getElementById("imagegallery")) return false;
  let gallery = document.getElementById("imagegallery");
  ...
}
```

虽然只是几条简单的 `if`语句，但它可以确保那些“古老”的浏览器不会因为我的脚本代码而出问题。这么做是为了让脚本有良好的向后兼容性。因为我在给网页添加各有关行为时始终遵循了“**渐进增强**”的原则，所以可以确切的知道我添加的那些功能都能**平稳退化**，我的网页在那些“古老的”浏览器也能正常浏览。那些只支持一部分 JavaScript功能但不支持 DOM的浏览器仍可以访问我的网页内容。

## 语句摘录

- 如果在编写某些代码时你就觉得它们不易理解，等日后再去阅读它们的时候就会更加困难。
- 如果想要改变某个元素的呈现效果，使用 CSS；如果想改变某个元素的行为，使用 DOM；如果你想根据某个元素的行为去改变它的呈现效果，请运用你的智慧，在这个问题上没有放之四海而皆准的答案。

## 函数记录

在阅读本书时，发现了一些实用的方法函数。

- **`window.onload`事件栈**
```js
function addLoadEvent(func) {
  let oldonload = window.onload;
  if(typeof window.onload !== 'function') {
    window.onload = func;
  }else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
```
`windows.onload`只能绑定一个函数，但实际需求往往需要执行大量函数，通过函数嵌套并加一层封装来处理这种情况。

- **`insertAfter` 向元素之后插入**
```js
function insertAfter(newElement, targetElement) {
  let parent = targetElement.parentNode;
  if(parent.lastChild === targetElement) {
    parent.appendChild(newElement);
  }else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
```
原生DOM中有`insertBefore`方法插入节点但是却没有对应的`insertAfter`，幸运的是我们可以使用现有的API自己实现。

- **`getHTTPObject` 退化XHR对象**
```js
function getHTTPObject() {
  if(typeof XMLHttpRequest === "undefined") {
    XMLHttpRequest = function() {
      try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
        catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch(e) {}
      try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch(e) {}
      return false;
    } 
  }
  return new XMLHttpRequest();
}
```