#! /usr/bin/env node

import "dotenv/config";
import pg from "pg";
const { Client } = pg;
import itemString from "./inventory.js";

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  categoryId  INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (500)
);

INSERT INTO categories (name)
VALUES ('men''s clothing'),
       ('jewelery'),
       ('electronics'),
       ('women''s clothing');

CREATE TABLE IF NOT EXISTS inventory (
  itemID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 500 ),
  price FLOAT,
  description TEXT,
  image VARCHAR(500),
  category INTEGER,
  rating_rate FLOAT,
  rating_count INTEGER,
  FOREIGN KEY (category) REFERENCES categories (categoryId)
);

INSERT INTO inventory (title, price, description, image, category, rating_rate, rating_count)
VALUES 
  ${itemString}
;

CREATE TABLE IF NOT EXISTS cart (
  cartid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  itemid SMALLINT CHECK (itemid >=0),
  amount SMALLINT CHECK (amount >0),
  FOREIGN KEY (itemid) REFERENCES inventory (itemid),
  UNIQUE (itemid)
);

INSERT INTO cart (itemid, amount) 
VALUES ('2','1');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.USER_PASSWORD}@${process.env.HOST}:${process.env.DEFAULT_PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
