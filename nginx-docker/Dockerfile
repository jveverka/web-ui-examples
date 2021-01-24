FROM nginx:1.19.4-alpine
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/default.conf
RUN mkdir -p /webroot