const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// Routes
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const hubPostRoutes = require("./routes/hubPost.routes");
const clientRoutes = require("./routes/client.routes");
const serviceRoutes = require("./routes/services.routes");
const quotesRoutes = require("./routes/quotes.routes");
const projectRoutes = require("./routes/project.routes");
const mailRoutes = require("./routes/mail.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();
app.use(
  cors({
    origin: '*'
  })
);
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests s$
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('*/files', express.static('/home/ubuntu/Bnzero/backend-cotizador/files'))

// Settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

// Middlewares

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hubpost", hubPostRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/admin", adminRoutes);

module.exports = {
  app,
};
