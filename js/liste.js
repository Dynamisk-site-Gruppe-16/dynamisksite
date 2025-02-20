const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mymealtype = urlParams.get("meal-type");

console.log("Mealtype", mymealtype);

let recipeContainer = document.querySelector(".grid_container");

fetch(`https://dummyjson.com/recipes?meal-type=${mymealtype}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("url ", mymealtype);
    showList(data.recipes);
  });

function showList(recipes) {
  console.log("recipes", recipes);
  let markup = recipes
    .map((meal) => {
      return `  <div class="card">
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
    })
    .join("");
  //   console.log("min markup er", markup);
  recipeContainer.innerHTML = markup;
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
      //   visListe(allRecipes);
    });
}

hentData();

function buildSelects() {
  const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));

  const markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
  selectCuisine.innerHTML += markup;
}

function filterCuisine(event) {
  cuisine = event.target.value;
  if (cuisine == "All") {
    filteredData = allRecipes;
  } else {
    filteredData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
  }

  showList(filteredData);

  const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
  const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
}
