// 初始化设置界面，仅在setting窗口执行
async function initSettingView(view: HTMLDivElement) {
  const devInfo: HTMLDivElement = document.createElement("div");
  devInfo.innerHTML = `Hello World!`;
  view.insertAdjacentElement("afterbegin", devInfo);
}

export { initSettingView };
