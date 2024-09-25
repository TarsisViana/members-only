import pool from "./pool.js";
import crypto from "crypto";

async function getUser(username) {
  let text = "SELECT * FROM users WHERE username = $1";
  const { rows } = await query(text, [username]);
  return rows[0];
}

async function saveUser(username, password, salt) {
  let text = "INSERT INTO users (username,password,salt) VALUES ($1,$2,$3)";
  await query(text, [username, password, salt]);
}

export { getUser, saveUser };
