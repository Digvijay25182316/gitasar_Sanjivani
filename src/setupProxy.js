const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/sanjivani", // Assuming '/sanjivani' is the path prefix for your server endpoint
    createProxyMiddleware({
      target: "https://sanjivani-lms.ap-south-1.elasticbeanstalk.com", // Your HTTPS endpoint
      changeOrigin: true,
      secure: false, // Disable SSL certificate verification
    })
  );
};
