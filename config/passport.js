import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../db/queries.js";
import { validPassword } from "../lib/passwordUtils.js";
import pool from "../db/pool.js";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  try {
    //get user from username
    const user = await db.getUserByEmail(email);

    //if doesnt exist return done(null,false)
    if (!user) return done(null, false, { message: "Incorrect email" });

    //else check password
    const match = validPassword(password, user.password, user.salt);

    //if its false return done(null,false)
    if (!match) return done(null, false, { message: "Incorrect password" });
    //else was successfull return done(null,user)
    return done(null, user);

    //catch err return done(err)
  } catch (err) {
    return done(err);
  }

  //catch err return done(err)
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE userid = $1", [
      id,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
