// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// normal timestamp endpoint...
app.get("/api/timestamp/:date_string?", function(req, res) {
  let reqString = req.params.date_string;
  let resDate;
  // check to see if the string is a unix timestamp (in this challenge we can just see if it contains a dash as the 5th character), and perform the conversion to an integer if necessary
  if (!/^\d{4}-/.test(reqString)) reqString = parseInt(reqString);
  resDate = new Date(reqString);
  // this comparision is used to see if the date is a valid date, is there another way to do this?
  if (resDate.getTime() !== resDate.getTime()) {
    res.json({ error: "Invalid Date" });
  }
  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
