// ***********  Variables **************
// Containers (Burger Menu & Hide Burger Menu)
const headerNav = document.querySelector(".headerNav");
const headerNavMobile = document.querySelector(".headerNavMobile");
const headerNavLinks = headerNavMobile.querySelectorAll("a");
const burgerMenuBtn = document.querySelector("#burgerBtn");

const hashEditCheck = document.getElementById("hashCheckMe");

// Toggle burger and headerNav on click
// This will add the ".active" class to the #burgerBtn element, triggering the animations in CSS.
// It will also add the ".active" class to the .headerNavMobile element, making it visible.
burgerMenuBtn.addEventListener("click", burgerClick); 
function burgerClick() { 
  burgerMenuBtn.classList.toggle("active");
  headerNavMobile.classList.toggle("active");
}

// Close burger and headerNav when a menu item is clicked
// For each links in the headerNavMobile, when clicked, - 
// - will remove the ".active" class from the burger and headerNavMobile.
// This is done so that the menu will close when any link is closed.
// I added this, because in the case a link navigated to content on the same page, -
// - the menu would stay open.
headerNavLinks.forEach(mobileNavClick => {
  mobileNavClick.addEventListener("click", mobileNavEvent) // Each link will trigger the function (mobileNavEvent)
});
function mobileNavEvent() { 
  burgerMenuBtn.classList.remove("active");
  headerNavMobile.classList.remove("active");
}

// Reset the burger and headerNav state when resizing to desktop view
// This is to ensure that the menu doesn't stay in an open state in case the window is resized.
window.addEventListener("resize", () => {
  if (window.innerWidth > 800) {
    burgerMenuBtn.classList.remove("active");
    headerNavMobile.classList.remove("active");
  }
});

// Function to update the class based on the current hash
function updateHashClass() {
  const urlHashCheck = window.location.hash.substring(1);
  hashEditCheck.classList.remove("hashCheckOne", "hashCheckTwo", "hashCheckThree");

  if (urlHashCheck === "aboutus") {
    hashEditCheck.classList.add("hashCheckOne");
  } else if (urlHashCheck === "contact") {
    hashEditCheck.classList.add("hashCheckTwo");
  } else if (urlHashCheck === "submitRecipie") {
    hashEditCheck.classList.add("hashCheckThree");
  } else {
    console.log("No hash found");
  }
}

// Call the function to update the class based on the current hash
updateHashClass();

// Listen for hash changes and update the class accordingly
window.addEventListener("hashchange", updateHashClass);

/*
// Reset the class list before adding a new class
function updateHashClass() {
  hashEditCheck.classList.remove("hashCheckOne", "hashCheckTwo", "hashCheckThree");

  if (urlHashCheck === "aboutus") {
    hashEditCheck.classList.add("hashCheckOne");
  } else if (urlHashCheck === "contact") {
    hashEditCheck.classList.add("hashCheckTwo");
  } else if (urlHashCheck === "submitRecipie") {
    hashEditCheck.classList.add("hashCheckThree");
  } else {
    console.log("No hash found");
  }
}

// Call the function to update the class based on the current hash
updateHashClass();

// Listen for hash changes and update the class accordingly
window.addEventListener("hashchange", () => {
  urlHashCheck = window.location.hash.substring(1);
  updateHashClass();
});
*/