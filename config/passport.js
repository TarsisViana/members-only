import { use, serializeUser, deserializeUser } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUser } from "../db/queries.js";
import { validPassword } from "../lib/passwordUtils.js";
import { query } from "../db/pool.js";

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = async (username, password, done) => {
  try {
    //get user from username
    const user = await getUser(username);

    //if doesnt exist return done(null,false)
    if (!user) return done(null, false, { message: "Incorrect username" });

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

use(strategy);

serializeUser((user, done) => {
  done(null, user.id);
});

deserializeUser(async (id, done) => {
  try {
    const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
