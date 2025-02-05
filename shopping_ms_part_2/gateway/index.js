const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(express.json());
app.use(cors());

// Middleware to log the incoming route
app.use((req, res, next) => {
  console.log(`Incoming request path: ${req.path}`);
  next();
});

app.use("/customer", proxy("http://localhost:8001"));
app.use("/shopping", proxy("http://localhost:8002"));
app.use("/", proxy("http://localhost:8003"));

app.listen(8000, () => {
  console.log("Gateway is listening on port 8000");
});
