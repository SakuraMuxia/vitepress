# gitlab

## 什么是gitlab

Gitlab 是一个开源分布式的版本控制系统。 Ruby语言开发完成。Gitlab 主要实现的功能

- 管理项目源代码
- 对源代码进行版本控制。远程仓库 git本地仓库

Gitlab 的优势:

- 1.开免费搭建简单、维护成本较低、适合中小型公司
- 2.权限管理，能实现代码对部分人可见，确保项目的安全性。
- 3.离线同步，保证我们不在实时依赖网络环境进行代码提交。

## gitlab与github区别

1.相同点: 两者都是提供代码托管服务，在很大程度上GitLab 是仿照 GitHub 来做的

2.不同点: github 创建私有仓库收费、gitlab 创建私有仓库免费

从安全方面来看，公司不希望员工获取到全部的代码，这个时候 GitLab 是最佳的选择但对于开源项目而言，

gitHub 依然是代码托管的首选平台

## gitlab服务组成

![image-20240112203959968](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112203959968.png)

- nginx，作为gitlab的proxy代理，处理http/https以及静态资源访问请求。
- gitlab-workhorse，用于处理文件上传和下载。
- gitlab-shell，用于处理git clone、git pull、git push。
- Logrotate，用于处理日志的切割和打包等操作。
- Postgresql，用于保存所有的gitlab数据相关信息。
- Redis，用于缓存数据库的信息，加快前台访问速度，以及交互读写.

## gitlab安装

### 安装依赖

1.关闭防火墙

```bash
[root@gitlab ~]# setenforce 0
[root@gitlab ~]# systemctl stop firewalld && systemctl disable firewalld
```

2.安装 gitlab 所需依赖软件

```bash
[root@gitlab ~]# yum instal1 -y curl openssh-server postfix wget
```

### 安装gitlab组件

```shell
---使用rpm方式安装---
1.下载 Gitlab 
[root@gitlab ~]# wget https://mirror,tuna,tsinghua,edu,cn/gitlab-ce/yum/e17/gitlab-ce-12.3.9-ce.0.e17.x86_64.rpm

2.使用 yum 安装 gitlab
[root@gitlab ~]# yum localinstal1 gitlab-ce-12.3.9-ce.0.e7.x86_64.rpm -y

从清华大学源下载rpm源码包

```

### 配置gitlab

```bash
配置 Gitlab 域名
后期通过域名访问 gitlab 服务
vim /etc/gitlab/gitlab.rb
#1.Gitlab url
external_url "http://gitlab.odxu.net"
external_url 'https://yuluochenxiao.top:12445'

配置 Gitlab 邮箱
1.在账号注册时，需要使用邮件验证
2.后期修改密码时，需要通过邮件修改
#2.Emai1 Settings
gitlab_rails['gitlab_emai7_enabled'] = true
gitlab_rails['gitlab_emai1_from'] = "572891887@qq.com" # 发件邮箱
gitlab_rails['gitlab_email_display_name'] = "oldxu-GitLab" # 发件人显示名称
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.qq.com"
gitlab_rai1s['smtp_port'] = 465
gitlab_rails['smtp_user_name] = "572891887@qq.com" #发件人邮箱账户
gitlab_rails['smtp_password'] = "nvguuktrefkmbcbe" #发件人邮箱客户端授权码
gitlab_rais['smtp_domain'] = "qq.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rai1s['smtp_enabe_startt1s_auto'] = true
gitlab_rails['smtp_tis'] = true
```

### 关闭gitlab组件

```shell
由于 Gitlab 核心功能是代码托管，所以有些额外的组件比较浪费资源，所以可以考虑关闭。
#将不需要使用的组件都设定为false
1474 prometheus['enable'] = false
1475 prometheus['monitor_kubernetes'] = false
1542 alertmanager['enable'] = false
1564 node_exporter['enable'] = false
1583 redis_exporter['enable'] = false
1601 postgres_exporter['enable'] = false
1630 gitlab_exporter['enable'] = false
1643 prometheus_monitoring['enable'] = false
1650 grafana['enable'] = fase
```

### 初始化gitlab组件

```bash
gitlab-ctl reconfigure

初始化 Gitlab 组件
第一次需要初始化 gitlab 服务，后续如果对 gitlab 配置文件进行修改，也需要执行初始化进行重新配置
gitlab-ctl reconfigure
gitlab-ctl status
gitlab-ctl stop

```

### gitlab汉化

```shell
在gitlab web界面设置 中文 汉化只是一半
汉化 Gitlab 组件


使用 git 命令下载汉化补丁包 gitlab中文汉化传送门 相同版本的汉化包
wget https://gitlab.com/xhang/gitlab/-/archive/v12.3.0-zh/gitlab-v12.3.0-zh.zip
tar xf gitlab-12-0-stable-zh.tar.gz


2.停止 gitlab，进行中文汉化。
gitlab-ctl stop
cp -r gitlab-v12.3.0-zh/* /opt/gitlab/embedded/service/gitlab-rails/


3.重启 gitlab，验证汉化结果
#重新配置gitlab服务
gitlab-ctl reconfigure
#重启gitlab服务
gitlab-ctl restart


4.点击settings--> Preferences-->Localization-->选择简体中文，完成整体汉化
```

