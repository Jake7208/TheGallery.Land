const openHamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const closeHamburger = document.querySelector(".closeHamburger");

// Function to handle the hamburger click event
function handleHamburgerClick() {
  if (nav.style.display === "none" || nav.style.display === "") {
    nav.style.display = "block";
  } else {
    nav.style.display = "none";
  }
}

// Function to handle the close hamburger click event
function handleCloseHamburgerClick() {
  nav.style.display = "none";
}

// Add the click event listeners for small screens (max-width: 768px)
function addEventListenersForSmallScreens() {
  openHamburger.addEventListener("click", handleHamburgerClick);
  closeHamburger.addEventListener("click", handleCloseHamburgerClick);
}

// Remove the click event listeners for small screens (max-width: 768px)
function removeEventListenersForSmallScreens() {
  openHamburger.removeEventListener("click", handleHamburgerClick);
  closeHamburger.removeEventListener("click", handleCloseHamburgerClick);
}

// Check the screen size and add or remove the event listeners accordingly
function checkScreenSize() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    // For small screens, add the event listeners
    addEventListenersForSmallScreens();
  } else {
    // For larger screens, remove the event listeners
    removeEventListenersForSmallScreens();
    nav.style.display = ""; // Ensure that the nav is visible on larger screens
  }
}

// Initial check on page load
checkScreenSize();

// Listen for screen size changes and update event listeners accordingly
window.addEventListener("resize", checkScreenSize);

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Stop observing once the class is changed
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((element) => {
    observer.observe(element);
  });
});
