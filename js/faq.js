// accordion

// close section: hides the accordion content
function closeSection(button, content) {
  button.setAttribute("aria-expanded", "false");
  content.hidden = true;
}

// open section: shows the accordion content
function openSection(button, content) {
  button.setAttribute("aria-expanded", "true");
  content.hidden = false;
}

// init accordion: clicking a question makes it open/closed
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

    // init all closed 
    closeSection(button, content);

    // toggle on click
    button.addEventListener("click", function() {
      var clickedButton = this;
      var contentId = clickedButton.getAttribute("aria-controls");
      var content = document.getElementById(contentId);

      if (!content) {
        return;
      }

      var isOpen = clickedButton.getAttribute("aria-expanded") === "true";

      // close others
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

      // open clicked
      if (isOpen === false) {
        openSection(clickedButton, content);
      }
    });
  }
}

// init
document.addEventListener("DOMContentLoaded", setupAccordion);