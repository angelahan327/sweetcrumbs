// order page - form validation

// menu items with prices 
var itemNames = {
  "butter-croissant":      { label: "Butter Croissant",          price: 4.25 },
  "cinnamon-roll":         { label: "Cinnamon Roll",              price: 4.95 },
  "sourdough-loaf":        { label: "Sourdough Loaf",             price: 8.00 },
  "rosemary-focaccia":     { label: "Rosemary Focaccia",          price: 6.50 },
  "chocolate-chip-cookie": { label: "Chocolate Chip Cookie",      price: 2.75 },
  "brownie":               { label: "Brownie",                    price: 3.75 },
  "vanilla-cupcake":       { label: "Vanilla Cupcake (single)",   price: 3.95 },
  "triple-chocolate-cake": { label: "Triple Chocolate Cake",      price: 48.00 },
  "other":                 { label: "Custom Request",             price: null  }
};

// add-on prices
var addonPrices = {
  "candles":     1.50,
  "message":     3.00,
  "gluten-free": 2.00,
  "vegan":       2.00
};

// setup order form
function setupOrderForm() {
  var orderForm = document.getElementById("order-form");
  if (!orderForm) {
    return;
  }

  orderForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var formIsValid = true;

    // validate name
    var nameInput = document.getElementById("full-name");
    var nameError = document.getElementById("name-error");
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Please enter your full name.";
      nameError.style.display = "block";
      formIsValid = false;
    } else {
      nameError.style.display = "none";
    }

    // validate email
    var emailInput = document.getElementById("email");
    var emailError = document.getElementById("email-error");
    var emailValue = emailInput.value.trim();
    var hasAtSymbol = emailValue.indexOf("@") >= 0;
    var hasDot = emailValue.indexOf(".") >= 0;
    if (emailValue === "" || hasAtSymbol === false || hasDot === false) {
      emailError.textContent = "Please enter a valid email address.";
      emailError.style.display = "block";
      formIsValid = false;
    } else {
      emailError.style.display = "none";
    }

    // validate phone
    var phoneInput = document.getElementById("phone");
    var phoneError = document.getElementById("phone-error");
    if (phoneInput.value.trim() === "") {
      phoneError.textContent = "Please enter a phone number.";
      phoneError.style.display = "block";
      formIsValid = false;
    } else {
      phoneError.style.display = "none";
    }

    // validate item type
    var itemSelect = document.getElementById("item-type");
    var itemError = document.getElementById("item-error");
    if (itemSelect.value === "") {
      itemError.textContent = "Please select an item type.";
      itemError.style.display = "block";
      formIsValid = false;
    } else {
      itemError.style.display = "none";
    }

    // validate quantity
    var qtyInput = document.getElementById("quantity");
    var qtyError = document.getElementById("quantity-error");
    var qtyValue = parseInt(qtyInput.value, 10);
    if (isNaN(qtyValue) || qtyValue < 1) {
      qtyError.textContent = "Please enter a quantity of at least 1.";
      qtyError.style.display = "block";
      formIsValid = false;
    } else {
      qtyError.style.display = "none";
    }

    // validate pickup date
    var dateInput = document.getElementById("pickup-date");
    var dateError = document.getElementById("date-error");
    if (dateInput.value === "") {
      dateError.textContent = "Please select a pickup date.";
      dateError.style.display = "block";
      formIsValid = false;
    } else {
      dateError.style.display = "none";
    }

    // confirm and reset
    if (formIsValid) {
      var selectedKey = itemSelect.value;
      var itemData = itemNames[selectedKey];
      var friendlyName = itemData ? itemData.label : "Order";
      var itemPrice = itemData ? itemData.price : null;
      var userName = nameInput.value.trim();
      var pickupDate = dateInput.value;

      // calculate add-on total and build add-on label list
      var addonTotal = 0;
      var addonLabels = [];
      var addonCheckboxes = document.querySelectorAll('input[name="addons"]:checked');
      var i;
      for (i = 0; i < addonCheckboxes.length; i++) {
        var addonKey = addonCheckboxes[i].value;
        if (addonPrices[addonKey]) {
          addonTotal = addonTotal + addonPrices[addonKey];
        }
        var addonLabel = document.querySelector('label[for="cb-' + addonKey + '"]');
        if (addonLabel) {
          addonLabels.push(addonLabel.textContent.trim());
        }
      }
      var addonLine = addonLabels.length > 0 ? "Add-ons: " + addonLabels.join(", ") + "\n" : "";

      var specialInput = document.getElementById("special-instructions");
      var specialLine = specialInput && specialInput.value.trim() ? "Notes: " + specialInput.value.trim() + "\n" : "";

      // build total line
      var totalLine = "";
      if (itemPrice !== null) {
        var total = (itemPrice * qtyValue) + addonTotal;
        var isStartingPrice = selectedKey === "triple-chocolate-cake";
        totalLine = "\nEstimated Total: $" + total.toFixed(2) + (isStartingPrice ? "+" : "") + "\n";
      } else {
        totalLine = "\nEstimated Total: To be confirmed\n";
      }

      alert(
        "Thank you, " + userName + "!\n\n" +
        "Item: " + friendlyName + "\n" +
        "Quantity: " + qtyValue + "\n" +
        addonLine +
        specialLine +
        totalLine +
        "Requested Pickup: " + pickupDate + "\n\n" +
        "We'll be in touch within 24 hours to confirm your order.\n" +
        "— SweetCrumbs Bakery"
      );
      orderForm.reset();
    }
  });
}

// init
document.addEventListener("DOMContentLoaded", setupOrderForm);