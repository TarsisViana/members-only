import db from "../db/queries.js";

export async function getHomepage(req, res) {
  if (!req.isAuthenticated()) {
    console.log("hey");
    const messages = await db.getMessages();
    res.render("index", { messages: messages });
  } else {
    res.redirect("/feed");
  }
}
