// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const mymealtype = urlParams.get("meal-type");

// console.log("Mealtype", mymealtype);

// fetch("https://dummyjson.com/recipes/meal-type/snack")
//   .then((res) => res.json())
//   .then(console.log);

// function showList(recipes) {
//   const markup = recipes
//     .map((data) => {
//       return `  <div class="card">
//                 <img class="card_img" src="https://cdn.dummyjson.com/recipe-images/${data.id}.webp" alt="billede_1">
//                 <div class="card_text">
//                     <h2>${data.name}</h2>
//                     <p class="pliste">${data.mealType}</p>
//                 </div>
//                 <div class="icons_card">
//                     <div class="icon_card">
//                         <p pliste>Prep time</p>
//                         <img src="images/liste-icon/icon-1.svg" alt="ur">
//                         <p pliste>${data.prepTimeMinutes} min</p>
//                     </div>
//                     <div class="icon_card">
//                         <p pliste>Difficulty</p>
//                         <img src="images/liste-icon/icon-2.svg" alt="difficulty">
//                         <p pliste>${data.difficulty}</p>
//                     </div>
//                     <div class="icon_card">
//                         <p pliste>Cook time</p>
//                         <img src="images/liste-icon/icon-1.svg" alt="ur">
//                         <p pliste>${data.cookTimeMinutes} min</p>
//                     </div>
//                 </div>
//                 <div class="card_button">
//                     <a href="recipe.html?id=${data.id}">See more</a>
//                 </div>
//             </div>`;
//     })
//     .join("");
// }

function capitalize(s) {
  return String(s[0]).toUpperCase() + String(s).slice(1);
}

let productContainer = document.querySelector(".grid_container");

fetch(`https://dummyjson.com/recipes?meal-type=${mymealtype}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("recipes", data);
    console.log("url ", mymealtype);
    showList(data.recipes);
  });

function showList(meal) {
  console.log(meal);
  let markup = "";

  meal
    .map((meal) => {
      console.log("mealtype", meal.mealType, "my mealtype", mymealtype);
      if (meal.mealType.includes(mymealtype)) {
        markup += `  <div class="card">
                <img class="card_img" src="https://cdn.dummyjson.com/recipe-images/${meal.id}.webp" alt="billede_1">
                <div class="card_text">
                    <h2>${meal.name}</h2>
                    <p class="pliste">${meal.mealType}</p>
                </div>
                <div class="icons_card">
                    <div class="icon_card">
                        <p pliste>Prep time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p pliste>${meal.prepTimeMinutes} min</p>
                    </div>
                    <div class="icon_card">
                        <p pliste>Difficulty</p>
                        <img src="images/liste-icon/icon-2.svg" alt="difficulty">
                        <p pliste>${meal.difficulty}</p>
                    </div>
                    <div class="icon_card">
                        <p pliste>Cook time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p pliste>${meal.cookTimeMinutes} min</p>
                    </div>
                </div>
                <div class="card_button">
                    <a href="recipe.html?id=${meal.id}">See more</a>
                </div>
            </div>`;
      }
    })
    .join("");
  console.log("min markup er", markup);
  productContainer.innerHTML = markup;
}

const selectCuisine = document.querySelector("#cuisine");
selectCuisine.addEventListener("change", filterCuisine);
const url = "https://dummyjson.com/recipes?limit=0"; // limit=0 henter alle 50 opskrifter

let allRecipes,
  filteredData,
  cuisine = "All",
  mealType = "All";

function hentData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allRecipes = data.recipes;
      filteredData = allRecipes;
      buildSelects();
      visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  // Først dannes et nyt array med en liste over cuisine (kun en gang hver)
  const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));
  // Herefter dannes en select-liste med de cuisines der findes i det hentede data
  const markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;
}

function visListe(data) {
  const markup = data
    .map(
      (opskrift) => `
        <div class="card">
                <img class="card_img" src="https://cdn.dummyjson.com/recipe-images/${opskrift.id}.webp" alt="billede_1">
                <div class="card_text">
                    <h2>${opskrift.name}</h2>
                    <p>${opskrift.mealType}</p>
                </div>
                <div class="icons_card">
                    <div class="icon_card">
                        <p class="pliste2">Prep time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>${opskrift.prepTimeMinutes}</p>
                    </div>
                    <div class="icon_card">
                        <p class="pliste2">Difficulty</p>
                        <img src="images/liste-icon/icon-2.svg" alt="difficulty">
                        <p>${opskrift.difficulty}</p>
                    </div>
                    <div class="icon_card">
                        <p class="pliste2">Cook time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>${opskrift.cookTimeMinutes}</p>
                    </div>
                </div>
                <div class="card_button">
                    <a class="readmore" href="recipe.html?id=${opskrift.id}">See more</a>
                </div>
            </div>`
    )
    .join("");
  productContainer.innerHTML = markup;
}

function filterCuisine(event) {
  // Hvilken cuisine er valgt på select-listen?
  cuisine = event.target.value;
  if (cuisine == "All") {
    filteredData = allRecipes;
  } else {
    // hvis der valgt andet end "All" filtreres data med den valgte cuisine
    filteredData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
  }
  // Det filtrerede data vises
  visListe(filteredData);

  // Når opskrifterne er filtreret dannes en ny liste med kun de mealTypes der findes i det filtrerede data:
  const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
  const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
}
