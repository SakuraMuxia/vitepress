# Git搭建及使用

# Git 介绍

Git 是一款开源免费的分布式的**版本控制系统**。是 Linux 之父 Linus Torvalds（林纳斯·托瓦兹）为了方便管理 linux 代码代码而开发的。

Git 可以实现的功能：

* 代码备份
* 版本回退
* 多人协作
* 权限控制

Git 工具下载地址：https://git-scm.com/

GIt 官方文档地址：https://git-scm.com/book/zh/v2

## Git 准备工作

### 安装git

```shell
安装git
安软件有很多种方式:直网传送门
1.windows系统
https://git-scm.com/download/win
2.linux系统
yum instal1 git -y
3.macos系统
https://git-scm.com/download/mac
```

## Git 基础概念

### .git目录 仓库目录

- hooks 目录包含客户端或服务端的钩子脚本，在特定操作下自动执行。
- info 包含一个全局性排除文件，可以配置文件忽略。
- logs 保存日志信息。
- objects 目录存储所有数据内容,本地的版本库存放位置。
- refs 目录存储指向数据的提交对象的指针（分支）。
- config 文件包含项目特有的配置选项。
- description 用来显示对仓库的描述信息。
- HEAD 文件指示目前被检出的分支。
- index 暂存区数据。

> **切记：** 不要手动去修改 .git 文件夹中的内容。

### Git 仓库的三个区域

![image-20240930100817345](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240930100817345.png)



**工作区：** 代码编辑区，编辑代码的地方。

**暂存区：** 修改待提交区。

**版本库：** 真正存储代码的地方。

## 本地仓库

### 生成密钥

```shell
ssh-keygen.exe -t rsa -C "xxx@163.com"
ssh-keygen.exe -t rsa -C "xxx@163.com"
三次回车, 即生成私钥和公钥, 生成目录为: /c/Users/wangzaiplus/.ssh
cat ~/.ssh/id_rsa.pub, 复制公钥
登录GitHub, Settings -> SSH and GPG keys -> New SSH Key, 将上一步公钥粘贴至文本框, 保存, 搞定
```

### 初始化配置

```bash
# --global 表示对所有用户都生效
git config --global user.name "Your Name"
git config --global user.email "email@example.com"

安装git 
git --version
Git初始化设置，设置用户名he邮箱地址：
git配置

git config --global user.name "SakuraMuxia"
git config --global user.email "2216847528@qq.com"
#检查是否配置成功
git config --list

验证
ssh -T git@github.com
```

初始化配置只在git安装之后进行一次即可！

### 仓库初始化

```bash
git init

git init （初始化仓库）
git add . (这里的.表示添加所有文件，也可以自定义添加）
git commit -m ‘添加的注释信息’
git remote add origin ‘url’
git push -u origin master     
```

每次创建新的项目，都要进行仓库初始化；每个新项目初始化一次就可以了。

### 添加暂存区

```bash
git add <file>    # 添加指定文件到暂存区
git add -u        # 添加所有被删除或被修改的文件到暂存区（不包括新增文件）
git add .         # 添加所有修改和新建的文件到暂存区（不包括删除的文件）
git add -A        # 添加所有被删除、被替换、被修改和新增的文件到暂存区，推荐使用！
```

### 提交版本库

```bash
git commit -m "提交日志"         # 把暂存区的东西提交到版本库
git commit -am "提交日志"        # 把工作区的修改一步到位添加暂存并提交到版本库
```

### 查看状态和变化

```bash
git status;
```

该命令会对工作区和版本库进行比较； 也会对暂存区与版本库进行比较。

如果 `git status` 命令的输出对于你来说过于简略，而你想知道具体修改了什么地方，可以用 `git diff` 命令。

```bash
git diff             # 查看当前工作区和版本库的差异 （不包括新增的文件）
git diff --cached    # 查看暂存区中的变化
```

### 撤销修改和撤销暂存

#### ① 工作区的修改没有添加暂存

```bash
git restore <文件名>    # 恢复工作区指定文件
git restore .          # 恢复工作区所有的修改（恢复之后，新增的文件不会被删除）
```

> 会使用版本库当前最前的版本进行恢复！

**注意：**

```bash
git checkout -- <file> # 同 git restore <file> 作用一致
git checkout -- .      # 同 git restore . 作用一致
```

