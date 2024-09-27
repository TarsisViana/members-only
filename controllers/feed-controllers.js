import db from "../db/queries.js";

export async function getFeed(req, res) {
  if (req.isAuthenticated()) {
    const messages = await db.getMessagesUsers();
    console.log(messages[0]);
    res.render("feed", {
      messages: messages,
      member: req.user.member,
      admin: req.user.admin,
    });
  } else {
    res.send(
      '<p>You are not authorized, please <a href="/register">register</a> or <a href="/login">login</a>'
    );
  }
}

export async function deleteMessage(req, res) {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    await db.removeMessage(id);
    res.redirect("/feed");
  } else {
    res.send(
      '<p>You are not authorized, please <a href="/register">register</a> or <a href="/login">login</a>'
    );
  }
}
