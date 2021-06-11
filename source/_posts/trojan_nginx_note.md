---
title: Trojan + Nginx 搭建代理手记
date: 2021-6-11 21:56
updated: 
toc: true
comments: true
thumbnail: https://i.jpg.dog/img/95014d885e5b9277a4b5ddcc3c596502.jpg
categories:
 - Other
 - BackEnd
tags:
 - trojan
 - nginx
---

Trojan 是一种无法识别的可绕过GFW的机制。配合 Nginx可以做到伪装域名流量，降低被GFW检测的风险。本手记面向已拥有一定经验的操作人员。<!-- more -->

部署环境：
- 腾讯云 CentOS 8.2

准备工作：
- 已解析到服务器的域名
- 绑定到域名的SSL证书

## 方案分析

Trojan 默认监控443端口（伪装https），其能识别访问该端口的正常流量和代理流量，将正常流量转发到Nginx的80端口处理，代理流量走代理。

Nginx 只负责80端口，网页托管在该端口。

![29190b3d01994938647c5cfab418d6f4.png](https://i.jpg.dog/img/29190b3d01994938647c5cfab418d6f4.png)

缺点：网站https访问会经过一次转发，访问速度可能下降

优点：便于部署，技术力低，时间成本低，代理速度更快

## 配置文件

**`/etc/nginx/conf.d/default.conf`**

```conf
server {
    listen 0.0.0.0:80;
    server_name domian;
    location / {
         root   /usr/share/www;
         index  index.html;
    }
}
```

**`/usr/local/etc/trojan/config.json`（部分）**
```json
{
  "password": [
        "password"
    ],
  ...
  "ssl": {
        "cert": "/pathTo/domian.crt",
        "key": "/pathTo/domian.key",
        ...
  }
  ...
}
```

## 流程手记

### Trojan安装

trojan官方提供的一键部署脚本。
```
bash -c "$(curl -fsSL https://raw.githubusercontent.com/trojan-gfw/trojan-quickstart/master/trojan-quickstart.sh)"
```

### Trojan相关命令

查看trojan版本
```
trojan -v
```

查看trojan运行状态
```
ss -lp | grep trojan
```

操作trojan服务
```
systemctl stop trojan
systemctl start trojan
systemctl restart trojan
```
### Nginx安装

CentOS 8 預設 AppStream 軟體倉庫 (repo，repository) 提供的 NGINX 版本為 1.14.1，本章透過 NGINX 官方軟體倉庫，即可使用 yum/dnf 指令來安裝 NGINX 穩定或最新版本，参考[nginx官方文档](http://nginx.org/en/linux_packages.html#RHEL-CentOS)。

安裝能夠選擇指定 yum 的套件：
```
yum install yum-utils -y
```

设置yum安装nginx的仓库源
```
vim /etc/yum.repos.d/nginx.repo
```
```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```


通过以下命令，修改`--enable`参数更改需要安装的nginx版本
```
yum-config-manager --enable nginx-mainline
```
- `nginx-stable`: 稳定版
- `nginx-mainline`: 最新版

安装nginx
```
yum install nginx
```

查看nginx版本信息
```
yum info nginx
```
```
Last metadata expiration check: 0:00:48 ago on Fri 11 Jun 2021 04:08:38 PM CST.
Installed Packages
Name         : nginx
Epoch        : 1
Version      : 1.21.0
Release      : 1.el8.ngx
Architecture : x86_64
Size         : 2.8 M
Source       : nginx-1.21.0-1.el8.ngx.src.rpm
Repository   : @System
From repo    : nginx-mainline
Summary      : High performance web server
URL          : https://nginx.org/
License      : 2-clause BSD-like license
Description  : nginx [engine x] is an HTTP and reverse proxy server, as well as
             : a mail proxy server.
```
查看nginx版本
```
nginx -v
```
```
nginx version: nginx/1.21.0
```

### Nginx命令参数

优雅退出nginx服务
```
nginx -s quit
```

退出nginx服务
```
nginx -s stop
```

重启nginx服务
```
nginx -s reload
```

检验配置文件语法
```
nginx -t
```

载入配置文件
```
nginx -c /etc/nginx/nginx.conf
```