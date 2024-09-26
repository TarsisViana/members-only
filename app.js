import express from "express";

import "dotenv/config";
import session from "express-session";
import connectPg from "connect-pg-simple";
import crypto from "crypto";
import passport from "passport";

import pgPool from "./db/pool.js";

import indexRouter from "./routes/index.js";

//--create express app
const app = express();

app.use(express.urlencoded({ extended: true }));

//--set up views
app.set("view engine", "ejs");

//--session setup
const pgSession = connectPg(session);
app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool
      createTableIfMissing: true,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

//--passport authentication
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

//--routes
app.use("/", indexRouter);

//--server
app.listen(process.env.SERVER_PORT, () => {
  console.log("server online on: " + process.env.SERVER_PORT);
});
