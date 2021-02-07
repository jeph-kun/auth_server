//Server Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
const axios = require("axios");
require("dotenv").config;

//JWTOKEN
const authToken = require("./authToken");

//Create A cache for token storage
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const verify = router.post("/auth", authToken, async (req, res) => {
  const { path } = req.body;
  console.log(req.user);
  axios({
    method: "get",
    url: path,
    responseType: "json",
    data: { access_key: req.user.access_key },
  }).then(function (response) {
    res.status(200).send(response.data);
  });
});

app.use(verify);
const port = 3003;

app.listen(port, () => {
  console.log("Listening to port: ", port);
});
