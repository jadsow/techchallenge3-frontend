FROM node:22-alpine AS builder

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
COPY vite.config.* ./
COPY tsconfig*.json ./
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
