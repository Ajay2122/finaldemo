class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // Calls the constructor of the parent Error class and sets the error message

    this.statusCode = statusCode; // Assigns the provided status code to the 'statusCode' property of the error instance

    Error.captureStackTrace(this, this.constructor); // Captures the stack trace of the error instance
  }
}

module.exports = AppError;