#### ② 工作区的修改已经添加到暂存

如果工作区的修改已经添加到暂存区，先清除暂存区，再恢复工作区。

```bash
git restore --staged <文件名>        # 把指定文件从暂存区移除
git restore --staged .              # 把所有文件从暂存区移除
```

## 历史版本回滚

### 查看历史版本号

```bash
git log		# 查看提交记录
git log -n	# 查看最近的 n 次提交几次，n 是个数字
git log --oneline	# 每次提交记录只用一行显示
```

如果需要查看被回滚掉的提交的版本号：

```bash
git reflog

#初始化一个目录为版本库
git init 
#将没有被管理的文件，加入git进行管理
git add
#将内容提交到版本库中
git commit
#查看提交的历史记录
git 1og
#查看所有的历史提交记录
git reflog
#  表示只看最近的两次提交
git reflog -n 2
#回退到指定的提交版本记录
git reset --hard commitID
# 查看状态
git status
```

### 通过指定版本号回滚

```bash
git reset --hard <commitID>
```

> **注意：**
>
> 进行版本回退时，不需要使用完整的哈希字符串(版本号，CommitID)，前七位即可。
>
> 版本切换之前，要提交当前的代码状态到仓库。

### 快捷回滚

```bash
git reset --hard HEAD^    # 恢复到上个版本
git reset --hard HEAD^^    # 恢复到上上个版本
git reset --hard HEAD^^^    # 恢复到上上上个版本
```



## Git 忽略文件

### 被忽略的文件

哪些文件需要被 git 忽略：

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如 Java 编译产生的`.class`文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

### 设置忽略文件 .gitignore

忽略文件的文件名是 `.gitignore` 的文件, 文件内可以设置项目的忽略规则。

忽略文件可以放在项目中的任意目录中，放在哪个目录作用范围就是哪个目录； 一般忽略文件会放在项目的根目录下。

### 忽略文件的语法

可以用`git check-ignore` 命令检查 `.gitignore`文件格式是否正确。

`.gitignore` 文件的格式规则如下：

1. 空格不匹配任意文件，可作为分隔符，可用反斜杠转义。
2. `#` 开头的文件表示注释，可以使用反斜杠进行转义。
3. `!` 开头的模式表示否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用 `!` 也不会再次被包含。可以使用反斜杠进行转义。
4. `/` 结束的模式只匹配目录以及在该目录路径下的内容。
5. `/` 开始的模式匹配当前目录下的，（`.gitignore` 文件所在的目录）
6. `**` 匹配多级目录，可在开始，中间，结束。
7. `*` 匹配任意数量的任意字符串。
8. `?` 通用匹配单个字符。
9. `[]` 通用匹配单个字符列表。

### 忽略文件配置示例

```
# 此为注释 
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略子目录下的 TODO 文件
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

### 忽略已经提交到版本库的文件

对于已经加入到版本库的文件，可以在版本库中删除该文件

```bash
git rm --cached 文件名
```

然后在 `.gitignore` 中配置忽略。

最后执行 `git add` 和 `git commit` 提交即可。



## Git 分支

### 分支介绍

分支并非 Git 的专利，几乎所有的版本控制系统都以某种形式支持分支。

使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。

分支可以给使用者提供多个环境的可以，意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。

![image-20240930100836627](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240930100836627.png)

### 分支操作

> **注意：** 在进行分支操作之前，一定一定要把工作区都提交了！！！

#### ① 创建分支

```bash
git branch 分支名
```

会根据当前所在的分支进行创建。

#### ② 切换分支

```bash
git switch 分支名 （新命令）
# 或者
git checkout 分支名
```

#### ③ 创建并切换到该分支

```bash
git switch -c 分支名
# 或者
git checkout -b 分支名
```

#### ④ 查看分支

```bash
git branch
```

#### ⑤ 重命名分支

```bash
git branch -m 分支名 新的名字
```

#### ⑥ 删除分支

```bash
git branch -d 分支名
```

#### ⑦ 合并分支

如果把 A 分支合并到 B 分支上，先切换到 B 分支上。

```bash
git merge 分支名		# 把指定的分支合并到当前分支
```

### 合并分支解决冲突

当多个分支修改同一个文件后，合并分支的时候就会产生冲突。冲突的解决非常简单，将内容修改为最终想要的结果，然后继续执行 `git add` 与 `git commit` 就可以了。

```
1. 有主分支和开发分支，保持同步
2. 开发购物车，基于开发分支，创建一个 shopcart 分支，在  shopcart 分支上开发
3. 开发订单模块，基于开发分支，创建 order 分支，在 order 分支上开发
4. 开发完成后，shopcart 分支和 order 分支都需要合并到开发分支；shopcart 分支、order 分支删除
5. 在开发分支上测试，解决bug，将开发分支合并到主分支
```

分支使用的过程

```shell
V3是一个里程碑的版本
开发在dev的分支进行开发后续的功能V5 V6
当master出现bug时，只需要把dev切换到master上。
创建bug分支，修复bug，创建版本V6
把bug分支合到master上V7
然后dev继续开发V8，开发完成
把master代码合到dev分支上做测试，排除冲突V9
再把dev合到master分支上V10
```

分支的命令代码

```shell
---1---
# 查看git分支
git branch
# 创建分支
git branch dev
# 切换到dev分支
git checkout dev

