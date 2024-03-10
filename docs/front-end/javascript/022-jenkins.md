# Jenkins

## 持续集成工具

![image-20240113173407215](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240113173407215.png)

Jenkins 是一个开源提供友好操作界面的持续集成的工具，是由 JAVA 开发而成Jenkins 是一个调度平台，本身不处理任何事情，调用插件来完成所有的工作。

![image-20240114185829027](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240114185829027.png)

jenkins能将各种开源的软件集成为一体，从而实现不同功能的调度工作。如下图所示

## Jenkins安装

官网：jenkins.io

可以通过配置软件仓库进行安装，也可以通过rpm包安装

在清华大学源进行下载

https://mirror.tuna.tsinghua.edu.cn/jenkins/redhat/

![image-20240114191717373](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240114191717373.png)

## 设置hostname

```bash
hostnamectl set-hostname jenkins
# 设置IP地址---把99修改为120
sed 's#99#120#g'/etc/sysconfig/network-scripts/ifcfg-eth*
# 设置IP地址---把99修改为120
sed -i 's#99#120#g'/etc/sysconfig/network-scripts/ifcfg-eth*
```

## 调整系统环境

```shell
调整系统环境
[root@jenkins ~]# setenforce 0
[root@jenkins ~]# systemctl stop firewalld
# 设置语言，避免后期Jenkins汉化不完整(设置后需要重启服务器)[root@jenkins ~]# 
localectl set-locale LANG=en_US.UTF-8
[root@jenkins ~]#localectl status
2.2 安装JDK环境
[root@jenkins ~]# yum install java-11-openjdk-devel -y
# 查看版本
[root@jenkins ~]# java -version
openjdk version "11.0.12 2021-07-20 LTSOpenJDK Runtime Environment 18.9 (build 11.0.2+7-LTS)OpenJDK 64-Bit Server VM 18.9 (build 11.0.12+7-LTs，mixed mode, sharing)
2.3 安装jenkins
[root@jenkins ~]# yum localinstall -y https://mirror.tuna.tsinghua.edu.cn/jenkins/redhat/jenkins-2. 303-1.1.noarch.rpm
# 通过本地安装
yum localinstall jenkins-2.303-1.1.noarch.rpm
```

## 配置jenkins

查看jenkins安装位置

```bash

rpm -ql jenkins

/etc/init.d/jenkins # 启停脚本
/etc/logrotate.d/jenkins # 日志切割脚本
/etc/sysconfig/jenkins # 配置文件
/usr/lib/jenkins # rpm包的方式里边还嵌套了一个war包
/usr/lib/jenkins/jenkins.war#需要启动一个tomcat
/usr/sbin/rcjenkins#软链接
/var/cache/jenkins#缓存目录
/var/lib/jenkins#工作目录
/var/log/jenkins#缓存目录
```

### 配置文件

```bash
vim /etc/sysconfig/jenkins

---修改的配置项---
JENKINS_USER="root"
JENKINS_PORT="8080"

---加入开机自启---
systemctl enable jenkins

---启动jenkins---
systemctl start jenkins

---配置域名---
在windows系统修改hosts文件
192.168.52.61 jenkins.yuluo.top
192.168.52.60 yuluo.gitlab.top
---或者配置内网dns服务---


---解锁jenkins---


---安装插件---
选择插件安装->无->使用admin用户密码登陆，并设置密码



```

### 优化jenkins

jenkins 系统管理中的插件管理非常重要，因为 jenkins 的工作全部是由插件来完成。但jenkins 插件默认从国外下载，速度会很慢，所以需要在安装插件前将下载地址改为国内的下载地址

```bash
# 修改jenkins"下载插件”地址为国内源
# 检测
sed -i 's#https://www.google.com/#https://www.baidu.com/#g' /var/lib/jenkins/updates/default.json
# 软件地址
sed -i 's#updates.jenkins.io/download#mirror.tuna.tsinghua.edu.cn/jenkins#g' /var/lib/jenkins/updates/default.json
```

修改jenkins“插件升级站点“Url地址;

`选择 系统管理 -->插件管理-->高级-->升级站点`

![image-20240115141421137](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240115141421137.png)

```bash
https://mirror.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
```

### 联网安装汉化

在插件管理中有《可更新 可选插件  已安装》日常的插件安装都是在这个界面上完成的。

安装中文包

```bash
# 确保字符集是en US.UTF-8
[root@jenkins ~]# echo $LANG
en US.UTF-8
# 如果不是则需要重启系统



```

![image-20240115151301861](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240115151301861.png)

```bash
# 在搜索栏中搜索
chinese
```

### 上传插件安装

通过页面上传一个.hpi文件的方式来安装插件。

1.在jenkins 官网 https://plugins.jenkins.io/下载插件。(插件是以 .hpi 结尾的)

2.将下载好的插件通过上传的方式进行安装系统设置->插件管理->上传插件

```bash
# ----在清华大学源中查找对应的插件plugs，然后下载下来---

# ---然后在"插件管理"> "高级中"> "上传插件"---
```

![image-20240115152758903](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240115152758903.png)

### 离线安装

将之前jenkins服务器的插件保存下来，然后导入到服务器中，(离线安装)，最后重启 Jenkins

