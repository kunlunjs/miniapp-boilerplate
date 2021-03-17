# XXX 小程序

## 运行

使用`pnpm`管理项目依赖和脚本执行，所以需要先全局安装`pnpm`

```bash
npm install -g pnpm
```

### bash 添加 auto complete

```bash
npm completion >> ~/.bashrc
npm completion >> ~/.zshrc
```

### 依赖安装

```bash
pnpm i
```

### 开发运行

```bash
pnpm run dev:weapp
```

### 打包编译

```bash
pnpm run build:weapp
```

### 上传发布

```bash
pnpm run upload
```

## 环境区分

使用环境变量`API_URL`来做开发测试以及线上环境的 api 地址区分，可以为不同环境设置不同的环境变量，已添加脚本`up:test`和`up:prod`

## 错误告警监控

使用小程序自带的告警监控查看并[加入告警群](https://mp.weixin.qq.com/wxamp/wxaalarm/get_alarm_page)，可同时加入接口和业务告警群。
