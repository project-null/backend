# QbVIP后端程序


## 开发环境配置

1. 项目使用nodejs开发，koa框架。
2. 数据库使用的是mongodb.

#### 配置文件
1. src/config.json提供了程序运行时候的一些配置。

2. 依赖包安装
```bash
npm i 
npm start
```
3. 浏览器打开地址http://localhost:3000/swagger 进行API的查看。


## 试用环境

1. git clone 本代码到安装了nodejs的服务器上。
2. 安装好`mongodb`
3. 

```bash
# 让node在后台运行
sudo npm install forever -g

curl -kL https://github.com/project-null/ui/releases/download/0.9.1-alpha/ui.0.9.1-alpha.tar.gz -o static/ui.tar.gz

mkdir -p static/ui
tar -zxvf static/ui.tar.gz -C static/ui

forever start -a -l forever.log -o out.log -e err.log --minUptime 1000ms --spinSleepTime 1000ms index.js
```
