# project-group-notable-nightingales


# How to Start Project
<h3>
The project is deployed as a whole in Docker containers using Docker Compose, with Nginx serving as a reverse proxy.
<h3>

## Installing and configuring Docker
----
### Installation Steps--Windows/Mac
1. Visit the Docker Desktop for Windows download page: [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. Click on "Get Docker" to download the Docker Desktop Installer.

3. Open the downloaded Docker Desktop Installer file and follow the prompts to complete the installation.

4. Once the installation is complete, Docker Desktop will automatically start. You can find the Docker icon in the system tray, indicating that Docker is running.

5. Open a command-line window (e.g., PowerShell) and enter `docker version` to verify if the installation was successful.

#### Problem
`Docker Desktop requires a newer WSL kernel version.`
<h4>   
If you encounter an error stating that the WSL (Windows Subsystem for Linux) kernel version on your Windows system is outdated, and Docker Desktop requires a newer version to function properly.
<h4>

### Solve Problem
<h4>
To install the WSL2 Linux kernel update, follow the steps below:

1. Run the [wsl_update_x64.msi](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package) file that you downloaded earlier to install the WSL2 Linux kernel update.

2. After the installation is complete, restart your computer.

3. Once your computer has restarted, search for "WSL" in the Microsoft Store and choose a Linux distribution (e.g., Ubuntu).

4. Click on "Get" or "Install" to begin the installation of the chosen Linux distribution.

5. After the installation is complete, you can use the following command to launch the installed Linux distribution (e.g., Ubuntu):

   ```shell
   wsl -d Ubuntu
<h4>

# Use Docker to Start Project
1. Navigate directly to the project directory (project-group-notable-nightingales-main) and open the terminal.

2. Run the following command to build and start your Docker containers:     
` docker-compose up -d --build `

3. Wait for the containers to build and start. Once they are up and running, you can see the logs and monitor their status.
```csharp
Network project-group-notable-nightingales-main_default  Created   
Container frontend                                       Started   
Container server                                         Started    
Container mongo                                          Started    
Container nginx                                          Started   
```
4. You can see the Containers in DockerDeskTop
[DockerExample](DockerDeskTop.png)   
 
5. Open your preferred web browser, Enter the following URL in the address bar: `http://localhost/login`
You can see the Project.

6. Once the Docker Desktop server is running, the project can continue to run, and the uploaded records will be saved, regardless of whether you open and run the project in VS Code.
- Restarting the server in Docker Desktop: You can restart the server directly within Docker Desktop.
- Removing the server: If needed, you can remove the server from Docker Desktop
- Shutting down the server using the terminal: You can use the command `docker-compose down in` the terminal to shut down the server. After shutting down the server, if you want to start it again, you can use the command `docker-compose up -d --build` to rebuild and start the server.