```bash
# 插件的目录 /var/lib/jenkins/plugins/进行打包
wget plugins.tar.gz
# 把插件解压到目录中即可
tar xf jenkins_plugin.tar.gz -C /var/1ib/jenkins/plugins/
chown -Rf jenkins.jenkins /var/lib/jenkins/plugins/
systemctl restart jenkins
# jenkins没有数据库，他的所有数据都是存储在内存中的。
```

### 查看路由

```bash
route -n
```

# Jenkins项目

**新建一个项目**

```bash
新建任务
1、输入任务名称: freestyle--job-demo
2、选择自由风格的软件项目
3、描述:描述该任务的作用
```

**清除旧的构建**

```bash
丢弃旧的构建: 构建后的产物，保留多久条件
1: 保持构建的天数: 当前项目构建的产物最多保留多少天，条件
2: 保持构建的最大个数: 当前项目最多保留多少构建产物，多出的自动删除
```

**参数化构建**

```bash
参数化构建: 在执行任务时，可以传递参数
#参数和shell中的脚本位置参数一致
```

![image-20240118181612173](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240118181612173.png)

在构建这里设置构建步骤

![image-20240118181958944](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240118181958944.png)

使用文本参数化构建参数

![image-20240119213105303](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240119213105303.png)

构建

![image-20240119213202380](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240119213202380.png)

构建-->增加构建步骤-->选择执行 shell命令

```bash
# 执行以下命令
pwd
echo "welcome jenkins"
echo ${WORKSPACE}
touch fileByjenkins
# 构建后所产生的文件会存储在/var/lib/jenkins/workspace/jenkins_projectname目录下
```

## Jenkins集成Gitlab

只所以需要jenkins集成gitlab，是因为我们要抓取Gitlab上的代码，为后续发布网站做好准备;由于 jenkins 只是一个调度平台，所有需要安装与git1ab 相关的插件才可完成对应的集成。

```bash
# 配置jenkins免密到gitlab上
1、开发通过gitlab创建一个项目，然后进行代码提监控平台代码url;
2、创建一个新的 freestyle 项目，名称为monitor-deploy
3、在 jenkins 中填写 gitlab 项目地址(域名需要解析)，由于是ssh协议，所以需要添加认证凭据;
3.1 jenkins需要访问 gitlab 项目，则需要与。gitlab建立信任;首先登陆Jenkins生成一对秘钥;
3.2 将 jenkins 服务器生成的公钥添加上 gitlab对应的用户;
3.3 然后继续操作 Jenkins，将 root 用户的私钥添加至 Jenkins 服务器上;至此就完成了“公钥加密私钥解密”;此时 jenkins 就能正常访问gitlab 项目。
4、选择对应的凭据，再次检查是否存在报错提示。
如果没有点击保存即可。
5、最后点击构建，然后查看构建的输出信息是否有错误提示。
6、构建成功后，会被下载至 Jenkins 服务器本地/var/lib/jenkins/workspace/Freestyle目录下
# 配置域名解析 编辑host文件

# 在jenkins服务器上安装git
yum install git -y
# 初始化
git config --global user.name "hanser"
git config --global user.email "3012976262@qq.com"
git config --global --list

```

源码管理git配置

![image-20240119222109988](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240119222109988.png)

需要配置jenkins私钥存放的位置

![image-20240119222258669](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240119222258669.png)

选择配置

![image-20240119222448643](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240119222448643.png)

保存，然后选择构建

```bash
构建成功后，会被下载至 Jenkins 服务器本地/var/lib/jenkins/workspace/Freestyle目录下
```

## 集成SHELL部署

```bash
#进入目录
cd ${WORKSPACE} && \
#打包当前文件夹的所有文件
tar -zcf /usr/local/src/monitor.tar.gz ./*
```

优化使用环境变量

```bash

```

## 配置免密

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.5
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.7
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.8
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.9
```



## 集成Ansible

**1 安装Ansible**

```bash
yum install ansible -y
```

**2 配置ssh免密**

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.5
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.7
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.8
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.16.1.9
```

**3 配置inventory**

```bash
[root@jenkins ~]# cat /etc/ansible/hosts

[lbservers]
172.16.1.5

[webservers]
172.16.1.7
172.16.1.8

[testservers]
172.16.1.9
```

**4 编写测试playbook**

```bash
cat /root/test.yml
- hosts: "webservers"
  tasks:
	-name: Test shell Command
	 shell:
	 cmd: ls
	 register: system_cmd
	-name: Debug System Command
	 debug:
		msg:"{{ system_cmd }}"
```

**5 配置Ansible**

1 添加构建步骤，填写playbook路径，填写inventory清单文件路径

![image-20240117163141868](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240117163141868.png)

2 定义ansible外置传参方式，传入主机组名称

![image-20240117163205192](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240117163205192.png)

3 定义ansible的传参的值，为外置传参的变量名

![image-20240117163407191](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240117163407191.png)

4 定义外置传参的变量名称，以及变量值

![image-20240117163431156](https://imgbed-1303231448.cos.ap-beijing.myqcloud.com/wp-md/image-20240117163431156.png)

