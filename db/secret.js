#! /usr/bin/env node

import "dotenv/config";
import pg from "pg";
const { Client } = pg;
import { genPassword } from "../lib/passwordUtils.js";

const memberPw = genPassword(process.env.MEMBER_SECRET);
const adminPw = genPassword(process.env.ADMIN_SECRET);

const SQL = `
CREATE TABLE IF NOT EXISTS secret (
  id INTEGER PRIMARY KEY,
  password VARCHAR (255),
  salt VARCHAR (255)
);

INSERT INTO secret
VALUES ('1','${memberPw.hashPw}', '${memberPw.salt}'),
       ('2','${adminPw.hashPw}', '${adminPw.salt}');   

`;

async function main() {
  console.log("seeding...");
  try {
    const client = new Client({
      connectionString: `postgresql://${process.env.USER}:${process.env.USER_PASSWORD}@${process.env.HOST}:${process.env.DEFAULT_PORT}/${process.env.DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
  } catch (err) {
    console.log(err);
    return;
  }
  console.log("done");
}

main();
