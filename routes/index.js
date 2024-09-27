import { Router } from "express";
const router = Router();
import passport from "passport";
import { newMember } from "../controllers/register-controllers.js";
import { isAuth } from "../controllers/auth-middleware.js";
import { getHomepage } from "../controllers/index-controllers.js";
import { getFeed } from "../controllers/feed-controllers.js";
import { newMessage } from "../controllers/messages-controller.js";
import memberRouter from "./member.js";

/**
 * -------------- POST ROUTES ----------------
 */

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/feed",
  })
);

router.post("/register", newMember);
router.post("/new-message", isAuth, newMessage);
router.post;

/**
 * -------------- GET ROUTES ----------------
 */

router.get("/", getHomepage);

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/register", (req, res, next) => {
  res.render("sign-up-form");
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send(
    '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
  );
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
});

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.");
});

router.get("/feed", getFeed);
router.get("/new-message", isAuth, (req, res) => {
  res.render("new-message-form");
});

router.use("/member", memberRouter);

export default router;
