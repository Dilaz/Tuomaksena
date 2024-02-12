FROM nginx:stable-alpine
COPY *.html *.ico *.json /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY images /usr/share/nginx/html/images
COPY js /usr/share/nginx/html/js
COPY default.conf /etc/nginx/default.conf

EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

