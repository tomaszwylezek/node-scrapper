const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://news.ycombinator.com";

let getData = html => {
  let data = [];
  const $ = cheerio.load(html);
  $("table.itemlist tr td:nth-child(3)").each((i, elem) => {
    data.push({
      title: $(elem).text(),
      link: $(elem)
        .find("a.storylink")
        .attr("href")
    });
  });

  fs.writeFile("scrapper.json", JSON.stringify(data), function(err) {
    if (err) return console.log(err);
    console.log("Wroted file");
  });
};

axios
  .get(url)
  .then(res => {
    getData(res.data);
  })
  .catch(error => {
    console.log(error);
  });