---2---
# 合并代码
首先回到master分支上
git branch master
站在master分之上把bug分支上的代码合并到master分之上
git merge bug

---3---
把master合并到dev上
git branch dev
合并分支
git merge master

---4---
把dev合并到master分支上
git branch master
git merge dev


```

```shell
git branch # 查看分支
git checkout name # 切换分支


# 站在master:将dev的最新代码合并到master分支;
git merge dev

# 站在bug: 将dev的最新代码合并到bug分支;
git merge dev

```

删除分支

```shell
git branch -d bug
git branch -d dev
```

## Git 远程仓库

### GitHub 介绍

Hub 是一个代码仓库的托管平台，因为只支持 Git 作为唯一的版本库格式进行托管，故名 GitHub。可以创建远程中心仓库，为多人合作开发提供便利。

目前，其注册用户已经超过 350 万，托管版本数量也是非常之多，其中不乏知名开源项目 Ruby on Rails、jQuery、python等。

2018 年 6 月 4 日，微软宣布，通过 75 亿美元的股票交易收购代码托管平台 GitHub。

网址：[https://github.com](https://github.com/)

从搜索框，输入，可以查看星数十万以上，会从高到低排列

```
stars:>100000
```



### GitHub 使用流程

#### ① 场景一： 本地有仓库 远程没有仓库

1. 在 github 上创建一个仓库

2. 获取到远程仓库的地址

3. 本地运行命令， 给仓库地址取别名为 origin

   ```js
   git remote add origin 远程仓库地址
   ```

   ```bash
   # 仓库地址别名的其他操作
   git remote remove 名字;			# 删除
   git remote rename 名字 新名字;     # 改名
   git remove get-url 名字；		   # 查看名字对应的仓库地址
   git remove set-url 名字 地址;	   # 修改名字对应的仓库地址
   ```

4. 本地仓库提交

5. 把本地仓库推送到远程仓库 （第一次）, `-u` 的意思是记录远程仓库的地址。

   ```bash
   git push -u origin master
   ```

6. 以后如果向远程仓库推送

   ```bash
   git push master
   ```

#### ② 场景二： 本地没仓库 远程有仓库

1. 获取到远程仓库的地址

2. 本地克隆远程仓库

   ```bash
   git clone 远程仓库地址
   ```

3. 本地仓库如有修改，一定要添加并提交

4. 将本地仓库推送到远程

   ```bash
   git push
   ```

   ```bash
   git push origin 本地分支名:远程分支名
   ```

   

#### ③ 从远程仓库克隆之后，创建本地分支

默认从远程仓库克隆的只有主分支，如果我们需要在其他分支进行开发，只要在本地创建分支即可。

**查看所有分支：包括远程的分支**

```bash
git branch -a
```

**本地创建分支并设置对应的远程分支：**

```bash
git switch -c 分支名 origin/远程分支名
```

#### 远程仓库回退

```js
自己的远程分支版本回退的方法

如果你的错误提交已经推送到自己的远程分支了，那么就需要回滚远程分支了。
首先要回退本地分支：

git reflog
git reset --hard Obfafd

紧接着强制推送到远程分支：

