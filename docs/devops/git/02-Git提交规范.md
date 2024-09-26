# 提交规范

## 表情库大全

```shell
https://gitmoji.dev/
```

表情插件

```js
vscode ：gitmoji
```

## 规范

```js
Conventional Commits 是由众多开源项目贡献者共同约定的一个规范，用来约定 Git Commit 内容的书写方式，让 commit 内容更有价值、条理，使提交历史明确可追溯。

格式如下：

<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>

提交消息由页眉、正文和页脚组成，由空行分隔。

提交消息头(commit message header)
Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。
subject 是 commit 目的的简短描述，不超过 50/80 个字符
不超过 50 个字的摘要，首字母大写，使用祈使语气，结尾不加标点符号
消息的第一行，应该是一个简短的描述，不超过50个字符。它应该清楚地表明变更的目的或意图，并且使用了明确的语言。常用的动词包括：
Add：新增功能或文件
Fix：修复 bug
Change：更改已有代码
Refactor：重构代码，即不修改功能的改变
Remove：删除文件或功能
Document：修改文档
Style：修改不影响代码运行的样式，如空格、缩进等
Test：增加或修改测试

scope
再是scope，选填，用于阐明本次commit 影响的范围，如与数据预处理相关、某模块功能相关等

body
选填，详细描述本次的commit，一般小的修改在上面description即可描述清楚，而重大更新尽量把body写的详尽，可分行
Body 部分是对 commit 内容的详细描述，它应该解释代码变更的动机，并且提供与 commit 目的相关的背景信息。Body 应该包含修改的动机，与其他相关的修改如何交互，以及是如何实现的。

footer
一般只涉及BREAKING CHANGE和ISSUE相关
BREAKING CHANGE：比如涉及重大变更则本部分为必填项，类似版本升级、接口变更等
ISSUE相关：如当前 commit 针对某个issue，可进行引用/关闭
```

**使用示例1**

```shell
# 带有description和 breaking change footer的commit
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files

# 使用!提交消息以引起对重大更改的注意
feat!: send an email to the customer when a product is shipped

# 提交带有范围和!的消息
feat(api)!: send an email to the customer when a product is shipped

# 提交带有!和BREAKING CHANGE footer的消息
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.

# 提交没有正文的消息
docs: correct spelling of CHANGELOG

# 提交具有多段落body和多个footer的消息
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

**使用示例2**

```shell
# headr: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer:
# - Include a link to the issue.
# - BREAKING CHANGE
#
```

**使用示例3**

```jsx
Fix: 修复登录失败时未清除token的问题

在用户登录失败时，token可能被错误地清除。这个问题在某些特定条件下才会出现，并且可能导致用户登录状态丢失。

修复方法：只有在登录成功后才清除token。

Closes #123
```

**使用示例4**

```jsx
feat(auth): 添加用户登录功能

实现了用户认证的后端逻辑，增加了登录页面和表单验证。
- 用户可以通过电子邮件和密码登录
- 增加了错误处理和验证逻辑
- 更新了相关的 API 文档

Fixes #123
```

## type

```jsx
用于说明git commit的类别，只允许使用下面的标识。

feat：新功能（feature）。
fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。
fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
docs：文档（documentation）。
update:更新
style：格式（不影响代码运行的变动）。
refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
perf：优化相关，比如提升性能、体验。
test：增加测试。
build: 构建依赖更改
ci: 更改 CI 配置文件或者脚本
chore：更改构建流程、或者增加依赖库、工具等
revert：回滚到上一个版本。
merge：代码合并。
sync：同步主线或分支的Bug。
add: 新增功能
fix: 修改 bug
docs: 文档修改
merge: 代码合并
deps: 升级依赖
release: 发布新版本

workflow: 工作流相关文件修改
ci: 持续集成相关文件修改
build: 影响项目构建或依赖项修改
perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
chore: 修改工具相关（不在上述类型中的修改，改变构建流程、或者增加依赖库、工具等）
types：  类型定义文件更改
wip： 开发中

release描述
【新增】支持usbip映射功能
【下架】下架vpro设备睡眠功能
【优化】锁定客户端升级为需强制登录，并支持更多解锁方式
```
