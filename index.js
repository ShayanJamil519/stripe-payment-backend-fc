const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const mainRoutes = require("./routes/index.route");

app.use(express.json());

app.use(cors());

app.options("*", cors());

app.use(mainRoutes);


// Handling Uncaught Exception:

process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the app due to unhandled exception`);
  process.exit(1);
});

// Unhandled Promise Rejection:

process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the app due to Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});


const server = app.listen(5000, () => {
  console.log(`Server is up and running on port: ${5000}`);
});

module.exports = app;
