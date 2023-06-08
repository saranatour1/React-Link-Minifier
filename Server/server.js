const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// app.use(cors());
app.use(cors({origin: true, credentials: true}));

app.options("*", cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:5173", optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
  console.log(req);
    res.json({ message: "Hello World" });
});


  

// this needs to be below the other code blocks
app.listen( port, () => console.log(`Listening on port: ${port}`) );