### 配置host文件

```bash
vim 
```

## gitlab用户与组

### 用户与组及仓库的关系

Gitlab 中的用户、用户组、项目仓库之间的关系是什么样的?

![image-20240112210227004](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112210227004.png)

注意

如果使用user创建一个仓库，那么这个用户就是这个仓库的 owner

如果使用group创建一个仓库，那这个组下面添加的所有用户就是这个仓库的owner

**案例1**

```bash
主程序员角色:能够对 master、dev 分支进行操作
测试开发者角色:能对非 master 分支进行操作
```

```bash
Git 全局设置
git config --global user,name "a"
git config --global user,ema1l “a@qq.com"
创建一个新仓库
git clone http://gitlab .oldxu .net/dev/alipay.git
cd alipay
touch README .md
git add README .md
git commit -m "add README"
git push -u origin master
推送现有文件夹
cd existing folder
git init
git remote add origin http://gitlab.oldxu.net/dev/alipay.git
git add .
git commit -m "Initial commit"
git push u origin master
推送现有的 Git 仓库
cd existing repo
git remote rename origin old-origin
git remote add origin http://gitlab.oldxu.net/dev/alipay.git
git push -u origin --all
git push -u origin --tags
```

**案例2**

```shell
案例3: 模拟日常开发者如何更新代码至master分支
1.首先创建一个dev分支，然后编写代码提交至远程gitlab
2.登陆 gitlab 服务端，像主程序员申请合并请求，请求dev合并master
3.登陆主程序员账户查看合并信息，并确认合并操作
4.登陆gitlab查看该项目是否已经是master与dev分支合并后的效果
```

开发者角色点击创建合并请求

![image-20240112212430365](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112212430365.png)

开发者角色添加描述信息

![image-20240112212536988](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112212536988.png)

开发者角色把dev分支的代码合并到master分支上

![image-20240112212647481](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112212647481.png)

主程序员角色同意合并

![image-20240112212827778](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112212827778.png)

## gitlab日常操作

如何关联远程仓库

```bash
root@A-devops ~]# mkdir demo && cd demo/
root@A-devops demo]# git init
root@A-devops demo]# git config --global user.name "xuliangwei"
root@A-devops demo]# git config --global user.email "xuliangwei@foxmai7.com"
root@A-devops demo]# git remote add origin git@gitlab.oldbgx.com:shoping/demo.git
root@A-devops demo]# echo "Gitlab web"> README.md
root@A-devops demo]# git add .
root@A-devops demo]# git commit -m "init commit"
root@A-devops demo]# git push -u origin master

```

如果出现输入密码提示，则说明该主机与gitlab服务器没有配置免秘钥。那么需要在当前主机上执行`ssh-keygen`生成秘钥，然后将其公钥放置gitlab服务器对应的用户下。

### linux编辑host文件

```bash
# 编辑hosts配置文件
vim /etc/hosts
10.0.0.110 gitlab.oldxu.net
```

### 新成员加入操作流程

如果有新成员需要加入该项目该怎么办

- 1.先给新成员创建用户
- 2.将成员加入组，此时该用户就能看到对应的项目
- 3.使用http方式，输入用户名与密码，测试能否获取项目代码
- 4.使用ssh方式，添加对应公钥信息，测试能否获取项目代码

### gitlab备份

```bash
1.修改默认存放备份站点目录，然后进行重新加载配置文件
[root@gitlab-ce ~]# vim /etc/gitlab/gitlab.rb

gitlab_rails['backup_path'] = "/data/gitlab/backups" #备份路径变更
gitlab_rails['backup archive permissions'] = 0644 #归档权限
gitlab_rails['backup_keep_time'] = 604800 #备份保留7天
# 初始化
[root@gitlab-ce ~]# gitlab-ctl reconfigure
```

```bash
2.手动执行备份命令，会将备份的结果存储至 /data/gitlab/backups 目录中
[root@gitlab-ce ~]# mkdir -p /data/gitlab/backups
[root@gitlab-ce ~]# gitlab-rake gitlab:backup:create
3.当然也可以将备份命令写入定时任务每天进行自动备份
[root@gitlab-ce ~]# crontab -l
00 02 * * * /usr/bin/gitlab-rake gitlab:backup:create
```

### gitlab恢复

```shell
1.停止数据写入服务
[root@gitlab-ce ~]# gitlab-ct] stop unicorn
[root@gitlab-ce ~]# gitlab-ctl stop sidekiq
通过 gitlab-rake 命令进行恢复，恢复时需要指定此前备份的名称。(但不需要写名称的.xxtar后缀)
[root@gitlab-ce ~]# gitlab-rake gitlab:backup:restore BACKUP = 1528102291_2018_06_04_10.8.3
3.重启gitlab，检测是否 gitlab 是否恢复
[root@gitlab-ce ~]# gitlab-ctl restart
```

