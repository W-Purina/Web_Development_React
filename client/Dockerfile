# 使用官方的Node.js镜像作为基础镜像
FROM node:14 AS build-stage

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY client/package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目源代码到工作目录
COPY client/ .

# 构建生产版本的前端应用
RUN npm run build

RUN mkdir -p /output && cp -R /app/dist /output/dist

# 使用 Nginx 镜像作为基础镜像
FROM nginx:latest

# 将构建好的前端应用复制到 Nginx 镜像中
COPY --from=build-stage /app/dist /usr/share/nginx/html

#复制Nignx配置文件到镜像
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 服务的端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]



