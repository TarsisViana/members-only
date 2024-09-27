import db from "../db/queries.js";
import { validPassword } from "../lib/passwordUtils.js";

export async function addMember(req, res) {
  const password = req.body.memberPw;

  const secret = await db.getSecret();

  const matchMember = validPassword(
    password,
    secret[0].password,
    secret[0].salt
  );
  if (matchMember) {
    await db.makeMember(req.user.userid);
    res.redirect("/feed");
  } else {
    res.render("become-a-member", { errors: [{ msg: "password incorrect" }] });
  }
}