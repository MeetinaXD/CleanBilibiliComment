# Clean Bilibili Comment
最后更新: Febr 27, 2021.

> 世人苦肉蛋奶久矣

## 食用方法
下载`clean-bilibili-comment.js`并导入到`Tampermonkey`中选择启用，或者直接在github打开`clean-bilibili-comment.js`，点击右上角的`RAW`，自己新建脚步直接全选覆盖即可。

默认已经自带一条回形针的过滤示例，如果喜欢吃肉蛋奶，可以反向过滤（笑

## 自定义规则 `对于0.2版本`
在`第19行`找到`regExp`对象，按照第一条默认规则的格式复制编写。

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
  filter: /(肉蛋奶|巴西雨林|黑子|买水|森林|人口|影响|黑名单|拉黑|雨林|原谅|敌军|毁掉|垄断|监控|打钱|水军)+/,
  init: "全局应用生效"
}
```
脚本按照匹配的方式运行，如果你在规则中指定了命中条件，那么这条规则只有在命中成功后开始工作。

### 规则属性
#### `author`
**可选属性**
`string` `number` `正则对象[object RegExp]`

**命中方式**
当指定类型为`number`时，视为`author mid`，会进行全等判断

当指定类型为`string`时，视为`author name`，会进行模糊搜索

当指定类型为`[object RegExp]`时，将调用对象的`test`方法对作者名称进行正则匹配

> 如不需要，可设置为`null`

#### `title`
**可选属性**
`string` `正则对象[object RegExp]`

**命中方式**
当指定类型为`string`时，视为`video title`，会进行模糊搜索

当指定类型为`[object RegExp]`时，将调用对象的`test`方法对视频标题进行正则匹配

> 如不需要，可设置为`null`

#### `filter`
可选属性
`正则对象[object RegExp]`

提供一个正则表达式对象，过滤时将使用表达式的`test()`方法进行过滤
当`test()`返回`true`时，评论将被屏蔽

#### `init`
可选属性
`string` `function`

传入一个字符串或函数，将在初始化完成后输出或调用

#### `showBlocked`
可选属性
`boolean`

指明是否需要打印被屏蔽的评论，如果需要调试过滤条件，建议开启

### 全局规则
全局规则见默认规则最后一条，将命中条件设置一定可以命中的条件，如`/\w*/`。

**一定要放在最后**！否则在它后面的条件都会失效。

## 最后
如果愿意分享你的规则，可以在issue留言。

愿天堂没有评论区。