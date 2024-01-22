FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install

COPY . .
RUN ng build --configuration=production --output-path=dist/frontend

FROM nginx:alpine

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
