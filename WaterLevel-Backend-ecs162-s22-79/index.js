const express = require("express");

const app = express();

const fetch = require("cross-fetch");

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const stations = [
  "SHA", // Shasta
  "ORO", // Oroville
  "CLE", // Trinity Lake
  "NML", //	New Melones
  "LUS", // San Luis
  "DNP", // Don Pedro
  "BER" // Berryessa
];

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
})


app.post("/query/getWaterData", async function(req,res){
  console.log("Got POST req");
  let combined_data = req.body;
  console.log("body in is", combined_data);
  let water = await lookupWaterData(combined_data);
  res.json(water);
})

app.use(function(req, res, next) {
  res.json({msg: "No such AJAX request"})
});

const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

async function lookupWaterData(combined_data) {
  const month = combined_data.month;
  const year = combined_data.year ;
  const api_url =  "https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,LUS,DNP,BER&SensorNums=15&dur_code=M&Start="+year+"-"+month+"&End="+year+"-"+month;
  let fetchResponse = await fetch(api_url);
  let data = await fetchResponse.json()
  return data;
}
