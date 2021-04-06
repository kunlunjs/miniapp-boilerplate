# XXX 小程序

基于`Taro`的多端小程序开发项目模板。

## 对比其它开发框架

- `uni-app` Vue 技术栈，与我们主要技术栈不同，但生态相对丰富很多
- `Remax` 做跨多端应用上会稍微复杂点，如果只是微信小程序，也可以使用。其它参见`https://remaxjs.org/faq#%E4%B8%8E-taro-%E7%9A%84%E5%8C%BA%E5%88%AB%EF%BC%9F`

## Get started

1. 安装

```bash
# 如果没有全局安装 pnpm 的话
npm install -g pnpm
pnpm i
```

2. 开发

```bash
# 默认启动微信小程序开发环境
# 其它环境请参考 package.json 中的 scripts 脚本
pnpm dev
```

然后使用开发工具打开`dist`目录即可。

3. 调试

使用扫码调试时可能遇到包体积过大而无法预览的问题，这时可以添加环境变量`NODE_ENV=production`，例如`NODE_ENV=production pnpm dev`

4. 打包编译

```bash
# 默认打包微信小程序
# 其它环境请参考 package.json 中的 scripts 脚本
pnpm build
```

5. 上传发布

```bash
# 暂时只支持微信小程序上传
pnpm upload
```

## bash 添加 auto complete

```bash
npm completion >> ~/.bashrc
npm completion >> ~/.zshrc
```

## 环境区分

使用环境变量`API_URL`来做开发测试以及线上环境的 api 地址区分，可以为不同环境设置不同的环境变量，已添加脚本`up:test`和`up:prod`

## 错误告警监控

使用小程序自带的告警监控查看并[加入告警群](https://mp.weixin.qq.com/wxamp/wxaalarm/get_alarm_page)，可同时加入接口和业务告警群。

## 小程序开发事项

- [x] 支持多页签。如果不需要，可以删除`src/assets/tabbar`目录，并移除`app.config.ts`中`tabBar`的配置
- [x] API 请求封装。基于`y2s`实现，需要先在根目录的`.y2src.js`文件中配置好`yapi`的地址和`token`，然后执行`pnpm update:api`（更新同理）拉取所有`api`信息，调用时使用`services['xxx']`来使用。但是`src/services/index.ts`中`TODO`处需要根据后端返回的数据结构做对应的修改。
- [x] 用户信息共享。修改`src/app.tsx`中所有`TODO`为实际业务接口，然后页面使用处使用`useUser`的`hook`来获取和修改用户信息。如果业务不需要保存用户信息，可以删除`src/app.tsx`中用户相关代码，删除`src/hooks/useUser.ts`和`src/types/user.ts`文件。
- [x] 集成`TaroUI`。如果不需要使用，直接从代码中移除相关引用即可。
- [ ] 新增页面。在`src/pages`目录中新建一个目录，复制`src/pages/components/index.config.ts`文件，新建页面的`tsx`（已添加项目级`snippets`，键入`taro`开始）和`less`文件，三者文件名保持一致，然后修改`xxx.config.ts`中的标题。

  最后在`src/app.config.ts`的`pages`添加相应的页面路径，如果是`tabbar`页面，还需要在`tabbar.list`中添加。

  建议一个目录下不要有超过 2 个子页面，如果子页面较多，建议每个子页面一个文件夹封装。

- [ ] 新增组件。在`src/components`目录添加，一个组件一个目录，不需要`xxx.config.ts`文件，其它同页面新增一致。
- [ ] 混合开发，在`Taro`里使用原生组件，[参考](http://taro-docs.jd.com/taro/docs/mini-third-party/)
- [ ] 更多微信小程序开发文档，请参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
