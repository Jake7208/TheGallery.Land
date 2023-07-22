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

// hidden load in

// every 1 and 25 images will have a v-stretch class that will make them span 2 rows and cols
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

// clears the dom so that new images can load in their place
function clearAll() {
  const galleryDiv = document.querySelector(".gallery");
  galleryDiv.innerHTML = "";
}

// loads the dom for the images
function loadDom(array) {
  const listElement = document.createElement("section");
  listElement.className = "Gallery_Section";

  const listItems = [];

  array.forEach((image) => {
    // console.log(image);
    const listItem = document.createElement("a");
    listItem.className = "Gallery_Item";
    const imgElement = document.createElement("img");

    imgElement.src = `.././images/${image.genre}/${image.name}`;

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
    addVStretchClass(listItems);
  });

  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  });

  const galleryDiv = document.querySelector(".gallery");

  galleryDiv.appendChild(listElement);
}

// when the window is loaded it will get all the images from the /api/getAll endpoint
window.onload = () => {
  // Fetch all images and their data from the /api/getAll endpoint
  fetch("http://localhost:4000/api/getAll")
    .then((response) => response.json())
    .then((objectData) => {
      const shuffledData = shuffleArray(objectData.allImages);
      console.log(shuffledData);
      loadDom(shuffledData);
    })
    .catch((error) => {
      console.error(error);
    });
};

// gallery that only loads fantasy images on click of the fantasy button
const fantasy = document.getElementById("fantasy");
fantasy.addEventListener("click", () => {
  clearAll();
  fetch("http://localhost:4000/api/getAllFromFantasy")
    .then((response) => response.json())
    .then((objectData) => {
      const shuffledData = shuffleArray(objectData.ImagesFromGenre);
      console.log(shuffledData);
      loadDom(shuffledData);
    })
    .catch((error) => {
      console.error(error);
    });
});

const resumes = document.getElementById("resumes");
resumes.addEventListener("click", () => {
  clearAll();
  fetch("http://localhost:4000/api/getAllFromResumes")
    .then((response) => response.json())
    .then((objectData) => {
      const shuffledData = shuffleArray(objectData.ImagesFromGenre);
      console.log(shuffledData);
      loadDom(shuffledData);
    })
    .catch((error) => {
      console.error(error);
    });
});
