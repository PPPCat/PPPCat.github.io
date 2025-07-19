# Git

## 1.Git介绍

Git是开源的版本控制系统，常用于项目的代码管理、文件管理等。

**历史记录**，可随时翻看历史修改，复原不正确的修改

**跟踪记录**，跟踪记录项目版本迭代过程，方便旧版本回滚、抽离

**保持文件一致性**，帮助团队并行开发

## 2.Git工作原理

Git的本地数据管理分为3个区域：工作区、暂存区、本地仓库

- **工作区：**就是你在电脑里能看到的目录。
- **暂存区：**英文叫 stage 或 index。一般存放在 **.git** 目录下的 index 文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）。
- **版本库：**工作区有一个隐藏目录 **.git**，这个不算工作区，而是 Git 的版本库。

![1352126739_7909](D:\PPPcat\PPPCat.github.io\src\img\1352126739_7909.jpg)

- 图中左侧为工作区，右侧为版本库。在版本库中标记为 "index" 的区域是暂存区（stage/index），标记为 "master" 的是 master 分支所代表的目录树。
- 图中我们可以看出此时 "HEAD" 实际是指向 master 分支的一个"游标"。所以图示的命令中出现 HEAD 的地方可以用 master 来替换。
- 图中的 objects 标识的区域为 Git 的对象库，实际位于 ".git/objects" 目录下，里面包含了创建的各种对象及内容。
- 当对工作区修改（或新增）的文件执行 **git add** 命令时，暂存区的目录树被更新，同时工作区修改（或新增）的文件内容被写入到对象库中的一个新的对象中，而该对象的ID被记录在暂存区的文件索引中。
- 当执行提交操作（git commit）时，暂存区的目录树写到版本库（对象库）中，master 分支会做相应的更新。即 master 指向的目录树就是提交时暂存区的目录树。
- 当执行 **git reset HEAD** 命令时，暂存区的目录树会被重写，被 master 分支指向的目录树所替换，但是工作区不受影响。
- 当执行 **git rm --cached <file>** 命令时，会直接从暂存区删除文件，工作区则不做出改变。
- 当执行 **git checkout .** 或者 **git checkout -- <file>** 命令时，会用暂存区全部或指定的文件替换工作区的文件。这个操作很危险，会清除工作区中未添加到暂存区中的改动。
- 当执行 **git checkout HEAD .** 或者 **git checkout HEAD <file>** 命令时，会用 HEAD 指向的 master 分支中的全部或者部分文件替换暂存区和以及工作区中的文件。这个命令也是极具危险性的，因为不但会清除工作区中未提交的改动，也会清除暂存区中未提交的改动。

### 1、工作区（Working Directory）

工作区是你在本地计算机上的项目目录，你在这里进行文件的创建、修改和删除操作。工作区包含了当前项目的所有文件和子目录。

**特点：**

- 显示项目的当前状态。
- 文件的修改在工作区中进行，但这些修改还没有被记录到版本控制中。

### 2、暂存区（Staging Area）

暂存区是一个临时存储区域，它包含了即将被提交到版本库中的文件快照，在提交之前，你可以选择性地将工作区中的修改添加到暂存区。

**特点：**

- 暂存区保存了将被包括在下一个提交中的更改。
- 你可以多次使用 `git add` 命令来将文件添加到暂存区，直到你准备好提交所有更改。

**常用命令：**

```
git add filename       # 将单个文件添加到暂存区
git add .              # 将工作区中的所有修改添加到暂存区
git status             # 查看哪些文件在暂存区中
```

### 3、版本库（Repository）

版本库包含项目的所有版本历史记录。

每次提交都会在版本库中创建一个新的快照，这些快照是不可变的，确保了项目的完整历史记录。

**特点：**

- 版本库分为本地版本库和远程版本库。这里主要指本地版本库。
- 本地版本库存储在 `.git` 目录中，它包含了所有提交的对象和引用。

**常用命令：**

```
git commit -m "Commit message"   # 将暂存区的更改提交到本地版本库
git log                          # 查看提交历史
git diff                         # 查看工作区和暂存区之间的差异
git diff --cached                # 查看暂存区和最后一次提交之间的差异
```

### 工作区、暂存区和版本库之间的关系

**1、工作区 -> 暂存区**

使用 git add 命令将工作区中的修改添加到暂存区。

```
git add filename
```

**2、暂存区 -> 版本库**

使用 git commit 命令将暂存区中的修改提交到版本库。

```
git commit -m "Commit message"
```

**3、版本库 -> 远程仓库**

使用 git push 命令将本地版本库的提交推送到远程仓库。

```
git push origin branch-name
```

**4、远程仓库 -> 本地版本库**

使用 git pull 或 git fetch 命令从远程仓库获取更新。

