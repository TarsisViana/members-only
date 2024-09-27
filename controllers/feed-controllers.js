import db from "../db/queries.js";

export async function getFeed(req, res) {
  if (req.isAuthenticated()) {
    const messages = await db.getMessagesUsers();
    res.render("feed", { messages: messages, member: req.user.member });
  } else {
    res.send(
      '<p>You are not authorized, please <a href="/register">register</a> or <a href="/login">login</a>'
    );
  }
}
