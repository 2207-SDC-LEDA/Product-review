FROM node:16

# 安裝Redis
# RUN apt-get update && \
#     apt-get install -y redis-server

# 設定Redis以在容器启动时启动
# RUN mkdir /var/run/redis && \
#     sed -i 's/^daemonize yes$/daemonize no/' /etc/redis/redis.conf && \
#     sed -i 's/^bind 127.0.0.1 ::1$/bind 0.0.0.0/' /etc/redis/redis.conf && \
#     echo 'unixsocket /var/run/redis/redis.sock' >> /etc/redis/redis.conf && \
#     echo 'unixsocketperm 777' >> /etc/redis/redis.conf && \
#     ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime && \
#     echo "Asia/Taipei" > /etc/timezone && \
#     service redis-server restart

WORKDIR /product-review
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
# CMD ["node", "server.js"]
CMD ["npm", "run", "newrelic"]