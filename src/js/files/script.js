// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// Get the game items and page elements
const gameItems = document.querySelectorAll(".games-popular__item.catalog");
const pagesContainer = document.querySelector(".games-popular__pages");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
if (prevPage || nextPage) {
  const itemsPerPage = 24;
  let currentPage = 1;

  // Calculate the total number of pages based on the number of game items
  const totalPages = Math.ceil(gameItems.length / itemsPerPage);

  // Generate the page buttons dynamically
  function generatePageButtons() {
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("li");
      pageButton.textContent = i;
      pageButton.classList.add(`page${i}`);
      pagesContainer.insertBefore(pageButton, nextPage);
    }
  }

  // Hide all game items except the ones on the current page
  function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = 0; i < gameItems.length; i++) {
      if (i >= startIndex && i < endIndex) {
        gameItems[i].style.display = "block";
      } else {
        gameItems[i].style.display = "none";
      }
    }
  }

  // Add click event listeners to page elements
  pagesContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "LI") {
      const pageNumber = parseInt(target.textContent);
      currentPage = pageNumber;
      showPage(currentPage);

      // Remove the active class from all pages and add it to the clicked page
      const pages = document.querySelectorAll(".games-popular__pages li");
      pages.forEach((page) => {
        page.classList.remove("active");
      });
      target.classList.add("active");

      updatePaginationButtons();
    }
  });

  // Generate the page buttons
  generatePageButtons();

  // Set the initial active page to the first page
  const initialPage = document.querySelector(".games-popular__pages li.page1");
  initialPage.classList.add("active");

  // Update the state of the pagination buttons
  function updatePaginationButtons() {
    prevPage.classList.toggle("inactive", currentPage === 1);
    nextPage.classList.toggle("inactive", currentPage === totalPages);
  }

  // Go to the previous page
  prevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);

      // Update the active page
      const pages = document.querySelectorAll(".games-popular__pages li");
      pages.forEach((page, index) => {
        if (index === currentPage - 1) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      updatePaginationButtons();
    }
  });

  // Go to the next page
  nextPage.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);

      // Update the active page
      const pages = document.querySelectorAll(".games-popular__pages li");
      pages.forEach((page, index) => {
        if (index === currentPage - 1) {
          page.classList.add("active");
        } else {
          page.classList.remove("active");
        }
      });

      updatePaginationButtons();
    }
  });

  // Show the initial page
  showPage(currentPage);

  // Disable the previous page button initially
  prevPage.classList.add("inactive");

  // Disable the next page button if we're already on the last page
  if (totalPages === 1) {
    nextPage.classList.add("inactive");
  }
}

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
  function checkAndDisplayMessage(sectionId, storageKey, successMessageId) {
    var section = document.getElementById(sectionId);
    if (section) {
      var isCompleted = localStorage.getItem(storageKey);
      if (isCompleted === "true") {
        document.getElementById(sectionId + "-wrap").style.display = "none";
        document.getElementById(successMessageId).style.display = "block";
      }
    }
  }

  function addSubmitListener(formId, storageKey) {
    var form = document.getElementById(formId);
    if (form) {
      form.addEventListener("submit", function (event) {
        // Perform login or registration logic here

        // Set the corresponding storage key to true
        localStorage.setItem(storageKey, "true");
      });
    }
  }

  // Check and display login message
  checkAndDisplayMessage("login", "isLogin", "login-message");
  addSubmitListener("login-form", "isLogin");

  // Check and display registration message
  checkAndDisplayMessage("register", "isRegister", "register-message");
  addSubmitListener("register-form", "isRegister");
});
