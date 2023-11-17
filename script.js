"use strict";

// Elements
const quoteCotainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteCotainer.hidden = true;
};

const hideLoadingSpinner = function () {
  loader.hidden = true;
  quoteCotainer.hidden = false;
};

const newQuote = function () {
  showLoadingSpinner();
  // Get a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with "Unknown"
  if (!quote.author) {
    quote.author = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  // Check Quote length to determine styling (font-size)
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quoete, Hide Loader
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
};

const getQoutes = async function () {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuote();
  } catch (err) {
    alert(err);
  }
};

const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQoutes();
