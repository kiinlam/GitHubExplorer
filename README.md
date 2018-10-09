# GitHubExplorer
Webapp for exploring GitHub

## :construction: Still Working!!!

目前该项目仍处于开发中，已具备基础功能，还有很多功能等待添加，如有意见或建议，欢迎提issue。

## :page_facing_up: 说明

- 纯前端页面，无服务端，数据由 `GitHub GraphQL API v4` 提供
- 采用webpack简单配置来构建页面
- 使用 `GitHub token` 进行登录，这是 `GitHub GraphQL API v4` 所要求的
- `GitHub token` 只保存在浏览器本地存储localStorage
- 查看GitHub用户信息
- 查看GitHub用户下的仓库、星标、关注、粉丝信息
- 收藏用户（数据本地存储未完成）

## 创建`GitHub token`的简单步骤

1. 打开你的GitHub主页，右上角头像下拉菜单选择`Settings`
2. 在左边栏选择`Developer settings`
3. 在左边栏选择`Personal access tokens`
4. 右上方点击`Generate new token`
5. 在描述栏中填写能帮助你识别该token的信息
6. 在下方勾选授权项目
7. 点击最底下的`Generate token`
8. 复制生成的token到剪贴板，粘贴到登录页面的输入框

## :art: 技术

- Vue.js
- GraphQL
- webpack

## :heavy_plus_sign: TODO

- [x] 登录界面
- [x] 展示登录用户信息
- [x] 增加选择类别功能(repos, stars, followers, following)
- [x] 查看项目信息
- [x] 查看用户信息
- [ ] 收藏用户并存储数据到本地
- [ ] 更换本地存储库
