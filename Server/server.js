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

app.post("/minify" , (req, res)=> {
  console.log(req.body);
  const link = req.body.link;
  shorten(link);
  
  console.log(link);
  res.json({ message: link });
});



const shorten = (link) => {
  console.log(randomUUID());
  if (link.match(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/)) {
    db.transaction((trx) => {
      trx
        .insert({
          link_text: randomUUID(),
          url_long: link,
        })
        .into("urls")
        .then((response) => {
          console.log("Link inserted into the database:", response);
          trx.commit(); 
        })
        .catch((error) => {
          console.error("Error inserting link into the database:", error);
          trx.rollback(); 
        });
    });
  }
};




// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );

