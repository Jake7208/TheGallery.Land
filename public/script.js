gsap.registerPlugin(ScrollTrigger);

const tl = gsap
  .timeline({
    scrollTrigger: {
      start: "top",
      trigger: ".welcome",
      scrub: true,
      // markers: true,
    },
  })
  .to(".gallery ", {
    y: -300,
    scrub: true,
  });

function addVStretchClass(listItems) {
  const interval = 25; // Add the "v-stretch" class after every 25 images
  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    if (i === 0 || (i % interval === 0 && i > 0)) {
      listItem.classList.add("v-stretch");
    }
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

// Fetch all images and their data from the /api/getAll endpoint
fetch("http://localhost:4000/api/getAll")
  .then((response) => response.json())
  .then((objectData) => {
    const shuffledData = shuffleArray(objectData.allImages);

    const listElement = document.createElement("section");
    listElement.className = "Gallery_Section";

    const listItems = [];

    shuffledData.forEach((image) => {
      const listItem = document.createElement("a");
      listItem.className = "Gallery_Item";
      const imgElement = document.createElement("img");

      imgElement.src = `.././images/${image.path}`;
      listItem.appendChild(imgElement);
      listElement.appendChild(listItem);

      listItem.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalTitle = document.querySelector(".modal-title");
        const modalGenre = document.querySelector(".modal-genre");
        const modalImage = document.querySelector(".modal-image");
        const modalType = document.querySelector(".modal-type");

        const downloadLink = document.querySelector(".download-link");

        const imageName = image.name.split(".")[0];
        modalTitle.textContent = "Title: " + imageName;
        modalGenre.textContent = "Genre: " + image.genre;
        modalType.textContent = "Type: " + image.type;
        modalImage.src = imgElement.src;
        downloadLink.href = imgElement.src;
        downloadLink.download = image.path.split("/").pop();

        modal.style.display = "block";
      });

      listItems.push(listItem);
    });

    const closeModal = document.querySelector(".close-modal");
    closeModal.addEventListener("click", () => {
      const modal = document.querySelector(".modal");
      modal.style.display = "none";
    });

    const galleryDiv = document.querySelector(".gallery");
    galleryDiv.appendChild(listElement);

    addVStretchClass(listItems);
  })
  .catch((error) => {
    console.error(error);
  });

// Call the function to generate the gallery after everything on the page has loaded
window.onload = () => {
  generateGallery();
  const modal = document.querySelector(".modal");
  modal.style.display = "block";
};

// Function to generate the new gallery

fetch("http://localhost:4000/api/getAllFromFantasy").then((response) => {
  response.json().then((objectData) => {
    response.json().then((objectData) => {
      console.log(objectData);
    });
  });
});
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
