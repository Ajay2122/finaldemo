const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // If the error does not have a specific status code, default to 400 (Internal Server Error)
  err.status = err.status || "error"; // If the error does not have a specific status, default to "error"

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
