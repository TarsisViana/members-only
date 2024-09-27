import db from "../db/queries.js";

function time() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

export async function newMessage(req, res) {
  const msgtext = req.body.msgtext;
  const added = time();
  const userid = req.user.userid;

  await db.addMessage(msgtext, added, userid);
  res.redirect("/feed");
}
