# qwqnt/LiteLoaderQQNT 通用 TypeScript 插件模板

## 文件说明

- `package.json`：插件配置中心。在标准规范基础上增加了 qwqnt 专属配置，支持 Schema 类型检查与开发体验优化。

- `manifest.json`：面向 LiteLoaderQQNT 框架的插件声明文件。

- `src/`：源代码。插件的功能实现代码。
  - `src/main/`：插件的主进程代码，用于处理插件的主要逻辑。

  - `src/preload/`：插件的预加载脚本，用于加载插件的预加载脚本。

  - `src/renderer/`：插件的渲染进程代码，用于处理插件的 UI 逻辑。
    - `src/renderer/pages/`：插件的 UI 页面，用于编写针对某个特定页面的逻辑。

    - `src/renderer/index.ts`: 通用入口文件，`index.ll.ts` 和 `index.qwq.ts` 都会加载此文件作为实际入口。

    - `src/renderer/index.qwq.ts`: QwQNT 的入口文件，一般不用修改。

    - `src/renderer/index.ll.ts`: LiteLoaderQQNT 的入口文件，一般不用修改。

- `scripts/`：构建工具。存放用于编译和开发辅助的各类脚本。

> [!NOTE]
> 插件结构并没有强制规定，该模板仅作为参考，用于熟悉插件的开发流程，实际开发插件时可以根据自己的需求随意调整。

## 使用方法

- 点击页面右上角 `Use this template` 按钮创建你自己的插件仓库

- 克隆仓库到本地
  - `git clone <仓库地址>`

- 安装npm依赖
  - `pnpm i`

- 安装插件依赖
  - 该模板默认引用了 [qwqnt-plugin_settings](https://github.com/qwqnt-community/qwqnt-plugin-settings) 插件来实现 qwqnt 下的插件设置面板，需要将该插件及其依赖一同放到 `plugins` 文件夹下，如果你要制作的插件不需要设置面板，可以删除 `package.json` 中 `qwqnt.dependencies` 下的 `qwqnt-plugin-settings`
  - 在 [qwqnt-community](https://github.com/qwqnt-community/) 下还有更多可用的依赖插件，可以根据自己的需求安装

- 调试模式
  - `pnpm run dev`
  - 调试模式下插件会自动监听 `src/` 目录下的文件变化，并自动重新构建，但需要手动刷新页面才会生效，如果是涉及 `main` 的修改则需要重启才能生效

- 构建插件发布包
  - `pnpm run build`
