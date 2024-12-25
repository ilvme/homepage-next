---
title: Git 配置与规范
---

# Git Wiki

## 安装后的配置

### 全局设置用户名、邮箱
```bash
# 全局配置用户名、邮箱
git config --global user.name "kangJia"
git config --global user.email "ikangjia.cn@outlook.com"

## 查询 Git 所有配置
git config --list

## 检查 Git 的某一项配置
git config user.name
```

> 如果使用了 `--global` 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， 
> Git 都会使用那些信息。 因为配置将写入到 `~/.gitconfig` 文件里。
> 如果你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下
> 运行没有 `--global` 选项的命令来配置。

### 生成并配置 SSH 公钥
>  默认情况下，用户的 SSH 密钥存储在 ~/.ssh 目录。
>
```bash
# 先查看是否已有密钥
cd ~/.ssh
ls

# 生成 ssh 密钥与公钥
ssh-keygen

# 连续三次 Enter

# 查看生成的文件
ll ~/.ssh

# 查看公钥
cat ~/.ssh/id_rsa.pub

# 复制其内容，添加到 GitHub & Gitee & gitlab

# 验证 ssh
ssh -T git@github.com
```

## Git 使用规范

### 分支规范
- **`main`**：主分支（生产分支），这个分支为最近发布到生产环境的代码。不能在这个分支直接修改，只能从其他分支合并‌。另外所有在 `main` 分支的推送应该打标签（`tag`）做记录，方便追溯。
- **`release`**：发布分支，用于开发到一定阶段需要打包发布时，基于最新的 `develop` 分支创建。基于该分支进行打包、测试、修复 bug，完成后将其合并到 `develop` 分支
- **`hotfix`**：补丁分支，生产环境发现 bug 时，直接基于 `main` 分支创建一个 `hotfix` 分支用以修复 bug，完成后将该分支合并回 `main` 和 `develop` 分支‌，并删除该分支
- **`develop`**：主开发分支，不允许直接提交代码
- **`feature/xxx`**：新功能开发分支，基于 `develop` 分支创建，开发完成后合并到 `develop` 分支，随后删除该分支

:::details 分支使用主要流程描述：
当我们新建 git 仓库之后，默认会创建一个主分支也就是 `main` 分支，由于 `main` 分支是用于发布生产环境，
所有必须保证 `main` 上代码的稳定性，所以我们不能直接在 `main` 分支上修改提交。
我们要基于 main 分支创建一个 `develop` 分支，`develop` 分支用于保存开发好的相对稳定的功能，
`main` 分支和 `develop` 分支是仓库的常驻分支，一直会保留在仓库中。

当新的开发任务来了之后，就要编写代码了，不允许直接在 `develop` 分支上写代码，
要保证 `develop` 分支的相对稳定。所以这时就要基于 `develop` 分支创建一个临时的开发分支 `feature/xxx`，
然后在开发分支上编写代码，等功能开发完之后我们再把开发分支合并到 `develop` 上。

新功能合并到 `develop` 分支之后，我们想把新功能发布到生产环境，首先基于 `develop` 分支创建 `release` 分支，
然后在 `release` 分支进行打包测试，测试完成之后，把 `release` 分别合并到 `main` 分支和 `develop` 分支。

`release` 分支合并到 `main` 分支之后，在 `main` 分支上打标签用于发布。

我们把代码发布到了生产环境，用户在使用的时候给我们反馈了一个 bug，
这时我们需要基于 `main` 分支创建一个 `hotfix` 分支，用于修复 bug，
bug 修好之后，把 `hotfix` 分支分别合并到 `main` 分支和 `develop` 分支。
:::

### 提交规范
```bash
[init|feat|doc|style|fix|refactor|chore]: xxx
```

- `✨feat: 开发新功能`
- `💥fix: 修复 bug`
- `📕docs: 文档更新`
- `🎨style: 代码格式化，处理空格、换行等`
- `🌵refactor: 重构项目或局部代码，不涉及功能变化`
- `🛠️chore: 杂项，构建工具修改、依赖修改`

> 样例：`feat: 实现用户登录功能`

## Git 原理

## Git 命令

## 实战
### 场景一：乱改了工作区某文件，想直接丢弃工作区的修改

### 场景二：乱改了工作区某文件，且添加到了暂存区（add），像丢弃修改

### 场景三：改乱了工作区某文件，且已经提交到了（commit）本地版本库

### 场景四：改乱了工作区某文件，且已经提交到了远程库