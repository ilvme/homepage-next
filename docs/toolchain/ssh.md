---
title: SSH
---

# {{$frontmatter.title}}

SSH（Secure Shell）是一种网络协议，用于加密两台计算机之间的通信，保证远程登录和远程通信的安全，任何网络服务都可以用这个协议来加密。

**架构**

SSH 是 CS 架构。`OpenSSH` 服务端实现是 `sshd`，是一个守护进程。提供了对远程连接的处理，包括公共密钥认证、密钥交换、对称密钥加密等。`OpenSSH` 客户端的实现为 `ssh`。包含 `ssh`、`scp`、`sftp`等二进制应用程序。

## 客户端 ssh

`OpenSSH` 的客户端是二进制程序 `ssh`。它在 Linux 系统位置是`/usr/bin/ssh`，在 Windows 位置是`C:\\Windows\\System32\\OpenSSH`。 `ssh -V` 可查看本机的安装版本。

ssh 最常见的用途就是登录服务器，这要求服务器安装并正在运行 SSH 服务器软件。登录方式主要有密码登录、密钥登陆和证书登录（这里证书登录不做介绍）。

### 密码登录

SSH 默认采用密码登录。

```bash
# -p 指定端口，默认连接服务器的22端口，
ssh [-p port] user@hostname

# -l 将用户名与主机分开
ssh -l username host
```

### 密钥登录

密码登录简单密码不安全，复杂密码不易记，每次手动输入麻烦。密钥登录是比密码登录更好的解决方案。

SSH 密钥登录采用非对称加密（公钥和私钥），用户通过自己的密钥登录。其中，私钥必须私密保存，公钥可以对外发送。一个私钥有且仅有一个对应公钥，反之亦然。

### 密钥登录流程

1. 客户端通过`ssh-keygen`生成自己的公钥和私钥；
2. 手动将客户端的公钥放入远程服务器的指定位置；
3. 客户端向服务器发起 SSH 登录请求；
4. 服务器收到用户 SSH 登录请求，发送一些随机数据给用户，要求用户证明自己的身份；
5. 客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器；
6. 服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录。

### 生成密钥

```bash
# -t 指定密钥的加密算法，一般选择 DSA 或 RSA，默认使用 RSA 算法
ssh-keygen -t dsa
```

执行上面命令，`ssh-keygen` 会要求用户回答一些问题：

第一个问题，询问密钥保存的文件名，默认是`~/.ssh/id_dsa`文件，这个是私钥的文件名，对应的公钥文件`~/.ssh/id_dsa.pub`是自动生成的。密钥一般放在 `~/.ssh` 目录下。

如果选择`rsa`算法，生成的密钥文件默认就会是`~/.ssh/id_rsa`（私钥）和`~/.ssh/id_rsa.pub`（公钥）。

第二个问题，询问是否要为私钥文件设定密码保护。这样的话，即使入侵者拿到私钥，还是需要破解密码。如果为了方便，不想设定密码保护，可以直接按回车键，密码就会为空。

最后，就会生成私钥和公钥，屏幕上还会给出公钥的指纹，以及当前的用户名和主机名作为注释，用来识别密钥的来源。

公钥文件和私钥文件都是文本文件，可以用文本编辑器看一下它们的内容。

```bash
# 列出用户所有的公钥
ls -l ~/.ssh/id_*.pub

# 生成密钥以后，可以修改它们的权限，防止其他人读取
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa.pub
```

### 上传公钥

生成密钥以后，公钥必须上传到服务器，才能使用公钥登录。

**（1）手动上传公钥**

公钥保存在服务器的`~/.ssh/authorized_keys`文件。你要以哪个用户的身份登录到服务器，密钥就必须保存在该用户主目录的`~/.ssh/authorized_keys`文件。只要把公钥添加到这个文件之中，就相当于公钥上传到服务器了。每个公钥占据一行。如果文件不存在，可以手动创建。

**（2）自动上传公钥**

`ssh-copy-id`命令可以自动将公钥拷贝到远程服务器的`~/.ssh/authorized_keys`文件。如果`~/.ssh/authorized_keys`文件不存在，会自动创建。

```bash
# 在本地执行下面命令，把本地的公钥拷贝到服务器
ssh-copy-id -i key_file user@host

# -i 指定公钥文件。可以不指定路径和 .pub 后缀名，ssh-copy-id 会自动在 ~/.ssh 目录里面寻找
# user 要登陆的用户名。如果省略，默认为本机当前用户名
# host 服务器地址
```

`ssh-copy-id`会采用密码登录，系统会提示输入远程服务器的密码。

