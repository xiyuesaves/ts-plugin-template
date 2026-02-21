import type { BrowserWindow } from "electron";

// 在窗口创建时触发
function onBrowserWindowCreated(window: BrowserWindow) {
  console.log("onBrowserWindowCreated");
}

// 环境判断
if ("qwqnt" in globalThis) {
  qwqnt.main.hooks.whenBrowserWindowCreated.peek(onBrowserWindowCreated);
}

module.exports = { onBrowserWindowCreated };
