// menu page - filter by category

function setupMenuFilters() {
  var menuGrid = document.getElementById("menu-grid");
  if (!menuGrid) {
    return;
  }

  var filterButtons = document.querySelectorAll("[data-menu-filter]");
  var i;

  for (i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function() {
      var chosenFilter = this.getAttribute("data-menu-filter");

      // set active button
      var j;
      for (j = 0; j < filterButtons.length; j++) {
        if (filterButtons[j].getAttribute("data-menu-filter") === chosenFilter) {
          filterButtons[j].classList.add("is-active");
          filterButtons[j].setAttribute("aria-pressed", "true");
        } else {
          filterButtons[j].classList.remove("is-active");
          filterButtons[j].setAttribute("aria-pressed", "false");
        }
      }

      // filter menu cards
      var cards = menuGrid.querySelectorAll(".menu-card");
      var k;
      for (k = 0; k < cards.length; k++) {
        var card = cards[k];
        var cardCategory = card.getAttribute("data-category");

        if (chosenFilter === "all") {
          card.style.display = "";
        } else if (cardCategory === chosenFilter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      }
    });
  }
}

// run on page load
document.addEventListener("DOMContentLoaded", setupMenuFilters);
