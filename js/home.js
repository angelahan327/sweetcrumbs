// home page

// homegrown object represents a single featured item
function FeaturedItem(name, description, image, alt) {
  this.name = name;
  this.description = description;
  this.image = image;
  this.alt = alt || "";
}

// one featured item html
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

// all featured items
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

// one review html
function makeReviewHtml(review) {
  return '<div class="review-box">' +
    '<p>"' + review.quote + '"</p>' +
    '<span class="author">' + review.author + '</span>' +
    '</div>';
}

// all reviews
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

// get data and render on load
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
      // build FeaturedItem objects from the JSON data
      var items = [];
      var i;
      for (i = 0; i < data.featuredItems.length; i++) {
        var raw = data.featuredItems[i];
        var item = new FeaturedItem(raw.name, raw.description, raw.image, raw.alt);
        items.push(item);
      }
      buildFeaturedItems(featuredEl, items);
      buildReviews(reviewsEl, data.reviews);
    })
    .catch(function(err) {
      console.error("Failed to load data:", err);
    });
}

// run on page load
document.addEventListener("DOMContentLoaded", initHomePage);