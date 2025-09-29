function NotFoundHandler(app) {
  app.use((req, res) => {
    return res.status(404).json({
      message: "Not Found Route",
    });
  });
}

module.exports = NotFoundHandler;
