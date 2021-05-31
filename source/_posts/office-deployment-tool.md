---
title: 使用 ODT选择性安装 office
date: 2021-5-31 19:12
updated: 
toc: true
comments: true
thumbnail: https://i.jpg.dog/img/b56c76e83705c3595a40ffd8a15c8dbd.png
categories:
 - Other
tags:
 - office
 - tool
---

借助 Office 部署工具 (ODT)，可以将 Microsoft 365 应用版下载并部署到你的客户端计算机。使用 ODT，可以更好地控制 Office 安装。也就是说，可以定义要安装的产品和语言、更新这些产品的方式，以及是否向用户显示安装体验。<!--more-->

以上介绍摘自官方文档，简单来说就是通过这个工具允许用户自定义安装的 office 套件及其行为，**让你可以脱离使用官方安装程序带来的office全家桶，仅选择你需要的组件即可**。

## 下载ODT

从[ODT下载页面](https://go.microsoft.com/fwlink/p/?LinkID=626065)下载ODT工具。

下载文件后，运行自解压缩可执行文件，其中包含 Office 部署工具可执行文件 (setup.exe) 和一个示例配置文件 (configuration.xml)。

## 编辑配置文件

你可以参考[官方文档说明](https://docs.microsoft.com/zh-cn/deployoffice/office-deployment-tool-configuration-options#example-of-a-standard-configuration-file)自行编辑你的配置文件。

下面是一个简单示例，仅安装Word, Excel, 和PPT。你也可以通过这个配置文件排除已安装的Access, OneDrive等： 

```xml
<Configuration>
  <Add SourcePath="\\Server\Share" OfficeClientEdition="32" >
    <Product ID="O365ProPlusRetail">
      <Language ID="zh-cn" />
      <ExcludeApp ID="Access" />
      <ExcludeApp ID="Groove" />
      <ExcludeApp ID="Lync" />
      <ExcludeApp ID="OneDrive" />
      <ExcludeApp ID="OneNote" />
      <ExcludeApp ID="Outlook" />
      <ExcludeApp ID="Publisher" />
    </Product>
  </Add>
  <Updates Enabled="FALSE" />
</Configuration>
```

**不建议自行手动配置这些代码**，因为这样极大可能会导致种种错误（吃了教训），更推荐使用[office 自定义工具](https://config.office.com/deploymentsettings)这个网页来可视整个过程，在**产品与版本的应用项目中你可以选择需要排除的应用（关闭为排除）**，选择完你的配置后，点击导出`Office Open XML` 格式进行下载

![9e873d6547f513c0c4538bb3a90b43c4.png](https://i.jpg.dog/img/9e873d6547f513c0c4538bb3a90b43c4.png)
## 运行ODT

在之前解压得到的可执行文件目录下打开命令行（管理员身份），运行以下命令后便会根据配置文件进行下载安装。

- 如果未安装目标版本office:
```cmd
setup.exe /download config.xml
```

- 已安装但想通过配置文件删除和更新：
```cmd
setup.exe /configure config.xml
```

等待运行完成，这样你便可以拥有一个你想要的 office。

> 参考文档：
> [巧用官方 ODT 清爽安装 Office | 一日一技](https://sspai.com/post/55644)
> [Office 部署工具概述](https://docs.microsoft.com/zh-cn/deployoffice/overview-office-deployment-tool)
> [Office 部署工具的配置选项](https://docs.microsoft.com/zh-cn/deployoffice/office-deployment-tool-configuration-options#example-of-a-standard-configuration-file)