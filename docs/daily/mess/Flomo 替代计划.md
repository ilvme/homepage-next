---
title: Flomo 替代计划
description: 为期两个月的 Flomo 免费试用计划结束了，终究微薄的税后收入与不那么频繁的使用次数输给了98的年度订阅价格。于是我开始了 DIY 的探索…
outline: false
aside: false
date: 2022-10-07
category: Mess
tags:
  - 扯淡
  - 博客
  - 折腾
---

:::danger ⚠️ 注意：博客几经周折，本文章内容已经过时。
:::


<!--@include: ../../../.vitepress/template/PostCommon.md-->


两个月里我使用 Flomo 的场景只有一个：在个人微信发一条 Flomo，然后经由 Flomo 的服务功能将这条 Flomo 直接同步到 Notion 里指定的 Database。再将这个 Database 稍加润色处理，一个类似于「个人微说」的功能板块就完成了，借助于 Notion 的 Web 公开分享，可以使她（他）看到（开始意淫yy）。这个流程简单概括为：

我想说的一句话 —> 微信里的 Flomo 订阅号 —> Notion 的某个 Database —> 公开分享

然而 Flomo 的 Notion 同步是需要 PRO 会员订阅功能，一年98元。仔细想想，除了这个需求，我也实在没什么别的使用场景了，考虑再三便没有订阅。可是我又觉得这个功能挺符合我的精神需要，便有了 DIY 的想法。这时想起了我那运行着「青龙面板」的华为云服务器，折腾便开始了。

流程设计：

一句话 —> 个人微信公众号 —> 云服务器  —> 代码脚本 —> Notion API —> 指定的 Notion Database

说干就肝！

在实现过程中主要有以下注意点：

- 其一，微信公众号开发环境搭建，可参考我的另一篇文章 [微信公众号本地开发环境搭建 (notion.site)](https://www.notion.so/99b6da1786624d1c988bf3325bfe691e?pvs=21)
- 其二，代码实现。我是 Javaer，很自然选择了创建一个 SpringBoot 项目，在里面实现微信公众号的验证模块与 Notion API 封装模块。微信验证模块可参考上文「微信公众号本地开发环境搭建」一文；对于 Notion API 封装，Notion 官网描述的非常详细，且有主流编程语言的实现样例。我比较懒，直接就使用 Spring Boot 自带的 RestTemplate 模块对其进行封装。后续会考虑开放源代码
- 其三，如何部署。因为服务器上已经部署了 Docker，为了方便直接将项目打包成镜像部署运行。在实际测试中存在多次容器自己挂掉的情况，于是添加了 Docker 容器自启动配置（`docker update --restart=always 容器名称`）

不足之处：

- 个人微信公众号不能像「服务号」、或者普通微信好友那样直接出现在最左侧的「微信」页面，所以每次想发一句话时，需要先打开「订阅号消息」，在里面找出来自己的微信公众号再发文字。多了一步有点恶心，不过暂时可以忍受
- 个人微信公众号无法微信认证，如果想要 DIV 更多的功能基本不要想了，干。

后续：

发一张现在实现的效果图吧

<Image src="Flomo%20替代计划/WechatIMG7.jpeg" alt="微信公众号信息样例" width="200px" />

对了，我给 Notion 里的那个承载我垃圾之语的 Database 起了个很契合的名字「[Daily Words](/daily-words)」。