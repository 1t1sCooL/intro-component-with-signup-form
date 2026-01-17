FROM node:20-slim AS build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir -p /usr/share/nginx/html/IntroComponentWithSignupForm

COPY nginx.conf /etc/nginx/nginx.conf.template

COPY --from=build /app/dist /usr/share/nginx/html/IntroComponentWithSignupForm/

EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst '${MAILER_API_KEY}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]