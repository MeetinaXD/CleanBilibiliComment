// ==UserScript==
// @name         Clean Bilibili Comment
// @namespace    https://meetinaxd.ltiex.com
// @version      0.2
// @description  To be or not to be, that's a question.
// @author       MeetinaXD
// @match        https://www.bilibili.com/video/*
// @grant        none
// ==/UserScript==

// window.vd -> bilibili video info.
// :: title -> video title
// :: owner -> video author info.

// window.bbComment -> related to comment and reply

(function () {
  // put your rules here...
  const regExp = [
    { /* 回形针专用 */
      author: 258150656,
      title: /(回形针|PaperClip)+/,
      filter: /(肉蛋奶|巴西雨林|黑子|买水|森林|人口|影响|黑名单|拉黑|雨林|原谅|敌军|毁掉|垄断|监控|打钱)+/,
      init(){
        console.log('检测到回形针📎视频');
        $('.common').hide()
      },
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
  ]

  let currentExp = null
  function init() {
    const commentBlock = "<span style='background: #eaeaea; color:#3e3e3e; font-size:14px'>This comment has been blocked</span>"
    const urlBlock = "<span style='background: #eaeaea; color:red; font-size:14px'>This url has been blocked</span>"

    // Comment and reply rendering method
    const fn1 = window.bbComment.prototype._createMsgContent
    const fn2 = window.bbComment.prototype._createSubMsgContent
    const fn3 = window.bbComment.prototype._resolveJump

    // Once the script handle the original render methods, the following objects will not be inited correctly.
    window.bbComment.prototype.jumpReportIndex = 0
    window.bbComment.prototype.jumpReport = {}

    window.bbComment.prototype._createMsgContent = function (e) {
      return handler(e, fn1)
    }
    window.bbComment.prototype._createSubMsgContent = function (e) {
      return handler(e, fn2)
    }
    window.bbComment.prototype._resolveJump = function (e, t) {
      return handler(e, fn3, t)
    }

    const handler = function (e, fn, extra = null) {
      const exp = currentExp.filter
      if (extra) {
        let replace = ""
        let k
        for (k in extra){
          if (exp.test(extra[k].title)){
            extra[k] = {}
            replace += urlBlock
          }
        }
        return replace + fn.call(window.bbComment.prototype, e, extra)
      }

      let domText = commentBlock
      let text = e.content.message
      if (!exp.test(text)) {
        domText = fn.call(window.bbComment.prototype, e)
      } else if(currentExp.showBlocked) {
        console.log('\t%c已过滤 >>> ', "color: orange",  text)
      }
      return domText
    }
  }

  const intervalId = setInterval(function () {
    // init exp
    if (window.vd && !currentExp) {
      const vd = window.vd
      const authorName = vd.owner.name
      const authorMid = vd.owner.mid
      const title = vd.title
      function setExp(o) {
        if (!o && typeof o.filter !== "[object RegExp]"){
          console.error("[Clean Bilbili Comment] Your filter is illegal")
        }
        currentExp = o
      }
      for (let i = 0; i < regExp.length; i++) {
        const exp = regExp[i];
        if (exp.author) {
          const type = typeof exp.author
          if (type === "string" && authorName.indexOf(exp.author) === -1){
            continue
          }
          if (type === "number" && authorMid !== exp.author){
            continue
          }
          if (type === "[object RegExp]" && !exp.author.test(authorName)){
            continue
          }
          setExp(exp)
          break
        }
        if(exp.title){
          const type = typeof exp.title
          if (type === "string" && title.indexOf(exp.title) === -1){
            continue
          }
          if (type === "[object RegExp]" && !exp.title.test(title)){
            continue
          }
          setExp(exp)
          break
        }
      }
      // no match video, cancel.
      if (!currentExp){
        console.warn("[Clean Bilbili Comment] 无匹配条件")
        clearInterval(intervalId)
      }
    }

    if (currentExp && typeof $ !== 'undefined' && $('.comment').length !== 0 && !!window.bbComment && !!window.vd) {
      clearInterval(intervalId)
      init()
      if (typeof currentExp.init === 'function'){
        currentExp.init()
      } else if (typeof currentExp.init === 'string') {
        console.warn(currentExp.init)
      }
      console.warn("[Clean Bilbili Comment] Bilibili 评论区净化注入成功")
    }
  }, 100)
})();