git push -f
本地分支回滚后，版本将落后远程分支，必须使用强制推送覆盖远程分支，否则无法推送到远程分支
```



### 多人合作

#### ① 创建组织配置权限

```
首页 -> 右上角 `+` 号 -> new Organization
免费计划
填写组织名称和联系方式（不用使用中文名称）
邀请其他开发者进入组织（会有邮件邀请，==如收不到，请查看垃圾箱==）
配置组织权限，组织首页右侧  settings -> Member privileges -> 选择 write
```

#### ② 多人合作工作流程

**第一天上班：**

1. 获取到仓库地址，克隆到本地

2. 进行开发修改代码，添加、提交。

3. 下班之前要推送到远程仓库

   3.1 先确定所有的都提交了（commit）

   3.2 推送之前先拉取

   ```bash
   git pull
   ```

   3.3 正式推送

   ```bash
   git push
   ```

**以后每一天：**

1. 早上上班，拉取远程仓库

   ```bash
   git pull
   ```

2. 进行开发修改代码，添加、提交。

3. 下班之前要推送到远程仓库

   3.1 先确定所有的都提交了（commit）

   3.2 推送之前先拉取

   ```bash
   git pull
   ```

   3.3 正式推送

   ```bash
   git push
   ```

#### ③ 冲突解决

与合并分支类似，多个成员如果修改了同一个文件，就会出现冲突； 本地拉取文件的时候，如果远程仓库中与本地的提交有冲突，解决：修改再次提交， 再推送



### GitHub 免密登录

1. 创建非对称加密对

   ```sh
   ssh-keygen -t rsa -C "xxx@xxx.com"
   ```

2. 文件默认存储在家目录（c:/用户/用户名/.ssh）的 .ssh 文件夹中。

   - id_rsa 私钥
   - id_rsa.pub 公钥

3. 将公钥（.pub）文件内容配置到账号的秘钥中

   首页 -> 右上角头像-> settings -> SSH and GPG keys -> new SSH Key

4. 克隆代码时，选择 ssh 模式进行克隆 （地址 在仓库首页 绿色 克隆的位置 选择 use ssh）

   ```shell
   git clone git@github.com/unclealan/team-repo-1.git
   ```

5. 克隆代码时的提醒，这里需要输入 `yes`

## GitFlow - Git 开发流程



- Master 主分支。上面只保存正式发布的版本
- Hotfix 线上代码 Bug 修复分支。开发完后需要合并回Master和Develop分支。
- Feather 功能分支。当开发某个功能时，创建一个单独的分支，开发完毕后再合并到 dev 分支
- Release 分支。待发布分支，Release分支基于Develop分支创建，在这个Release分支上测试，修改Bug
- Develop 开发分支。开发者都在这个分支上提交代码



### 分支操作

```shell
1.创建分支
  git branch 分支名
  git branch dev

2.查看所有分支
   #当前活动分支 带* 并且高亮
  git branch

3.创建test分支
  git branch test
  git branch

4.切换分支
  #git checkout 分支名 注意：切换前提：保证当前分支工作区clean状态
  git checkout dev
  查看当前分支
  git branch

5.删除分支
  #查看当前所有分支
  git branch
   #git branch -d 分支名
   #不能删除当前活动分支 也不能删除 commit之后 但 没有merged的分支(即> 处于本地仓库的分支)
  git branch -d test

6. 创建并切换到新创分支
  git checkout -b test

7.测试处于本地仓库的分支，能否被删除
7.1在test分支，commit一段代码
  git add .
  git commit -m “”
7.2切换到dev分支
  git checkout dev
  #删除test分支，是否报错，如果需要强制删除，git branch -D test
  git branch -d test
7.3如果需要强制删除
  git branch -D test      
```

### 忽略上传文件

```shell
项目目录下创建.gitignore文件,根据要忽略的内容写入,如忽略.idea文件和target文件夹和以.suo结尾的文件


/.idea/
/target/
*.suo


在.git/info/exclude文件中写入上述内容
/.idea/
/target/
*.suo

最重要的区别就是.gitignore能够在团队成员中共享，因此当某个文件被公认为“无需版本控制”，那么最好就把它放在.gitignore文件中。

而.git/info/exclude文件则是供个人专用的，仅当自己觉得这个文件不用版本控制时，才把它放在.git/info/exclude文件中。

