---
title: 测试框架 Mocha 快速上手
date: 2021-6-1 23:16
updated: 
toc: true
comments: true
thumbnail: 'https://i.jpg.dog/img/f08b76a3f6b5b9f56f040a580b74186f.png'
categories:
 - Other
 - BackEnd
 - FrontEnd
tags:
 - javascript
 - mocha
 - software test
---


[Mocha](https://mochajs.org/) 是一个能够运行在 Node.js 和浏览器中的多功能 JavaScript 测试框架，它让异步测试变得 简单 和 有趣。Mocha 顺序运行测试，并给出灵活而精确的报告，同时能够将未捕获的异常映射到准确的测试用例上。Mocha 源码托管在 [GitHub](https://github.com/mochajs/mocha) 上。<!--more-->

Mocha（发音"摩卡"）诞生于2011年，是现在最流行的JavaScript测试框架之一，在浏览器和Node环境都可以使用。

软件测试向来是软件开发过程中的重要流程，好的软件测试能够使项目更加健壮，质量更加可靠，也对提升用户体验有极大帮助。而测试框架的存在就是为了提高测试效率和质量，使得测试过程变得快速和可控。

## 安装
一般情况下，测试框架都是作为项目的开发依赖进行安装：
```
npm install -D mocha
```

推荐同时其安装在全局，便于测试：
```shell
npm install -G mocha
```

## 编写测试脚本

我们先从一个简单的测试脚本开始（测试脚本是为了测试源码而专门编写的脚本）。

这是一个待测试源码`add.js`：
```
function add(x, y) {
  return x + y;
}

module.exports = add;
```
为了测试这个函数，我们需要编写一个测试脚本。

通常，测试脚本都是与源文件同名，以`.test.js`或`.spec.js`后缀结尾。比如`add.js`的测试脚本文件名为`add.test.js`。

```js
const add = require('./add.js');
const expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

在第一行我们引入了待测试的`add.js`文件，第二行则是引入的第三方断言库`chai`。

`describe`代码块是一个测试套件，其中可以包含多个测试用例`it`。

在本次名为`加法函数的测试`的测试中，使用了一个名为`1 加 1 应该等于 2`的测试用例，这个测试用例断言`add(1，1)`是否等于`2`，如果不等会为我们抛出错误，而mocha则会抓取错误认为测试用例不通过。

事实上，如果断言没有发生，即没有抛出错误，mocha就会认为用例通过：
```js
it('1 加 1 应该等于 2', function() {});
```
上面这个用例内部没有任何代码，由于没有抛出错误，所以还是会通过。

## 断言库的使用

Mocha 允许你使用任何你喜欢的断言库。在上面的例子中，我们使用的是第三方断言库`chai`。通常情况下，只要它能抛出 Error 就可以！这就意味着你可以使用下面列出的断言库：
- [expect.js](https://github.com/Automattic/expect.js) - `expect()` 风格的断言
- [chai](https://www.chaijs.com/) - `expect()`、`assert()` 和 `should` 风格的断言
- [better-assert](https://github.com/tj/better-assert) - C文档风格 `assert()`
- 等等

当然你也可以使用 Node.js 的内置 [assert](https://nodejs.org/api/assert.html) 模块

`expect`断言的优点是很接近自然语言，下面是一些例子。

```js
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```

你可以自行翻阅`chai`的相关[文档](https://www.chaijs.com/api/bdd/)查询其API

## 开始测试

有了测试脚本之后就可以使用mocha来执行测试脚本了。

mocha会默认运行`test`文件下的`.test.js`和`.spec.js`后缀文件。
```shell
$ mocha
```

你也可以指定文件
```shell
$ mocha add.test.js
```

或者指定多个测试文件
```shell
$ mocha file1 file2 file3
```

运行测试脚本后，窗口会输出测试过程和结果：
```shell
加法函数的测试
    ✓ 1 加 1 应该等于 2

  1 passing (8ms)
```

如果你的`test`文件目录下有着子目录，你需要附加参数`--recursive`来执行所有子目录下的测试脚本:
```shell
$ mocha --recursive

  加法函数的测试
    ✓ 1 加 1 应该等于 2
    ✓ 任何数加0应该等于自身

  乘法函数的测试
    ✓ 1 乘 1 应该等于 1

  3 passing (9ms)
```

当然你也可以通过通配符的方式实现更多行为：
```shell
$ mocha 'test/**/*.@(js|jsx)'
```

```shell
$ mocha "./spec/**/*.js"
```

## 命令行参数

### `--help`，`-h`
查看Mocha所有命令行参数
```shell
$ mocha -h
```

### `--reporter`,`-R`
指定参数报告的展示格式，默认`spec`格式
```shell
$ mocha
# 等同于
$ mocha --reporter spec
```
你可以在此处预览其他风格的[报告格式](https://mochajs.org/#reporters)。
```shell
spec
dot
nyan
tap
landing
list
progress
json
json-stream
min
doc
```

`--reporters`参数可以显示所有内置报告参数。
```
$ mocha --repporters
```


使用[`mochawesome`](https://github.com/adamgruber/mochawesome)模块，可以生成漂亮的HTML格式的报告。
```
$ npm install -D mochawesome
$ mocha --reporter mochawesome
```
测试结果报告就在mochaawesome-reports子目录生成。

![49e6f84b719d448aa01eb1d85faf62a0.png](https://i.jpg.dog/img/49e6f84b719d448aa01eb1d85faf62a0.png)

### `--watch`, `-w`

监控测试脚本，一旦脚本修改自动运行测试脚本。

```shell
$ mocha --watch
```

### `--bail`, `-b`

添加`bail`参数后，如果有一个用例没有通过就会终止测试。

```shell
$ mocha --bail
```

### `--grep`, `-g`

`--grep`参数用于搜索测试用例的名称（即`it`块的第一个参数），然后只执行匹配的测试用例。

```shell
$ mocha --grep "1 加 1"
```

### `--invert`, `-i`

`--invert`参数表示只运行不符合条件的测试脚本，必须与--grep参数配合使用。

```shell
$ mocha --grep "1 加 1" --invert
```

更多命令参数参考[文档](https://mochajs.org/#command-line-usage)。

## 配置文件

Mocha 支持使用配置文件定制测试细节，即将命令行参数分离。

Mocha支持几种格式的配置文件，你可以前往[配置文件](https://mochajs.org/#configuring-mocha-nodejs)查看，这里介绍`.mocharc.json`的配置方式。

在**项目根目录**下新建`.mocharc.json`文件，根据需求添加相应配置项，比如下面文件：

```json
{
  "reporter": "tap",
  "recursive": "mytest",
  "bail": true
}
```

等价于

```shell
$ mocha --reporter tap --recursive mytest --bail
```

其指定了mocha运行`mytest`目录及其子目录下的所有测试脚本，以tap格式生成报告，并且出现失败用例时中断测试。

## ES6测试

如果你的测试脚本使用了ES6语法，你需要使用Babel转码。
```js
import add from '../src/add.js';
import chai from 'chai';

let expect = chai.expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

安装Babel。
```shell
$ npm install babel-core babel-preset-es2015 -D
```

然后，在项目目录下面，新建一个`.babelrc`配置文件。

```json
{
  "presets": [ "es2015" ]
}
```

最后，使用`--require`参数指定测试脚本的转码器。

```shell
$ mocha --require babel-core/register
```

> `--compilers`已被禁用，参考[issue](https://github.com/mochajs/mocha/wiki/compilers-deprecation)



## 异步测试

Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用`-t`或`--timeout`参数指定超时门槛。

```js
it('测试应该5000毫秒后结束', function(done) {
  var x = true;
  var f = function() {
    x = false;
    expect(x).to.be.not.ok;
    done(); // 通知Mocha测试结束
  };
  setTimeout(f, 4000);
});
```

上面的代码需要等到4秒后才会有结果，如果执行测试就会超时报错，通过`--timeout`延长超时限制。

```shell
$ mocha -t 5000 timeout.test.js
```

另外，上面的测试用例里面，有一个`done`函数。`it`块执行的时候，传入一个`done`参数，当测试结束的时候，必须显式调用这个函数，告诉Mocha测试结束了。否则，Mocha就无法知道，测试是否结束，会一直等到超时报错。

### 传统回调

下面是另外一个异步测试的例子`async.test.js`。

```js
it('异步请求应该返回一个对象', function(done){
  request
    .get('https://api.github.com')
    .end(function(err, res){
      expect(res).to.be.an('object');
      done();
    });
});
```

```shell
$ npm i superagent -D
```

运行下面命令，可以看到这个测试会通过。
```shell
$ mocha -t 10000 async.test.js
```

### Promise

另外，Mocha内置对Promise的支持，允许直接返回Promise，等到它的状态改变，再执行断言，而不用显式调用done方法。请看promise.test.js。

```js
it('异步请求应该返回一个对象', function() {
  return fetch('https://api.github.com')
    .then(function(res) {
      return res.json();
    }).then(function(json) {
      expect(json).to.be.an('object');
    });
});
```
```shell
$ npm i node-fetch -D
```

### async / await

如果你的js环境支持`async/await`语法，你可以像这样使用它。

```js
beforeEach(async function() {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({type: 'User'});
    users.should.have.length(3);
  });
});
```


## 用例钩子

通过默认的 BDD 样式的接口，Mocha提供了`before()`、`after()`、`beforeach()`和`afterEach()`钩子。这些应该用于设置前提条件，并在测试后进行清理。

```js
describe('hooks', function() {
  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

  // test cases
});
```

下面是简单的示例代码。
```js
const expect = require('chai').expect;

describe('beforeEach示例', function() {
  var foo = 1;

  beforeEach(function() {
    foo++
  });

  it('foo应该为2', function() {
    expect(foo).to.be.equal(2);
  });

  it('foo应该为3', function() {
    expect(foo).to.be.equal(3);
  });
});
```

运行测试

```shell
$ mocha beforeEach.test.js
  beforeEach示例
    √ foo应该为2
    √ foo应该为3


  2 passing (7ms)
```

你可以在Hook中书写异步代码。

```js
describe('异步 beforeEach 示例', function() {
  var foo = false;

  beforeEach(function(done) {
    setTimeout(function() {
      foo = true;
      done();
    }, 50);
  });

  it('全局变量异步修改应该成功', function() {
    expect(foo).to.be.equal(true);
  });
});
```

## 用例管理

大型项目有很多测试用例。有时，我们希望只运行其中的几个，这时可以用`only`方法。`describe`块和`it`块都允许调用`only`方法，表示只运行某个测试套件或测试用例。

```js
it.only('1 加 1 应该等于 2', function() {
  expect(add(1, 1)).to.be.equal(2);
});

it('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```

上面代码中，只有带有`only`方法的测试用例会运行。

此外，还有`skip`方法，表示跳过指定的测试套件或测试用例。

```js
it.skip('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});
```

上面代码的这个测试用例不会执行。

## 浏览器测试

Mocha支持在浏览器测试，

首先，使用mocha init命令在指定目录生成初始化文件。

```shell
$ mocha init browser-test
```

上面的命令会生成浏览器测试模板。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mocha</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="mocha.css" />
  </head>
  <body>
    <div id="mocha"></div>
    <script src="mocha.js"></script>
    <script>
      mocha.setup('bdd');
    </script>
    <script src="tests.spec.js"></script>
    <script>
      mocha.run();
    </script>
  </body>
</html>
```

你需要使用`<script>`标签引入你使用的断言库

```html
...
<div id="mocha"></div>
<script src="https://unpkg.com/chai/chai.js"></script>
<script src="mocha.js"></script>
...
```

之后引入**源码和测试脚本**，只需要将`test.spec.js`替换为你的测试脚本即可

```js
// add.test.js
var expect = chai.expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });

  it('任何数加0等于自身', function() {
    expect(add(1, 0)).to.be.equal(1);
    expect(add(0, 0)).to.be.equal(0);
  });
});
```

```html
<script>
  mocha.setup('bdd');
</script>
<script src="add.js"></script>
<script src="add.test.js"></script>
<script>
  mocha.run();
</script>
```

注意引入位置和模块化剔除。

浏览器打开该文件即可运行测试。

![f874240c222af6d40fcaf9a92d1f645b.png](https://i.jpg.dog/img/f874240c222af6d40fcaf9a92d1f645b.png)

在浏览器测试提供了浏览器的测试环境，这一点对开发十分重要。


## 生成测试报告文档

Mocha支持从测试用例生成规格文件。

```shell
$ mocha --recursive -R markdown > spec.md
```

上面命令根据`test`目录的所有测试脚本，生成一个规格文件`spec.md`。`-R markdown`参数指定规格报告是`markdown`格式。

如果想生成HTML格式的报告`spec.html`，使用下面的命令。

```shell
$ mocha --recursive -R doc > spec.html
```

## 参考引用

> [Mocha官方文档](https://mochajs.org/)
> [Mocha中文文档](https://mochajs.bootcss.com/)
> [阮一峰 测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)