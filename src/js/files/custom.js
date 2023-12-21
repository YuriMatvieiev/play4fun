var isPopupVisible = false; // Set to true to show the popup by default
var isConfirmationCachingEnabled = true; // Set to true to enable caching

document.addEventListener("DOMContentLoaded", function () {
  var popup = document.querySelector(".popup");
  var popupButton = document.querySelector(".popup__button");

  if (popup && isPopupVisible) {
    // Check if the user has already confirmed their age
    var ageConfirmed = localStorage.getItem("ageConfirmed");

    if (!ageConfirmed || !isConfirmationCachingEnabled) {
      // Add the classes to show the popup and lock scrolling
      document.documentElement.classList.add("popup-open");
      popup.style.display = "flex";
    }

    popupButton.addEventListener("click", function () {
      // Remove the classes to hide the popup and unlock scrolling
      document.documentElement.classList.remove("popup-open");
      popup.style.display = "none";
      if (isConfirmationCachingEnabled) {
        localStorage.setItem("ageConfirmed", "true");
      }
    });
  }
});
