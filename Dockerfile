FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

RUN mkdir -p /etc/nginx/templates

COPY default.conf.template /etc/nginx/templates/default.conf.template

RUN mkdir -p /usr/share/nginx/html/IntroComponentWithSignupForm
COPY --from=build /app/dist /usr/share/nginx/html/IntroComponentWithSignupForm/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]