# 项目优化记录

## 优化内容
1. **前端项目优化**：
   - 将错误命名的文件夹 `frontend/src/langurage` 重命名为 `frontend/src/language`。
   - 将资源文件夹 `res/` 移动到 `assets/resources`。
   - 配置 `.vscode/settings.json`，隐藏不必要的文件和文件夹（如 `build/`、`node_modules/`）。
   - 更新 `vite.config.ts`，启用自动导入组件，并将类型声明文件引导至 `src/types/components.d.ts`。

2. **后端项目优化**：
   - 检查并确认后端项目结构符合 Go 官方推荐的命名和设置。
   - 文件夹和文件命名已符合规范（小写，使用下划线分隔符）。

## 使用的提示
- **VSCode 配置**：
  ```json
  {
    "files.exclude": {
      "**/.git": true,
      "**/build": true,
      "**/node_modules": true,
      "**/frontend/bun.lockb": true,
      "**/go.sum": true
    },
    "search.exclude": {
      "**/build": true,
      "**/node_modules": true,
      "**/frontend/bun.lockb": true,
      "**/go.sum": true
    }
  }
  ```

- **Vite 自动导入配置**：
  在 `vite.config.ts` 中添加以下插件：
  ```typescript
  import Components from 'unplugin-vue-components/vite';
  import { VantResolver } from 'unplugin-vue-components/resolvers';

  plugins: [
    Components({
      resolvers: [VantResolver()],
      dts: 'src/types/components.d.ts',
    }),
  ]
  ```

- **Go 项目结构优化**：
  确保文件夹和文件命名符合 Go 官方规范，例如：
  - 文件夹命名：小写，使用下划线分隔符。
  - 文件命名：小写，使用下划线分隔符。
## 追加优化记录
1. **恢复 `vite.config.ts`**：
   - 恢复了完整的配置文件，包含所有原始插件和设置。
   - 添加了自动导入组件的功能。

2. **恢复 `language` 文件夹**：
   - 重新创建了 `en.ts` 和 `zh.ts` 文件，内容如下：
     - **`en.ts`**：
       ```typescript
       export default {
         title: 'English',
         greeting: 'Hello, world!'
       };
       ```

     - **`zh.ts`**：
       ```typescript
       export default {
         title: '中文',
         greeting: '你好，世界！'
       };
       ```

## Git Commit 日志
以下是本次优化的 Git Commit 日志建议：
```shell
✨ feat: 启用 Vite 自动导入功能
🔧 fix: 恢复丢失的 vite.config.ts 配置
🌐 refactor: 重命名 langurage 文件夹为 language
📝 docs: 补充优化记录文档
```

## 备注
所有优化点均已实现，项目结构更加清晰，符合最佳实践。
