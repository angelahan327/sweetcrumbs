// featured + reviews

// build item — turns one featured item object into the HTML string for its card
function makeItemHtml(item) {
  var imageSrc = item.image;
  var imageAlt = item.alt || "";
  var name = item.name;
  var description = item.description;
  return '<div class="item-col">' +
    '<img src="' + imageSrc + '" alt="' + imageAlt + '" />' +
    '<div class="item-text"><h3>' + name + '</h3>' +
    '<p>' + description + '</p></div></div>';
}

// build items — loops through featured items, builds HTML for each, dumps it all into the container
function buildFeaturedItems(container, featuredItems) {
  if (!container || !featuredItems || featuredItems.length === 0) {
    return;
  }
  var html = "";
  var i;
  for (i = 0; i < featuredItems.length; i++) {
    html = html + makeItemHtml(featuredItems[i]);
  }
  container.innerHTML = html;
}

// build review — turns one review object into the HTML for that review box
function makeReviewHtml(review) {
  return '<div class="review-box">' +
    '<p>"' + review.quote + '"</p>' +
    '<span class="author">' + review.author + '</span>' +
    '</div>';
}

// build reviews — loops through reviews, builds HTML for each, puts them in the container
function buildReviews(container, reviews) {
  if (!container || !reviews || reviews.length === 0) {
    return;
  }
  var html = "";
  var i;
  for (i = 0; i < reviews.length; i++) {
    html = html + makeReviewHtml(reviews[i]);
  }
  container.innerHTML = html;
}

// fetch and render — loads data.json and fills in the featured items + reviews sections on the homepage
function initHomePage() {
  var featuredEl = document.getElementById("featured-items");
  var reviewsEl = document.getElementById("reviews-container");
  if (!featuredEl || !reviewsEl) {
    return;
  }

  fetch("data/data.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      buildFeaturedItems(featuredEl, data.featuredItems);
      buildReviews(reviewsEl, data.reviews);
    })
    .catch(function(err) {
      console.error("Failed to load data:", err);
    });
}

// init
document.addEventListener("DOMContentLoaded", initHomePage);
