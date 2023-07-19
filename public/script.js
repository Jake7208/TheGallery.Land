fetch("http://localhost:4000/api/getPath")
  .then((response) => response.json())
  .then((objectData) => {
    const paths = objectData.path; // Access the 'path' property from the objectData

    const listElement = document.createElement("section"); // Create a new <ul> element

    paths.forEach((path) => {
      const listItem = document.createElement("ul");
      const imgElement = document.createElement("img"); // Create a new <img> element

      imgElement.src = `.././images/${path}`; // Set the 'src' attribute dynamically
      listItem.appendChild(imgElement); // Append the <img> element to the <li> element
      listElement.appendChild(listItem); // Append the <li> element to the <ul> element
    });

    document.body.appendChild(listElement); // Append the <ul> element to the document body
  })
  .catch((error) => {
    console.error(error);
  });
