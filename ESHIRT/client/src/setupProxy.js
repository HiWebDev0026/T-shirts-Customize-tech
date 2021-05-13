const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
  app.use("/*", createProxyMiddleware({ target: "http://localhost:3001" }));
};
