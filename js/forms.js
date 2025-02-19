// ***********  Variables **************
// Containers (Burger Menu & Hide Burger Menu)
const headerNav = document.querySelector(".headerNav");
const headerNavMobile = document.querySelector(".headerNavMobile");
const headerNavLinks = headerNavMobile.querySelectorAll("a");
const burgerMenuBtn = document.querySelector("#burgerBtn");

// Form Sections
const contactForm = document.getElementById("contactFormSection");
const submitRecipieForm = document.getElementById("submitFormSection");

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
/*
  - This function will check the current hash in the URL.
  - It starts by unsetting the "showElement" class from both the contactForm -
  - - and submitRecipieForm elements.
  - If the hash is "contact", it will add the class "showElement" to the contactForm element.
  - If the hash is "submitRecipe", it will add the class "showElement" to the submitRecipieForm element.
  - If the hash is neither of the above, it will log "No hash found"
*/
function updateHashClass() {
  const urlHashCheck = window.location.hash.substring(1);
  contactForm.classList.remove("showElement");
  submitRecipieForm.classList.remove("showElement");

  if (urlHashCheck === "contact") {
    contactForm.classList.add("showElement");
    submitRecipieForm.classList.add("hideElement");
  } else if (urlHashCheck === "submitRecipe") {
    submitRecipieForm.classList.add("showElement");
  } else {
    console.log("No hash found");
  }
}

// Call the function to update the class based on the current hash
updateHashClass();

// Listen for hash changes and update the class accordingly
window.addEventListener("hashchange", updateHashClass);