### gitlab组件位置

```shell
# 查看gitlab组件
ll /opt/gitlab/servive/
```



### gitlab迁移

```bash
一般情况，gitlab使用，则不会升级；
迁移，本地---阿里云---顺便升级
迁移： /etc/gitlab/gitlab.rb(主配置文件) + backups 新节点：安装相对应的版本的gitlab
新节点：执行升级操作
```

![image-20240112215805450](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240112215805450.png)



```bash
1.升级 gitlab-ce 到12.10 版本
yum localinstall gitlab-ce-12.10.9-ce.0.e17.x86_64.rpm -y
2.对 gitlab 进行初始化
gitlab-ctl reconfigure
3.安装 gitlab-ce-12.10.x 版本

升级不能跨大版本，只能先升级到最高的小版本，才能升级大版本
例如 gitlab12.3.1 升到 gitlab13
gitlab12.3.1 -> gitlab 12.9.9 ->gitlab 13.0.0
```

```bash
# 迁移:
新节点:	  安装 对应版本的gitlab
			拷贝 备份文件，备份的数据
			恢复文件和备份数据
新节点:
			升级操作
```

```bash
# 升级 命令，首先先下载rpm包
yum localinstall gitlab-ce-12.9.9-ce.0.el7.x86 64.rpm

# 备份的文件夹
etc/gitlab/
/etc/gitlab/gitlab-secrets.json
/etc/gitlab/trusted-certs/
/etc/gitlab/gitlab.rb
# 查看gitlab备份文件
ll /etc/gitlab/config_backup
ll /etc/gitlab/config_backup/gitlab_config_1634610589_2021_10_19.tar
# 查看压缩包内的文件
tar tf /etc/gitlab/config_backup/gitlab_config_1634610589_2021_10_19.tar
```

```bash
4.使用直接 yum localinstall 进行软件包升级，升级至13版本。
[root@gitlab ~]# yum localinstal1 gitlab-ce-13.0.10-ce.0.e17.x86_64.rpm -y
#会提示报错:
Running transaction
* gitlab_monitor['enable'] has been deprecated since 12.3 and was removed in 13.0.
Use gitlab_exporter['enable'] instead.
5.根据提示编辑 /etc/gitlab.rb 配置文件
gitlab_monitor['enable'] =false
#变更为
gitlab_exporter['enable'] = false
6.修改配置后重新初始化，然后在进行升级
[root@gitlab ~]# gitlab-ctl reconfigure
[root@gitlab ~]# yum localinstall gitlab-ce-13.0.10-ce.0.e17.x86_64.rpm -y
7.重启 gitab 服务，然后检查版本以及数据
```



### gitlab安全

```bash
5.5 Gitlab安全
将访问网页的 HTTP 协议升级到 HTTPS协议，保证数据安全;
1.创建证书
mkdir -p /ssl_key
cd /ssl_key
openssl genrsa -idea -out server.key 2048
openssl req -days 36500 -x509 \
sha256 -nodes -newkey rsa:2048 -keyout server.key -out server.crt


2.修改 gitlab 配置文件
vim /etc/gitlab/gitlab.rb

external_url "https://gitlab.example.com"  #必须修改

nginx['enable'] = true
nginx['client_max_body_size'] =1000m
nginx['redirect_http_to_https'] = true
nginx['redirect_http_to_https_port'] = 80 #所有80跳转到443
nginx['ssl_certificate'] = "/ssl_key/server.crt"
nginx['ssl_certificate_key'] = "/ssl_key/server.key""
nginx['ssl_ciphers] = "ECDHE-RSA-AES256-GCM-SHA384:ECDHERSA-AES128-GCM-SHA256"
nginx['ssl_prefer_server_ciphers'] = "on"
nginx['ssl_protocols'] = "TLsv1.2"
nginx['ssl_session_cache'] = "builtin:1000 shared:SSL:10m"
nginx['ssl_session_timeout'] = "1440m"

3.重新初始化 Gitlab
gitlab-ctl reconfigure
```

### 查看服务配置文件

```bash
# 查看进程ID
ps aus | grep nginx
# 查看进程
cat /proc/进程ID/fd/
# 查看进程
cat /proc/进程ID/
```



### gitlab忘记密码

```bash

如何重置 GitLab的 root 密码 官方修改密码方式
1.在 root 用户下，执行
gitlab-rails console -e production

2.获得用户数据，修改用户密码
irb(main):001:0> user = User.where(id: 1).first

#更改密码并确认密码
irb (main) :002:0> user.password="xxxx"
irb (main) :003:0> user.password_confirmation="xxx"

#保存退出
irb (main) :004:0> user.save!
irb(main):005:0>quit
```