.idea、target等非必要上传的文件被上传到git，如何处理

git rm -r --cached .idea
git rm -r --cached target
git commit -m "删除不必要的文件提交"
git push

```

### git历史版本

```shell
git log : 只展示 当前版本之前的版本，即HEAD指针指向的版本及之前的历史版本

git reflog : 会展示所有的历史提交版本，非常的全

git reflog -n 2 : 表示只看最近的两次提交

git reflog : 展示短hash+HEAD{n}+提交备注，非常方便用来进行历史版本的回退与任意版本的切换

git log --stat : 可以查看历史提交的改动的文件
```

### git 版本回退

```shell
操作思路 ： 
  1.使用 git log 或者 git reflog 命令 获取到要回退或者切换的版本id
  2.使用 git reset --hard命令回退/切换到某个历史版本；
  3.git reset --hard 命令会重置 本地仓库、暂存区和工作区，三者的状态保持一致！
  
版本回退/切换的命令：
1.git reset --hard [索引值] : 可切换到任意版本[推荐使用这个方式]
2.git reset --hard HEAD^ ： 只能后退，一个 ^ 表示回退一个版本，两个^ 表示回退两个版本，。。。依次类推
3.git reset --hard HEAD~n ：只能后退，n表示后退n个版本
```

### git 历史版本删除

```shell
使用Git Revert命令
使用Git Revert命令可以创建一个新的提交来回滚之前的提交，并将其删除。要回滚到哈希值为abcd1234的提交，可以使用以下命令
此命令将创建一个新的提交，该提交将会撤销哈希值为abcd1234的提交中所做的所有更改。这种删除版本的方法的优点在于对提交历史不会造成影响，可以方便地撤销撤销。
git revert --hard abcd1234

使用Git Reset命令
假设我们要彻底删除哈希值为abcd1234的版本，包括其所有之前的提交。那么，我们可以使用Git Reset命令。该命令将会重置当前分支的HEAD指针，并将其指向哈希值为abcd1234的提交。在此之后，可以使用以下命令将分支指针移动到新的提交上：

git reset --hard abcd1234
需要注意的是，此操作将会从Git历史中完全删除该提交及其之后的所有提交，因此需谨慎操作。除非您确定已经备份了所有的数据，否则此命令可能会导致不可逆的数据丢失。
```

```shell
windows版的git可以使用cat vim touch mkdir等命令
```

```shell
执行初始化命令
git init
管理目录下的文件状态
git status
注:新增的文件和修改过后的文件都是红色
管理指定文件(红变绿)
git add 文件名
git add
个人信息配置: 用户名、邮箱[一次即可]
git config --global user.email "o1dxu@qq.com"
git config --global user.name "oldxu"
git config --global color ui true
# 查看隐藏文件命令
ls -a
# git查看log日志
git log
# git查看reflog git reflog则可以看到被删除的commitid
git reflog
# commitID只需要前几位就可以
# 工作区回退到执行的commitID
git reset --hard a6fc6853d8
# 验证测试
ssh -T xxx
```

## 远程仓库

在gitee上创建仓库或者在github上创建仓库

仓库初始化

```shell
# 仓库初始化
git config --global user .name "oldxu"
git config --global user.email "biaoganxu@qq.com"
git config --global --list
# 添加远程仓库 origin是一个别名可以换成别的
git remote add origin git@gitee.com:xxxx
git remote remove <remote_name>
# 查看远程仓库配置
git remote -v
# 把本地master提交到远程仓库
git push origin master

```

选择https的方式需要账号密码登陆认证，使用ssh方式可以通过密钥文件免密提交拉去代码

生成ssh密钥

```shell
ssh-keygen
查看公钥
cat ~/.ssh/id_rsa.pub
# 把公钥放置到远程仓库对应用户的设置中

```

把本地仓库dev分支推送到远程仓库dev中

```shell
git checkout dev
git push origin dev
```

在新电脑上配置clone代码

```shell
# 仓库初始化
git config --global user .name "oldxu"
git config --global user.email "biaoganxu@qq.com"
git clone
克隆远程仓库代码
git clone 远程仓库地址 (内部已实现git remote add origin 远程仓库地址)
2.切换分支
git checkout 分支

