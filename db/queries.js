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

const db = { getUser, saveUser, getUserByEmail };

export default db;
