const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const bodyParser = require("body-parser"); 

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
