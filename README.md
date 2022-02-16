# Clean Bilibili Comment
最后更新: Febr 16, 2022.

> 世人苦肉蛋奶久矣

这个脚本运行在浏览器上，需要`Tampermonkey`拓展程序的支持。
脚本可以**按需屏蔽掉不希望出现的评论**。

## 功能介绍
- 可以使用 正则表达式 匹配屏蔽不希望出现的评论
- 可以屏蔽符合条件的网页链接（如链接标题出现了不希望看见的关键字）
- 可以对不同的up主设定不同的规则，也可以设置全局规则
- 可以对某种视频设定规则（如视频标题出现某些关键字）
- 命中规则后自动拉黑用户

## 食用方法
> 需要Tampermonkey环境，请先安装Tampermonkey拓展程序。

1.**使用GreasyFork安装**
打开连接：[Clean Bilibili Comment - GreasyFork](https://greasyfork.org/zh-CN/scripts/422375-clean-bilibili-comment)，并点击安装

2.**手动安装**
下载`clean-bilibili-comment.js`并导入到`Tampermonkey`中选择启用

或者直接在github打开`clean-bilibili-comment.js`，点击右上角的`RAW`，自己新建脚本然后全选覆盖即可。

默认已经自带一条回形针的过滤示例，如果喜欢吃肉蛋奶，可以反向过滤（笑

## 自定义规则 `对于0.2版本`
在脚本的`第19行`找到`regExp`对象，按照第一条默认规则的格式复制编写。

**默认规则如下**
```js
{ /* 回形针专用 */
  author: 258150656,
  title: /(回形针|PaperClip)+/,
  filter: /(肉蛋奶|巴西雨林|黑子|买水|森林|人口|影响|黑名单|拉黑|雨林|原谅|敌军|毁掉|垄断|监控|打钱)+/,
  init: "检测到回形针视频",
  // set the flag as false to disable printing blocked comments
  showBlocked: true
},

/* please put the global rule in the end */
{
  // use regular expression **obj** or author mid to match
  author: null,
  // use RegExp **obj** to match
  title: /\w+/,
  // use RegExp **obj** to match
  filter: /(肉蛋奶|巴西雨林|拉黑|敌军|毁掉|打钱|水军)+/,
  init: "全局应用生效",
  showBlocked: true,
  blockUser: true
}
```
脚本按照匹配的方式运行，只有在成功命中规则后脚本才会开始工作。

### 规则属性

#### `author: string | number | RegExp`
**按up主命中视频**

传入`number`时，视为up主mid，会进行全等判断

传入`string`时，视为up主名称，会进行模糊搜索

传入`RegExp`时，将调用对象的`test`方法对up主名称进行正则匹配

> 如不需要，可设置为`null`

#### `title: string | RegExp`
**按视频标题命中视频**

传入`string`时，视为视频标题，会进行模糊搜索

传入`RegExp`时，将调用对象的`test`方法对视频标题进行正则匹配

> 如不需要，可设置为`null`

#### `filter: RegExp`
**命中视频后使用的过滤规则**

提供一个正则表达式对象，过滤时将使用表达式的`test()`方法进行过滤
当`test()`返回`true`时，评论将被屏蔽

#### `init: string | Function`
**规则命中后输出的字符/调用的函数**

传入一个字符串或函数，将在初始化完成后输出或调用

#### `showBlocked: boolean`

指明是否需要打印被屏蔽的评论，如果需要调试过滤条件，建议开启

#### `blockUser: boolean`

指明是否需要在屏蔽评论后拉黑用户

### 全局规则
全局规则见默认规则最后一条，将命中条件设置一定可以命中的条件，如`/\w*/`。
⚠️ **一定要放在最后**！否则在它后面的条件都会失效。

## 最后
如果愿意分享你的规则，可以在issue留言。

愿天堂没有评论区。