> ssh-copy-id是直接将公钥添加到authorized_keys文件的末尾。如果authorized_keys文件的末尾不是一个换行符，会导致新的公钥添加到前一个公钥的末尾，两个公钥连在一起，使得它们都无法生效。所以，如果authorized_keys文件已经存在，使用ssh-copy-id命令之前，务必保证authorized_keys文件的末尾是换行符。
>

### 关闭密码登录

启用密钥登录之后，可以选择关闭密码登录。打开服务器 sshd 的配置文件 `/etc/ssh/sshd_config`。

```bash
PasswordAuthentication no
```

修改配置文件以后，不要忘了重新启动 sshd，否则不会生效。

### 执行远程命令

第一种：承接上文，在 SSH 登录成功后，用户就进入了远程主机的命令行环境，这时就可以输入命令了。

第二种：执行远程命令的方法，是将命令直接写在`ssh`命令的后面。

```bash
# 直接执行远程命令
ssh username@hostname command

# 例如
ssh root@192.168.45.134 cat /etc/hosts
```

采用这种语法执行命令时，ssh 客户端不会提供互动式的 Shell 环境，而是直接将远程命令的执行结果输出在命令行。但是，有些命令需要互动式的 Shell 环境，这时就要使用`-t`参数。

```bash
# 报错
ssh root@192.168.45.134 vi /home/hello/a.md

# 不报错
ssh -t root@192.168.45.134 vi /home/hello/a.md
```

### 客户端配置文件

SSH 客户端的全局配置文件是`/etc/ssh/ssh_config`，用户个人的配置文件在`~/.ssh/config`，优先级高于全局配置文件。

## 服务端 sshd

一般位于 `/usr/sbin/sshd` ，sshd 的配置文件在`/etc/ssh`目录，主配置文件是`sshd_config`，此外还有一些安装时生成的密钥。

```bash
# 启动
sshd

# 启/停
systemctl start/stop sshd.service

# 重启
systemctl restart sshd.service

# 开机启动
systemctl enable sshd.service
```

## scp

`scp`是 SSH 提供的一个客户端程序，用来在两台主机之间加密传送文件（即复制文件）。
它是 secure copy 的缩写，相当于`cp`命令 + SSH。
它的底层是 SSH 协议，默认端口是22，相当于先使用`ssh`命令登录远程主机，然后再执行拷贝操作。

`scp`主要用于以下三种复制操作。

- 本地复制到远程。
- 远程复制到本地。
- 两个远程系统之间的复制。

**使用`scp`传输数据时，文件和密码都是加密的，不会泄漏敏感信息。**

> 注意，如果所要复制的文件，在目标位置已经存在同名文件，scp会在没有警告的情况下覆盖同名文件。
>

```bash
# 主机与文件之间要使用冒号（`:`）分隔
# 用户名和主机名可以省略。用户名的默认值是本机的当前用户名，主机名默认为当前主机
scp user1@host1:a.txt user2@host2:aa.txt

# 本地文件复制到远程。将本地的 a.txt 文件 拷贝到远程 192.168.45.135 的家目录下
scp a.txt root@192.168.45.135:/home

# 远程文件复制到本地。将远程 192.168.45.135 家目录下的 a.txt 拷贝到本地的 home 目录
scp root@192.168.45.135:/home/a.txt /home

# 两个远程系统之间的复制
scp user1@host1.com:/home/a.txt user2@host2.com:/home

# 一些常用配置项
-C 是否在传输时压缩文件
-l 限制传输数据的带宽速率，单位是 Kbit/sec
-p 保留修改时间（modification time）、访问时间（access time）、文件状态（mode）等原始文件的信息
-P 指定远程主机的 SSH 端口。默认端口22
-q 关闭显示拷贝的进度条
-r 是否以递归方式复制目录
-v 显示详细的输出
```


## sftp
sftp是 SSH 提供的一个客户端应用程序，主要用来安全地访问 FTP。

```bash
sftp username@hostname

# 执行下面命令，会要求输入密码。密码验证成功后，就会出现提示符 sftp>
sftp root@192.168.45.134
root@192.168.45.134's password: 在这里输入密码
Connected to 192.168.45.134.
sftp>

# 可以输入各种 FTP 命令了，跟传统的 FTP 用法完全一样
ls -al：                    默认列出当前目录。
cd：                        从当前目录改到指定目录。
mkdir directory：           创建一个远程目录。
rmdir path：                删除一个远程目录。
put localfile [remotefile]：本地文件传输到远程主机。
get remotefile [localfile]：远程文件传输到本地。
help：                      显示帮助信息。
bye/quit/exit：             退出 sftp。
```