---2---
1.切换到dev分支进行开发
git checkout dev
2.把master分支合并到dev [仅一次]
git merge master
3.修改代码
4.提交代码
git push origin dev

---3---
拉取master代码
git pull origin dev

```

代码总结

```shell
git pul1 origin dev
等价于
git fetch origin 获取代码
git merge origin/dev 合并到分支上
```

![](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240112195903183.png)

![](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240112195919441.png)



```shell
小总结
添加远程连接(别名)
git remote add origin 地址
git remote -v
推送代码
git push origin dev
```

```shell
记录图形展示
git log --graph --pretty=format:"%h %s"
```

## tag标签

git标签就是对commit的一次快照，便于后续将特定时期的代码快速取出。在代码发布时可以使用标签发布。

```bash
# 对当前最新提交的代码创建标签，-a标签名称，-m标签描述
git tag -a v1.1 -m "描述信息" 

# 创建标签，指定commitlD
git tag -a "vl.2" CommitID -m "Messages"

# 查看标签详情
git tag -l
git log -l

# 提交所有的标签到远程仓库中
git push origin --tags
# 提交指定的标签到远程仓库中
git push origin --tag v3.0
# 查看tag标签的commit ID
git show v1.0


```

## 免密登陆

```shell
---1---
URL中体现
原来的地址: https://gitee.com/oldxu/treenb.git 
修改的地址: https://用户名:密码@gitee.com/oldxu/treenb.git

git remote add origin https://用户名:密码@gitee.com/o1dxu/treenb.git
git push origin master


---2---
SSH实现
生成公钥和私钥(默认放在 ~/.ssh目录下，id_rsa.pub公钥、id_rsa私钥)
ssh-keygen
2.拷贝公钥的内容，并设置到github中。
3，在git本地中配置ssh地址
git remote add origin git@github.com:wupeigi/dbhot.git
4. 删除指定的远程仓库
git remote remove <remote_name>
4.以后使用
git push origin master
git自动管理凭证
```

## ignore文件

让 Git 不再管理当前目录下的某些文件。.gitignore

```bash
通常情况下有如下文件可能需要忽略
1.程序运行时产生的垃圾文件
2.程序运行时产生的缓存文件
3.程序本地开发使用的图片文件
4.程序连接数据一类的配置文件

*.h
!a.h
files/
*.py[clald]
```

更多参考: https://github.com/github/gitignore

## git设置代理

```bash
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
git config --global --unset http.proxy
git config --global --unset https.proxy

npm config delete proxy
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890
git config --global http.https://github.com.proxy socks5://127.0.0.1:7890
clone: git clone -c http.proxy="127.0.0.1:xxxx" https://github.com/Gump8/xxxx.git
fetch upstream: git -c http.proxy="127.0.0.1:xxxx" fetch upstream
*注意： fetch 后面不能 -c，clone 是可以的
```

## git提交问题

### 删除远程提交

```js
本地回退到之前的提交
git reset xxx --hard
本地强制推送到远程
git push origin 分支名 --force
```

### git pull

```shell
git pull = git fetch + git merge
```

### git fork

```shell
在git中，fork是“分叉”、“复制”的意思；fork可以复制出一个仓库的新拷贝，包含了原有库中的所有提交记录，fork后这个代码库是完全独立的，可以在自己的库中做任何修改，也可以向原来的库提交合并请求
```

### 撤销提交

```shell
# Undo Commit
适用情况：代码修改完了，已经Commit了，但是还未push，然后发现还有地方需要修改，但是又不想增加一个新的Commit记录。这时可以进行Undo Commit，修改后再重新Commit。

如果已经进行了Push，线上的Commit记录还是会存在的 确认Commit之后（未进行push）

# Revert Commit
会新建一个 Revert “xxx Commit”的Commit记录，该记录进行的操作是将"xxx Commit"中对代码进行的修改全部撤销掉。
首先，对项目进行了代码修改，然后进行commit操作
Commit之后：
进行Revert Commit
可以看到，新增了Commit 记录【Revert “测试Revert Commit”】，该记录中将【测试Revert Commit】中对代码进行的修改删除了。
# Drop Commit（慎用）
未push的Commit记录:
会删除Commit记录，同时Commit中对代码进行的修改也会全部被删除
已push的Commit记录:
区别在于线上的Commit记录不会被删除

