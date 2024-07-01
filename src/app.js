const express = require("express");
const requestIp = require("request-ip");
const { lookup } = require("geoip-lite");

const app = express();

app.get("/api/hello", (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  // const ip = req.ip;
  console.log(clientIp);
  const geo = lookup(clientIp);
  // console.log(geo);
  if (req.query.visitor_name) {
    return res.send({
      client_ip: clientIp,
      location: geo.city,
      greeting: `Hello, ${req.query.visitor_name}!, the temperature is 11 degrees Celsius in New York`,
    });
  }
  return res.send({
    client_ip: clientIp,
    location: geo.city,
    greeting: `Hello, Visitor!, the temperature is 11 degrees Celsius in New York`,
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

module.exports = app;
