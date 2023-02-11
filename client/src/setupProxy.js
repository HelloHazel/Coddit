const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://175.202.196.211:5000",
      changeOrigin: true,
    })
  );
};
