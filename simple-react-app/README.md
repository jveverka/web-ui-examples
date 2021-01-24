# Simple React App

### Serve using NGINX
```
sudo apt install nginx
sudo systemctl start nginx 
sudo systemctl stop nginx 
sudo systemctl restart nginx
```
Edit ``/etc/nginx/sites-enabled/default``
```
server {
  listen 8070 default_server;
  root /path/to/static/web/root;
  index index.html;
  server_name default_server;
  location / {
      try_files $uri $uri/ =404;
  }
}
```

### References
* [React Docs](https://reactjs.org/docs/getting-started.html)
