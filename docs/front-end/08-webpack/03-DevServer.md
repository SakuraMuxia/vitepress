# devServer.proxy

当拥有单独的 API 后端开发服务器并且希望在同一域上发送 API 请求时，代理某些 URL 可能会很有用。

开发服务器使用功能强大的 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) 软件包。 查看其 [documentation](https://github.com/chimurai/http-proxy-middleware#options) 了解更多高级用法。 请注意，`http-proxy-middleware` 的某些功能不需要`target`键，例如 它的 `router` 功能，但是仍然需要在此处的配置中包含`target`，否则`webpack-dev-server` 不会将其传递给 `http-proxy-middleware`。

使用后端在 `localhost:3000` 上，可以使用它来启用代理：

```javascript
// **webpack.config.js**
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};
```

现在，对 `/api/users` 的请求会将请求代理到 `http://localhost:3000/api/users`。

如果不希望传递`/api`，则需要重写路径：

```javascript
// **webpack.config.js**
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
```

默认情况下，将不接受在 HTTPS 上运行且证书无效的后端服务器。 如果需要，可以这样修改配置：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false,
      },
    },
  },
};
```

如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 `context` 属性的对象的数组：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
      },
    ],
  },
};
```

默认情况下，代理时会保留主机头的来源，可以将 `changeOrigin` 设置为 `true` 以覆盖此行为。 在某些情况下，例如使用 [name-based virtual hosted sites](https://en.wikipedia.org/wiki/Virtual_hosting#Name-based)，它很有用。

```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
};
```

