// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Get the game items and page elements

// Get the current URL
var currentUrl = window.location.href;

// Get all the menu links
var menuLinks = document.querySelectorAll(".menu__link");

// Iterate over each link and check if the href matches the current URL
menuLinks.forEach(function (link) {
  if (link.href === currentUrl) {
    // Add the "active" class to the parent list item
    link.classList.add("active");
  }
});

var gameWrap = document.querySelector(".game__wrap");
var gameResize = document.querySelector(".game__resize");
var gameRefresh = document.querySelector(".game__refresh");
var gameIframe = document.querySelector("iframe");

if (gameResize) {
  gameResize.addEventListener("click", function () {
    gameWrap.classList.toggle("game__full");

    // Change the icon based on the current class
    if (gameWrap.classList.contains("game__full")) {
      gameResize.classList.remove("_icon-enlarge");
      gameResize.classList.add("_icon-shrink");
    } else {
      gameResize.classList.remove("_icon-shrink");
      gameResize.classList.add("_icon-enlarge");
    }
  });
}

if (gameRefresh) {
  gameRefresh.addEventListener("click", function () {
    gameIframe.src = gameIframe.src; // Refresh the iframe by resetting its source
  });
}

var votesElement = document.querySelector(".game__votes");
if (votesElement) {
  var randomVotes = Math.floor(Math.random() * (997 - 600 + 1)) + 600;

  votesElement.textContent = randomVotes + " votes";
}

document.addEventListener("DOMContentLoaded", function () {
  const registerWrap = document.getElementById("register-wrap");
  const registerMessage = document.getElementById("register-message");

  function hideRegisterForm() {
    registerWrap.style.display = "none";
    registerMessage.style.display = "block";
    localStorage.setItem("registrationStatus", "completed");
  }

  if (registerWrap) {
    const registerForm = document.querySelector(".register__form");
    if (registerForm) {
      registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        // Your form validation logic here
        hideRegisterForm();
      });
    }

    // Check if the user has already registered
    if (localStorage.getItem("registrationStatus") === "completed") {
      hideRegisterForm();
    }
  }

  const loginForm = document.querySelector(".register__form.login");
  if (loginForm) {
    const popup = document.querySelector(".popup");
    const popupButton = document.querySelector(".popup__button");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      document.documentElement.classList.add("popup-open");
      popup.style.display = "flex";
    });

    popupButton.addEventListener("click", function () {
      document.documentElement.classList.remove("popup-open");
      popup.style.display = "none";
    });
  }
});
