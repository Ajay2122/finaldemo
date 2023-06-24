const dotenv = require("dotenv");

// environment variables from .env file
dotenv.config();

const app = require("./App");

// Set up CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const port = process.env.PORT;

// Start the server
app.listen(port, (res, req) => {
  console.log(`Server listening on port ${port}`);
});
