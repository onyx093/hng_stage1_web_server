const express = require("express");
const axios = require("axios");
const { lookup } = require("geoip-lite");

const app = express();

app.get("/api/hello", (req, res) => {
  let clientIp = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    ""
  )
    .split(",")[0]
    .trim();
  clientIp = clientIp.split(":").pop();
  console.log(clientIp);
  const geo = lookup(clientIp);
  console.log(geo);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${geo.ll[0]}&lon=${geo.ll[1]}&units=metric&appid=d66e8772cf7b6a0d9c743b81e060063f`;

  axios({ url }).then(({ data }) => {
    console.log({ data });
    if (req.query.visitor_name) {
      return res.send({
        client_ip: clientIp,
        location: geo.city,
        greeting: `Hello, ${req.query.visitor_name}!, the temperature is ${data.main.temp} degrees Celsius in ${geo.city}`,
      });
    }
    return res.send({
      client_ip: clientIp,
      location: geo.city,
      greeting: `Hello, Visitor!, the temperature is ${data.main.temp} degrees Celsius in ${geo.city}`,
    });
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