```
git pull origin branch-name
# 或者
git fetch origin branch-name
git merge origin/branch-name
```



## 3.GIt客户端、服务端安装

**私有化部署Git服务推荐docker形式安装Gitlab**

1.下载GItlab镜像

```
docker pull gitlab/gitlab-ce
```

2.启动GItlab容器

```
docker run --detach \
           --publish 80:80\
           --name gitlab\
           --restart always\
           -e TZ="Asia/Shanghai"
           gitlab\gitlab-ce
```

部署结束可用服务器ip打开管理网站

**Git客户端安装**

1.Windows -下载Git for Windows

```
git --version
```

检查安装是否成功

## 4.GIt操作流

#### 新建仓库

创建新文件夹，打开，然后执行

```bash
git init
```

以创建新的git仓库

#### 检出仓库

执行如下命令以创建一个本地仓库的克隆版本

```bash
git clone /path/to/repository
```

如果是远端服务器上的仓库，你的命令会是这个样子

```bash
git clone username@host:/path/to/repository
```

#### 工作流

你的本地仓库由 git 维护的三棵“树”组成。第一个是你的 `工作目录`，它持有实际文件；第二个是 `暂存区（Index）`，它像个缓存区域，临时保存你的改动；最后是 `HEAD`，它指向你最后一次提交的结果

![trees](D:\PPPcat\PPPCat.github.io\src\img\trees.png)

#### 添加和提交

你可以提出更改（把它们添加到暂存区），使用如下命令

```bash
git add <filename>
git add *
```

这是 git 基本工作流程的第一步；使用如下命令以实际提交改动

```bash
git commit -m "代码提交信息"
```

现在，你的改动已经提交到了 **HEAD**，但是还没到你的远端仓库

#### 推送改动

你的改动现在已经在本地仓库的 **HEAD** 中了。执行如下命令以将这些改动提交到远端仓库

```bash
git push origin master
```

可以把 *master* 换成你想要推送的任何分支

如果你还没有克隆现有仓库，并欲将你的仓库连接到某个远程服务器，你可以使用如下命令添加

```
git remote add origin <server>
```

如此你就能够将你的改动推送到所添加的服务器上去了

#### 分支

分支是用来将特性开发绝缘开来的。在你创建仓库的时候，*master* 是“默认的”分支。在其他分支上进行开发，完成后再将它们合并到主分支上

![branches](D:\PPPcat\PPPCat.github.io\src\img\branches.png)

创建一个叫做“feature_x”的分支，并切换过去

```bash
git checkout -b feature_x
```

切换回主分支

```bash
git checkout master
```

再把新建的分支删掉

```bash
git branch -d feature_x
```

除非你将分支推送到远端仓库，不然该分支就是 *不为他人所见的*

```bash
git push origin <branch>
```

更新与合并

要更新你的本地仓库至最新改动，执行

```bash
git pull
```

以在你的工作目录中 *获取（fetch）* 并 *合并（merge）* 远端的改动。
要合并其他分支到你的当前分支（例如 master），执行

```bash
git merge <branch>
```

在这两种情况下，git 都会尝试去自动合并改动。遗憾的是，这可能并非每次都成功，并可能出现*冲突（conflicts）*。 这时候就需要你修改这些文件来手动合并这些*冲突（conflicts）*。改完之后，你需要执行如下命令以将它们标记为合并成功

```bash
git add <filename>
```

在合并改动之前，你可以使用如下命令预览差异

```
git diff <source_branch> <target_branch>
```

#### 标签

为软件发布创建标签是推荐的。这个概念早已存在，在 SVN 中也有。你可以执行如下命令创建一个叫做 *1.0.0* 的标签

```bash
git tag 1.0.0 1b2e1d63ff
```

*1b2e1d63ff* 是你想要标记的提交 ID 的前 10 位字符。可以使用下列命令获取提交 ID

```bash
git log
```

你也可以使用少一点的提交 ID 前几位，只要它的指向具有唯一性

#### 替换本地改动

如你操作失误（当然，这最好永远不要发生），你可以使用如下命令替换掉本地改动

```bash
git checkout -- <filename>
```

此命令会使用 HEAD 中的最新内容替换掉你的工作目录中的文件。已添加到暂存区的改动以及新文件都不会受到影响。

假如你想丢弃你在本地的所有改动与提交，可以到服务器上获取最新的版本历史，并将你本地主分支指向它

```bash
it fetch origin
git reset --hard origin/master
```

#### 实用小贴士

内建的图形化 git

```bash
gitk
```

彩色的 git 输出

```bash
git config color.ui true
```

显示历史记录时，每个提交的信息只显示一行

```bash
git config format.pretty oneline
```

交互式添加文件到暂存区

```bash
git add -i
```

