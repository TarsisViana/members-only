import { Router } from "express";
const router = Router();
import passport from "passport";
import { isAuth } from "../controllers/auth-middleware.js";

//testing using a middleware to verify every path in the router
router.use(isAuth);

router.get("/", (req, res) => {
  res.render("become-a-member");
});

export default router;