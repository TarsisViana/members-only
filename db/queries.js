import pool from "./pool.js";
import crypto from "crypto";

async function getUser(username) {
  let text = "SELECT * FROM users WHERE username = $1";
  const { rows } = await pool.query(text, [username]);
  return rows[0];
}

async function getUserByEmail(email) {
  let text = "SELECT * FROM users WHERE email = $1";
  const { rows } = await pool.query(text, [email]);
  return rows[0];
}

async function saveUser(firstname, lastname, email, hashPw, salt) {
  let text =
    "INSERT INTO users (firstname,lastname,email,password,salt) VALUES ($1,$2,$3,$4,$5)";
  await pool.query(text, [firstname, lastname, email, hashPw, salt]);
}

//----- messages queries -----
async function getMessages() {
  let text = "SELECT * FROM messages";
  const { rows } = await pool.query(text);
  return rows;
}
async function getMessagesUsers() {
  let text =
    "SELECT msgtext,added, firstname,lastname FROM messages JOIN users ON users.userid = messages.userid";
  const { rows } = await pool.query(text);
  return rows;
}

async function addMessage(msgtext, added, userid) {
  let text = "INSERT INTO messages (msgtext,added,userid) VALUES ($1,$2,$3)";
  await pool.query(text, [msgtext, added, userid]);
}

const db = {
  getUser,
  saveUser,
  getUserByEmail,
  getMessages,
  getMessagesUsers,
  addMessage,
};

export default db;
