# 如何启动整体的项目
<h3>
该项目使用 Docker Compose 整体部署在 Docker 容器中，Nginx 作为反向代理服务器，因此需要使用docker进行项目的部署，让整体的服务器开启变得更加简单快捷
<h3>

## 安装和配置 Docker
----
### 安装步骤 - Windows/Mac
1.访问 Docker Desktop for Windows 下载页面：Docker Desktop

2.点击“获取 Docker”下载 Docker Desktop 安装程序。

3.打开下载的 Docker Desktop 安装程序文件，按提示完成安装。

4.安装完成后，Docker Desktop 将自动启动。您可以在系统托盘中找到 Docker 图标，表示 Docker 正在运行。

5.打开命令行窗口（例如 PowerShell），输入 docker version 来验证安装是否成功。

#### 可能出现的问题
`Docker Desktop requires a newer WSL kernel version.`
<h4>   
如果您遇到一个错误，提示您的 Windows 系统上的 WSL（Windows 子系统 for Linux）内核版本过旧，Docker Desktop 需要更新版本才能正常运行。
<h4>

### 解决问题
<h4>
按照以下步骤安装 WSL2 Linux 内核更新：

1. 运行您之前下载的[wsl_update_x64.msi](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package) 文件以安装 WSL2 Linux 内核更新。

2.安装完成后，重启您的电脑。

3. 电脑重启后，在微软商店搜索“WSL”并选择一个 Linux 发行版（例如 Ubuntu）。

4. 点击“获取”或“安装”开始安装所选的 Linux 发行版。

5. 安装完成后，您可以使用以下命令启动安装的 Linux 发行版（例如 Ubuntu）：
   ```shell
   wsl -d Ubuntu
<h4>

# 使用 Docker 启动项目
1. 直接导航到项目目录，打开终端。

2. 运行以下命令来构建并启动您的 Docker：  
` docker-compose up -d --build `

3. 等待容器构建并启动。一旦它们运行起来，您可以查看日志并监控它们的状态。
```csharp
Network project-group-notable-nightingales-main_default  Created   
Container frontend                                       Started   
Container server                                         Started    
Container mongo                                          Started    
Container nginx                                          Started   
```
4. 您可以在 DockerDeskTop 中看到容器
[DockerExample-images](images/DockerDesktop.png)   
 
5. 打开您喜欢的网络浏览器，在地址栏输入以下 URL： `http://localhost/login`

6. 一旦 Docker Desktop 服务器运行，项目可以继续运行，上传的记录将被保存，无论您是否在 VS Code 中打开并运行项目。

-在 Docker Desktop 中重启服务器：您可以直接在 Docker Desktop 中重启服务器。
-删除服务器：如果需要，您可以从 Docker Desktop 中删除服务器。
-使用终端关闭服务器：您可以在终端中使用命令 docker-compose down 来关闭服务器。关闭服务器后，如果您想再次启动它，可以使用命令 docker-compose up -d --build 重新构建并启动服务器。


# 项目功能
## [登录](images/login.png)
<h4>
访问页面时，用户将被提示登录。如果他们没有账户，可以点击“注册”按钮。对于现有用户，他们需要输入他们的电子邮件和密码。如果凭证正确，他们将被重定向到仪表盘。如果凭证不正确，将显示错误消息。
<h4>

## [注册](images/register.png)
进入注册页面后，用户需要输入所有要求的信息。

 **密码长度至少为6个字符，且包括大写字母、小写字母和数字的组合**
如果不符合这些要求，将导致注册尝试失败，并出现错误消息。

**不允许重复注册**
成功注册后，用户将被重定向到登录页面，在那里他们可以输入相应的电子邮件和密码进行登录。

### [例子](images/Register-eg.png)

## [显示页面](images/dashboard.png)
登录仪表板后，它将显示用户的个人头像、全名、余额以及用户所属的小组。此外，在右下角有一个加号图标，允许用户[加入新的小组](images/AddGroup.png).
                           
点击加号图标将重定向你到“添加小组”页面，在那里需要添加相应的描述并选择小组成员。
                        
[用户信息](images/update-user.png)
点击头像将重定向你到“个人信息”页面，在那里你可以修改你的个人信息。点击“登出”将允许你登出并返回登录页面。更新信息时，点击“更新”将触发个人信息更新过程。

仪表板显示个人加入的所有小组。点击任何一个小组，你可以查看与该小组相关的最近支出和具体金额。
   
## [小组订单](images/GroupOrders.png)
在小组订单页面顶部有两个按钮： 

### [GroupMember](images/Groups-control.png)
“管理小组成员”按钮：此按钮允许你搜索和管理小组的成员。你可以进行诸如添加或移除成员、更新成员信息或调整小组内成员角色等更改。

### [日历](images/date.png)
“按年月查看支出”按钮：此按钮允许你查看按年月分类的支出。你可以选择特定的年份和月份来查看该时期的支出细分及其对应的目的地。

## [订单详细](images/order-detail.png)
小组订单页面将显示小组内的最近支出及相应金额。

## [添加订单信息](images/AddOrder.png)
在小组订单页面下方点击加号图标将重定向你到“添加订单信息”页面。在这里，你可以输入商店名称、总支出，并上传照片由 ChatGPT 进行分析和处理。总价将被提取并显示为输出。
