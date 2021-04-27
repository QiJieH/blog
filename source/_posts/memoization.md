---
title: 算法优化之记忆
date: 2021-4-25 0:19
updated: 
toc: false
comments: true
thumbnail: ''
categories:
 - Others
tags:
 - algorithm
 - optimization
 - memoization
---

<!-- https://i.jpg.dog/img/35bacce798103aab08b90462af169e79.jpg -->
在计算机领域，*记忆（memoization）*是主要用于加速程序计算的一种优化技术，它使得函数避免重复演算之前已被处理的输入，而返回已缓存的结果。
<!-- more -->

## 记忆 Memoization

函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。这种优化被称为**_记忆（memoization）_**。JavaScript 的对象和数组要实现这种优化是非常方便的。

比如说，我们想要一个递归函数来计算 Fibonacci 数列。一个 Fibonacci 数字是之前两个 Fibonacci 数字之和。最前面的两个数字是 0 和 1。

```js
var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}

for(let i = 0; i <= 10; i += 1) {
  console.log(i + ": " + fibonacci(i));
}
```

这样是可以工作的，但它做了很多无谓的工作。`fib` 函数被调用了 453 次。我们调用了 11 次，而它自身调用了 442 次去计算可能已被刚计算过的值。如果我们让该函数具备*记忆*功能，就可以显著地减少运算量。

我们在一个名为 `memo` 的数组里保存我们的存储结果，存储结果可以隐藏在闭包中。当函数被调用时，这个函数首先检查结果是否已存在，如果已经存在，就立即返回这个结果。

```js
var fibonacci = function() {
  let memo = [0, 1];
  let fib = function(n) {
    let result = memo[n];
    if(typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  }
  return fib;
}();
```

这个函数返回同样的结果，但它只被调用了 29 次。我们调用了它 11 次，它调用了自己 181 次去取得之前存储的结果。

我们可以吧这种技术推而广之，编写一个函数帮助我们构造带记忆功能的函数。 `memoizer` 函数取得一个初始的 `memo` 数组和 `formula` 函数。它返回一个管理 `memo` 存储和在需要时调用 `formula` 函数的 `recur` 函数。我们把这个 `recur` 函数和它的参数传递给 `formula` 函数：

```js
var memoizer = function(memo, formula) {
  let recur = function(n) {
    if(typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  }
  return recur;
}
```

现在，我们可以使用 `memoizer` 函数来定义 `fibonacci` 函数，提供其初始的 `memo` 数组和 `formula` 函数：

```js
var fibonacci = memoizer([0, 1], function(recur, n){
  return recur(n - 1) + recur(n - 2);
});
```

通过设计这种产生另一个函数的函数，极大地减少了我们的工作量。例如，要产生一个可记忆的阶乘函数，我们只需要通过基本的阶乘公式即可：
```js
var factorial = memoizer([1, 1], function(recur, n){
  return n * recur(n - 1);
});
```


> *《JavaScript 语言精粹》（修订版）Douglas Crockford著 电子工业出版社*