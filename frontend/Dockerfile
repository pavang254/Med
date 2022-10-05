#React
FROM node:16.17.1-alpine3.15 AS builder

WORKDIR /react

#install dependencies
COPY . ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"
#expose port for development
#EXPOSE 3000

#production build
RUN npm run build

#Time-zone
ENV TZ="Asia/Kolkata"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

FROM nginx:1.22.0
# RUN apt-get --no-cache add curl
# RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
#     chmod +x envsubst && \
#     mv envsubst /usr/local/bin
# COPY ./nginx.config /etc/nginx/nginx.template
# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
COPY --from=builder /react/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]