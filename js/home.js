// home page - featured items and reviews

// build one featured item as HTML
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

// build all featured items and put them on the page
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

// build one review box as HTML
function makeReviewHtml(review) {
  return '<div class="review-box">' +
    '<p>"' + review.quote + '"</p>' +
    '<span class="author">' + review.author + '</span>' +
    '</div>';
}

// build all reviews and put them on the page
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

// when page loads: get data and fill the page
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

// run on page load
document.addEventListener("DOMContentLoaded", initHomePage);
