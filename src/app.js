const express = require("express");
const { lookup } = require("geoip-lite");
// const requestIp = require("request-ip");

const app = express();
// app.use(requestIp.mw());
app.set("trust proxy", true);

app.get("/api/hello", (req, res) => {
  const ip = req.ip;
  console.log(ip);
  const geo = lookup(ip);
  console.log(geo);
  if (req.query.visitor_name) {
    return res.send({
      client_ip: ip,
      location: geo.city,
      greeting: `Hello, ${req.query.visitor_name}!, the temperature is 11 degrees Celsius in ${geo.city}`,
    });
  }
  return res.send({
    client_ip: ip,
    location: geo.city,
    greeting: `Hello, Visitor!, the temperature is 11 degrees Celsius in ${geo.city}`,
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
