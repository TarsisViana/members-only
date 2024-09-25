#! /usr/bin/env node

import "dotenv/config";
import pg from "pg";
const { Client } = pg;

function time() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

const SQL = `
CREATE TABLE IF NOT EXISTS members (
  memberid  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR (255),
  lastname VARCHAR (255),
  password VARCHAR (255),
  email VARCHAR (255),
  club_member BOOLEAN NOT NULL DEFAULT false
);



CREATE TABLE IF NOT EXISTS messages (
  messageid  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  msgtext TEXT,
  added TIMESTAMP,
  userid INTEGER,
  FOREIGN KEY (userid) REFERENCES members (memberid)
);

INSERT INTO members (firstname, lastname, password, email, club_member) 
VALUES ('teste1', 'mista','tete','teste@gmail.com',true);

INSERT INTO messages (msgtext, added,userid) 
VALUES ('first message', '${time()}','1');
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
