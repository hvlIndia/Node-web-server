const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require ('./utils/geoCode');
const forecast = require ('./utils/forecast');

const app = express();
const port = process.env.PORT || 5000

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setup handlerbars engine and views directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "TEAM HVL"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "TEAM HVL"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "TEAM HVL",
    helpText: "click here for help!"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Please Enter Search Value"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "TEAM HVL",
    errorMsg: "help article not found!"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "TEAM HVL",
    errorMsg: "Page not found!"
  });
});
// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log("server run on port " + port);
});
