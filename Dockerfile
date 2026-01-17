FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

RUN mkdir -p /usr/share/nginx/html/IntroComponentWithSignupForm

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/IntroComponentWithSignupForm/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
