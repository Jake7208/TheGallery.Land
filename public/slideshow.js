let i = 0;

let images = [];
let time = 3000;

// image list
images[0] = "landingImages/imgSlider1.png";
images[1] = "landingImages/imgSlider2.png";
images[2] = "landingImages/imgSlider3.png";

// change image
function changeImg() {
  const imageWrapper = document.querySelector(".slider-container");
  imageWrapper.classList.remove("show"); // Remove the "show" class to fade out the image

  setTimeout(() => {
    document.querySelector(".slider").src = images[i];

    if (i < images.length - 1) {
      i++;
    } else {
      i = 0;
    }

    imageWrapper.classList.add("show"); // Add the "show" class to fade in the new image
    setTimeout(changeImg, time);
  }, 500); // Wait for 500ms (half of the transition duration) before updating the image and showing it again
}

window.onload = changeImg;
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // parallax effect for parallax2
  gsap.to(".parallax2", {
    duration: 5,
    scrollTrigger: {
      trigger: ".parallax1",
      start: "-5% top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: true,
      zIndex: 1, // Set a higher zIndex for parallax2 to make it appear above parallax1
    },
  });

  // parallax effect for parallax3
  gsap.to(".parallax3", {
    duration: 5,
    scrollTrigger: {
      trigger: ".parallax2", // Trigger when .parallax2 starts pinning
      start: "top top",
      end: "100% top", // End when .parallax3 fully enters the viewport
      pin: true,
      pinSpacing: false,
      scrub: true,
      zIndex: 1, // Set a higher zIndex for parallax3 to make it appear above parallax2
    },
  });
});
