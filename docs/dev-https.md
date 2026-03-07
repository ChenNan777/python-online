# 内网 HTTPS 调试

项目已经支持在开发环境下自动读取本地证书启用 `HTTPS`。

## 证书文件位置

- 默认私钥：`.cert/dev-key.pem`
- 默认证书：`.cert/dev-cert.pem`

只要这两个文件存在，`vite` 会自动启用 `HTTPS`。

## 推荐生成方式

使用 `mkcert` 为 `localhost`、`127.0.0.1` 和你的内网 IP 生成证书。

示例：

```bash
mkcert -install
mkcert -key-file .cert/dev-key.pem -cert-file .cert/dev-cert.pem localhost 127.0.0.1 ::1 192.168.1.10
```

请把 `192.168.1.10` 替换成你自己的内网 IP。

## 启动方式

```bash
npm run dev -- --host
```

访问：

```text
https://你的内网IP:5173
```

## 验证

浏览器控制台执行：

```js
window.isSecureContext
window.crossOriginIsolated
```

期望结果：

- `true`
- `true`

## 自定义证书路径

可通过环境变量覆盖默认路径：

- `VITE_DEV_HTTPS_KEY_PATH`
- `VITE_DEV_HTTPS_CERT_PATH`

## 临时关闭 HTTPS

如果需要临时回退到 HTTP：

```bash
VITE_DEV_HTTPS=false npm run dev -- --host
```
