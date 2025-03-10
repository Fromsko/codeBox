# codeBox

> 是一款采用用于对接本地 Ollama 进行快速聊天的程序
>
> 开箱即用，自动识别 Ollama 中的模型

[![Build and Release Wails App](https://github.com/Fromsko/codeBox/actions/workflows/main.yaml/badge.svg?branch=dev)](https://github.com/Fromsko/codeBox/actions/workflows/main.yaml)

## 📑 功能模块

- 实时聊天
- 截屏记录
- 复制消息
- 历史记录
- 访问控制

## 🚀 安装

> 推荐直接下载 release 文件构建的包
>
> 配置 Golang + NodeJs
>
> 推荐 [nvm-windows](https://github.com/coreybutler/nvm-windows)

<details>
<summary>Golang 验证</summary>

```shell
# 验证安装
go version

# 设置七牛云代理
go env -w GOPROXY=https://goproxy.cn,direct

# 验证代理设置
go env | grep GOPROXY

# 设置Go Module支持
go env -w GO111MODULE=on

# 验证Go Module设置
go env | grep GO111MODULE
```

</details>

<details>
<summary>Nodejs 验证</summary>

```shell
# 验证安装
node -v

# 设置淘宝代理
npm config set registry https://registry.npm.taobao.org
```

</details>

### 👨‍💻 安装 wails

[官方文档](https://wails.io/zh-Hans/docs/gettingstarted/installation/)

```shell
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

### 构建项目

1. 检查缺少什么环境

   ```shell
   wails doctor
   ```

2. **构建**

   - 基础

     ```shell
     wails build
     ```

   - win 安装包 + 压缩

     ```shell
     wails build -nsis -upx
     ```

3. **开发**

   ```shell
   wails dev
   ```

## 界面展示

- 主页面
    <div align="center">
    <img src="assets/resources/chat-page.png" alt="" width="80%">
    </div>

- 演示
    <div align="center">
    <img src="assets/resources/show.gif" alt="" width="80%">
    </div>

## 👨‍🔬 鸣谢

- [wails](https://wails.io/)
- [vue.js](https://cn.vuejs.org/)
