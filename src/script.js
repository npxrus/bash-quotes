const axios = require("axios");
const cheerio = require("cheerio");

const container = document.querySelector(".container");
const content = document.querySelector(".quote-content");
const button = document.querySelector(".btn");
const spinner = document.querySelector(".loader");

const getQuote = async () => {
  spinner.hidden = false;
  container.hidden = true;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://bash.im/random";
  try {
    const response = await axios.get(proxyUrl + url);
    const data = await response.data;
    const $ = cheerio.load(data);
    const quote = $(".quote__body").eq(11).html();

    content.innerHTML = quote;

    if (!spinner.hidden) {
      container.hidden = false;
      spinner.hidden = true;
    }
  } catch (err) {
    console.log(err);
    getQuote();
  }
};

button.addEventListener("click", getQuote);

getQuote();
