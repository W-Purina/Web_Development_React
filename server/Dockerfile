FROM node:14

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目源代码到工作目录
COPY . .

# 暴露后端服务所需的端口，例如 3000
EXPOSE 3000

# 启动后端服务
CMD ["npm", "start"]
