const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const knex = require("knex");

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
  console.log(link);
  res.json({ message: link });
});





  

// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );
