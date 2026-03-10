// faq page - accordion

// close one accordion section
function closeSection(button, content) {
  button.setAttribute("aria-expanded", "false");
  content.hidden = true;
}

// open one accordion section
function openSection(button, content) {
  button.setAttribute("aria-expanded", "true");
  content.hidden = false;
}

// set up the accordion when page loads
function setupAccordion() {
  var accordion = document.querySelector(".faq-accordion[data-accordion]");
  if (!accordion) {
    return;
  }

  var onlyOneOpen = accordion.getAttribute("data-accordion") === "single";
  var buttons = accordion.querySelectorAll(".accordion-trigger[aria-controls]");

  var i;
  for (i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    var contentId = button.getAttribute("aria-controls");
    var content = document.getElementById(contentId);

    if (!content) {
      continue;
    }

    // start with all closed
    closeSection(button, content);

    // when user clicks, toggle open/close
    button.addEventListener("click", function() {
      var clickedButton = this;
      var contentId = clickedButton.getAttribute("aria-controls");
      var content = document.getElementById(contentId);

      if (!content) {
        return;
      }

      var isOpen = clickedButton.getAttribute("aria-expanded") === "true";

      // if only one can be open, close all others first
      if (onlyOneOpen) {
        var j;
        for (j = 0; j < buttons.length; j++) {
          var otherId = buttons[j].getAttribute("aria-controls");
          var otherContent = document.getElementById(otherId);
          if (otherContent) {
            closeSection(buttons[j], otherContent);
          }
        }
      }

      // open the clicked one if it was closed
      if (isOpen === false) {
        openSection(clickedButton, content);
      }
    });
  }
}

// run on page load
document.addEventListener("DOMContentLoaded", setupAccordion);
