FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_BASE_PATH=/IntroComponentWithSignupForm/
ENV VITE_BASE_PATH=$VITE_BASE_PATH
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir -p /usr/share/nginx/html/IntroComponentWithSignupForm
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/IntroComponentWithSignupForm/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]