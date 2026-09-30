# Raven / 研究手记

完整可编辑的 Hexo 个人博客。沿用已确认的 Constructivist Interface Language V2：印刷蓝、纸色、黑色、大字、斜向构成与圆形入口。正文采用稳定的水平阅读布局。

## 第一次打开

安装 Node.js 20 或更高版本。解压后，在本文件所在文件夹打开终端：

```bash
npm ci
npm run dev
```

按终端提示打开本地网址，通常为 http://localhost:4000 。保存修改后刷新浏览器。停止预览按 Ctrl+C。

## 最常用的编辑位置

| 想修改什么 | 文件 |
| --- | --- |
| 首页介绍、关于页、学校、地点、邮箱 | `source/_data/profile.yml` |
| 三个项目的名称、链接、简介 | `source/_data/projects.yml` |
| 博客标题、正式域名、时区 | `_config.yml` |
| 导航、默认配色与动效开关 | `themes/construct/_config.yml` |
| 文章 | `source/_posts/*.md` |
| 页面布局 | `themes/construct/layout/*.ejs` |
| 主样式 | `themes/construct/source/css/blog.css` |

YAML 使用空格缩进，不要用 Tab。冒号后保留一个空格。项目简介当前留空，避免替你编造项目定位。

## 写一篇文章

```bash
npm run new -- "第一篇研究手记"
```

在 `source/_posts/` 打开新建的 Markdown 文件。顶部 `title` 是标题，`date` 是发布时间，`categories` 是分类，`tags` 是标签，`summary` 是列表摘要。正文从第二条 `---` 后开始。

```yaml
title: 第一篇研究手记
date: 2026-09-30 20:00:00
categories:
  - 研究手记
tags:
  - 智能体
summary: 用一两句话概括这篇记录。
```

使用 `## 标题` 创建章节，会自动进入文章侧边目录。普通文字、链接、代码块、列表、表格都支持。避免直接粘贴不可信的 HTML 或脚本。

预置的 `start-here.md` 是显著标注的可删除排版示例，不是真实研究成果。删掉它后，先执行 `npm run clean` 再构建。

## 草稿与图片

创建草稿：`npx hexo new draft "待写的文章"`。草稿在 `source/_drafts/`，默认不发布。预览草稿：`npm run dev -- --draft`；发布草稿：`npx hexo publish "待写的文章"`。

图片可放入 `source/images/`，正文写 `![说明](/images/图片名.png)`。若以后部署到子路径，请使用 Hexo 的资源标签或相对文章资源地址，避免图片根路径错误。

## 构建与检查

```bash
npm run clean
npm run build
npm run check
```

`public/` 是生成后的静态网站。源码包已带一份生成结果，但日常请编辑 `source/` 和主题文件，不要直接改 `public/`。

## GitHub Pages 发布

正式网址：https://raven1119.github.io/

源码位于本仓库的 `main` 分支。提交到 `main` 后，GitHub Actions 会安装依赖、生成 Hexo 页面、检查内部链接并发布 `public/`。无需手动提交生成文件。

第一次启用：仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。如首次部署已失败，在 **Actions → Publish Hexo to GitHub Pages** 打开最新运行并点击 **Re-run all jobs**。

以后可直接在 GitHub 编辑 `source/_posts/` 中的 Markdown 文章，或修改 `source/_data/profile.yml`、`source/_data/projects.yml`，提交后等待 Actions 变绿即可。暂不发布的文章请保存在本地草稿，公开仓库中的文件即使未生成网页，也仍可公开访问。

没有后台数据库。主题与动效偏好保存在当前浏览器；文章和资料以源码文件为准。

## 配色与动效

页脚可切换印刷蓝、雨蚀灰、夜间。默认值在主题配置中修改。配色来自冻结原型：`#eeece3 / #191c1b / #2045bf`。不使用较早讨论中的近似色值。

动效仅复用原包 V9 的 RB-35 内容进场与 RB-48 短标题拆分，保留原时序与缓动。系统“减少动态效果”优先，页脚可关闭动效；正文不会逐字动画。

## 验证范围

见 `docs/VALIDATION.md`。浏览器环境阻挡了本次视觉验收，因此未附实际网站截图，不能视作已完成跨设备视觉测试。

## 许可

这是完整博客应用，而非独立动效组件库。原有版权与附加许可保存在 `licenses/THIRD_PARTY_NOTICES.txt` 和 `licenses/PACKAGE_SCOPE.md`，应随本应用保留。未分发第三方字体或馆藏图片。