进行Drop Commit操作后
Commit 记录被删除，代码修改也被删除。
```



![image-20240930103822537](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240930103822537.png)



### git reset

```shell
//操作方法
git reset --hard 目标版本号

//撤销commit,并且保存提交过的内容到暂存区
git reset --soft HEAD^
//撤销commit,并且保存提交过的内容到工作区
git reset --mix HEAD^
//撤销commit,并且不保存提交过的内容（慎用）真用了不用慌，可以git reflog查看所有的提交记录，再次reset
git reset --hard HEAD^
```

### git cherry-pick

```shell
Git中cherry-pick 多个commit操作
经常需要从一个分支选择性的合并commit到另一个分支，具体可使用cherry-pick实现

经常需要从一个分支选择性的合并commit到另一个分支，具体可使用cherry-pick实现：
1.单个commit合并

git cherry-pick commit_id
2.多个连续commit合并
commit_id到commit_idn之间，包括两端

git cherry-pick commit_id..commit_idn
commit_id到commit_idn之间，非闭包

git cherry-pick （commit_id..commit_idn]
挑选多个commit:

git cherry-pick commit_id commit_idx commit_idy
3.合并过程中依次解决冲突后，继续合并
git cherry-pick --continue
```

### 常见问题

git pull 只会拉取本分支的最新代码还是 全部分支的代码

```shell
git pull 只会拉取当前分支的最新代码，而不会拉取所有分支的代码。它相当于执行了 git fetch 和 git merge，首先从远程仓库获取当前分支的更新，然后将这些更新合并到你的本地分支。如果你想要拉取所有分支的信息，可以使用 git fetch --all，但这不会自动合并。
```

git fetch 和 git pull的区别

```
git fetch 和 git pull 的主要区别在于它们的功能和目的：

git fetch：

只从远程仓库下载最新的提交和分支信息。
不会修改你的本地分支。你需要手动查看和合并这些更新。
用于获取远程状态，但保留你的本地工作状态。
git pull：

实际上是 git fetch 和 git merge 的组合。
首先拉取远程仓库的最新提交，然后将这些更新自动合并到你的当前分支。
更加直接，适合希望快速更新当前分支的情况。
总结来说，如果你想查看更新而不影响本地工作，使用 git fetch；
如果你想直接更新当前分支，可以使用 git pull
```

如何把dev分支上的最新代码合并到当前分支

```shell
要将 dev 分支上的最新代码合并到当前分支，你可以按照以下步骤操作：

确保你在当前分支上：
git checkout 当前分支名

拉取 dev 分支的最新代码：
git fetch origin dev

合并 dev 分支到当前分支：
git merge origin/dev

这将把 dev 分支的更新合并到你当前的分支上。根据合并的内容，可能会出现冲突，需要手动解决。
```

Vscode 拉取 和抓取的区别

```shell
抓取（Fetch）
Fetch（抓取）操作会从远程仓库中获取最新的提交和分支信息，但不会将这些更改合并到本地的工作分支中。它只会将远程的更新下载到本地存储区，以供查看或选择合并。

作用：
抓取后，你可以查看远程仓库的更新情况，了解其他人做了哪些修改。
它不会影响当前分支的代码，也不会造成冲突或更改。
使用场景：

如果你想先了解远程分支的最新情况再决定是否合并代码，可以使用 Fetch。
2. 拉取（Pull）
Pull（拉取）操作相当于执行 fetch + merge 的组合命令。它不仅从远程仓库获取最新的提交信息，还会自动将这些更新合并到你当前的本地分支中。

作用：

拉取操作会把远程仓库中的更新直接合并到你当前的工作分支中。
可能会导致代码冲突，因为它会尝试合并远程的改动到本地。
使用场景：

当你确定要将远程仓库的更改同步到当前分支时，可以使用 Pull。
区别总结
抓取（Fetch）： 仅获取远程分支的更新，不会对本地分支进行任何改动。
拉取（Pull）： 获取并合并远程分支的更新到当前本地分支中，可能会引发代码冲突。
在 VS Code 的 Git 面板中，你可以通过点击 "Fetch" 或 "Pull" 按钮来执行这两个操作。
```

Git 如何拉取 全部分支的最新代码

```shell
拉取远程分支信息
首先，更新远程仓库的所有分支信息（包括本地没有跟踪的分支）：
git fetch --all
fetch 只会下载更新，不会合并到你的本地分支。

