const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const knex = require("knex");

const { randomUUID } = require('crypto'); // Added in: node v14.17.0


// uuidv4.parse("hello");

const bodyParser = require("body-parser"); 


require('dotenv').config();

const DATABASE_URL=  process.env.DATABASE_URL; // "239482"
const PGDATABASE= process.env.PGDATABASE; // "foobar"
const PGHOST= process.env.PGHOST; // "development"
const PGPASSWORD =process.env.PGPASSWORD; // "development"
const PGPORT = process.env.PGPORT;
const PGUSER = process.env.PGUSER;

console.log(DATABASE_URL);

const db = knex({
  client: "pg",
  connection: {
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    ssl: false, // set this to false for it to work 
  },
});

db.select("*")
  .from("urls")
  .then((data) => {
    console.log(data);
  });


// app.use(cors());
app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());

app.options("*", cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
  console.log(req);
  res.json({ message: "Waiting for URL.." });
});

app.post("/minify", (req, res) => {
  console.log(req.body);
  const link = req.body.link;
  shorten(link)
    .then((shortedLink) => {
      console.log(shortedLink);
      res.json({ message: `https://localhost:8000/${shortedLink.link_text}` });
    })
    .catch((error) => {
      console.error("Error shortening link:", error);
      res.status(500).json({ error: "Failed to shorten the link" });
    });
});


app.get("/:LinkId", (req, res) => {
  const linkId = req.params.LinkId;
  console.log(linkId);
  db.select("url_long")
    .from("urls")
    .where("link_text", linkId)
    .then((data) => {
      const urlLong = data[0].url_long;
      return res.redirect(urlLong);
    })
    .catch((error) => {
      console.error("Error retrieving link from the database:", error);
      res.status(500).json({ error: "Failed to retrieve the link" });
    });
});



const shorten = (link) => {
  console.log(randomUUID());
  return new Promise((resolve, reject) => {
    if (link.match(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)) {
      db.transaction((trx) => {
        trx
          .insert({
            link_text: randomUUID(),
            url_long: link,
          })
          .into("urls")
          .returning("id")
          .then((response) => {
            const lastInsertedId = response[0];
            console.log("Last inserted ID:", lastInsertedId);
            console.log("Link inserted into the database:", response);
            trx.commit();
            resolve(getLinkFromId(lastInsertedId.id));
          })
          .catch((error) => {
            console.error("Error inserting link into the database:", error);
            trx.rollback();
            reject(error);
          });
      });
    } else {
      reject("Invalid link format");
    }
  });
};


const getLinkFromId = (linkId) => {
  return db.select("link_text")
    .from("urls")
    .where("id", linkId)
    .then((data) => {
      return data[0]; 
    })
    .catch((error) => {
      console.error("Error retrieving link from the database:", error);
      throw error; 
    });
};





// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );

