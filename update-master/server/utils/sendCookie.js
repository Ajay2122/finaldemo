const sendCookie = (user, statusCode, res, token) => {
  // Define options for the cookie
  const options = {
    maxAge: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), // Calculate the expiration time of the cookie based on the COOKIE_EXPIRE value in the environment variables
    httpOnly: true, // Set the cookie as httpOnly to prevent client-side access
  };

  // Set the status, cookie, and response
  res.status(statusCode) // Set the HTTP status code of the response
    .cookie("token", token, options) // Set the "token" cookie with the provided token and options
    .json({
      success: true,
      user,
    }); // Send a JSON response with success status and user object
};

module.exports = sendCookie;