检查远程分支
要查看所有的远程分支，可以使用以下命令：
git branch -r
这会列出所有远程分支。

拉取所有远程分支的最新代码
如果你已经有本地分支并且希望更新它们，可以使用以下命令同步所有分支：
git pull --all
这会在当前分支上拉取并合并对应远程分支的最新更新。

获取并切换到其他分支
如果想要切换到某个远程分支并在本地创建相应分支，可以使用：

git checkout branch_name

如果该分支在远程仓库中但本地还没有，可以使用以下命令创建并跟踪它：

git checkout -t origin/branch_name
这样，你的本地分支会跟踪远程对应的分支。


```

### 删除远程分支

```shell
删除远程分支命令：git push origin --delete branch_name
更新本地远程分支信息：git fetch -p
这样就可以删除远程分支并更新本地的分支列表了。
-p 选项表示 "prune"（修剪），会删除那些远程已经不存在的分支在本地的引用
```

## git提交多个远程仓库

Git 允许你为一个仓库配置多个远程仓库，并可以给它们不同的名称。你可以通过以下步骤添加多个远程仓库

```shell
# 查看当前远程仓库
git remote -v
# 添加新的远程仓库 假设你已经有一个名为 origin 的远程仓库，现在想添加另一个远程仓库（例如 GitLab 的），可以这样做
git remote add gitlab https://gitlab.com/yourusername/your-repo.git
现在，gitlab 就是你新添加的远程仓库
# 推送到特定的远程仓库 如果你想推送到特定的远程仓库，可以指定它的名称
git push origin main
git push gitlab main
这样你可以分别推送到 origin（例如 GitHub）和 gitlab
```

你还可以配置一个别名，将多个远程仓库设置在一起，以便一次性推送到所有仓库

```shell
# 为多个远程仓库创建一个别名： 打开 .git/config 文件，并为 origin 添加多个 URL
[remote "origin"]
    url = https://github.com/yourusername/your-repo.git
    url = https://gitlab.com/yourusername/your-repo.git
# 推送到所有远程仓库： 使用以下命令即可一次性推送到所有配置在 origin 下的远程仓库
git push origin main
```

```js
git remote add github git@github.com:SakuraMuxia/document.git
```

### 更改远程仓库的别名

```shell
# 使用 git remote rename 命令 执行以下命令，将 origin 更改为 gitee
git remote rename origin gitee
# 验证更改
git remote -v
# 输出应该类似于以下内容，显示新的远程别名
gitee  git@gitee.com:sakuramuxia/documents.git (fetch)
gitee  git@gitee.com:sakuramuxia/documents.git (push)
# 推送到新的远程别名
git push gitee main
```

**main分支和master分支**

```js
在 Git 中，main 和 master 分支并不具有技术上的差异，它们都是分支的名称。master 是 Git 默认的主分支名称，历史上大多数项目都会使用这个名称。然而，近年来，尤其是由于对语言和用词敏感性的增加，许多项目开始将主分支名称更改为 main

名称变化的背景

master 分支: 在 Git 的早期版本中，master 是默认的主分支名称。这一名称在过去的几年中因其潜在的种族歧视含义而受到关注。
main 分支: 作为对这一关注的回应，许多开源项目和开发者开始将默认主分支改名为 main。例如，GitHub 在 2020 年开始将新的仓库的默认分支名称设置为 main，以促进更包容的语言使用。

2. 使用上的差异
默认分支: 在新项目中，你可能会看到 main 作为默认分支，而在旧项目中，依然可能使用 master。
操作和功能: 无论是 main 还是 master，它们的功能是相同的，都是用于主开发线的分支。

3. 如何更改默认分支名称
如果你有一个项目使用 master 分支，并希望将其更改为 main，可以使用以下命令：

git branch -m master main  # 将 master 重命名为 main
git push -u origin main    # 推送新的 main 分支并设置跟踪
```

```js
在许多情况下，用户会将命令简化。例如：
git push 如果没有指定远程仓库和分支，Git 会推送到配置的默认远程仓库和分支。
```

### 删除远程仓库

```shell
# 删除指定的远程仓库
git remote -v
git remote remove origin
```

