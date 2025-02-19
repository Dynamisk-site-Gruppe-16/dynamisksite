const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mymealtype = capitalize(urlParams.get("meal-type"));

console.log("Kategori:", mymealtype);

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
                    <p>${meal.mealType}</p>
                </div>
                <div class="icons_card">
                    <div class="icon_card">
                        <p>Prep time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>${meal.prepTimeMinutes} minutter</p>
                    </div>
                    <div class="icon_card">
                        <p>Difficulty</p>
                        <img src="images/liste-icon/icon-2.svg" alt="difficulty">
                        <p>${meal.difficulty}</p>
                    </div>
                    <div class="icon_card">
                        <p>Cook time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>${meal.cookTimeMinutes} minutter</p>
                    </div>
                </div>
                <div class="card_button">
                    <a href="recipe.html">Læs mere</a>
                </div>
            </div>`;
      }
    })
    .join("");
  console.log("min markup er", markup);
  productContainer.innerHTML = markup;
}

// const container = document.querySelector("grid_container");
// const h2 = document.querySelector("h2");
// const selectCuisine = document.querySelector("#cuisine");
// selectCuisine.addEventListener("change", filterCuisine);
// const url = "https://dummyjson.com/recipes?limit=0"; // limit=0 henter alle 50 opskrifter

// let allRecipes,
//   filteredData,
//   cuisine = "All",
//   mealType = "All";

// function hentData() {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       allRecipes = data.recipes;
//       filteredData = allRecipes;
//       buildSelects();
//       visListe(allRecipes);
//     });
// }

// hentData();

// function buildSelects() {
//   // Først dannes et nyt array med en liste over cuisine (kun en gang hver)
//   const uniqueCuisines = Array.from(new Set(allRecipes.map((recipe) => recipe.cuisine)));
//   // Herefter dannes en select-liste med de cuisines der findes i det hentede data
//   const markup = uniqueCuisines.map((cuisine) => ` <option value="${cuisine}">${cuisine}</option>`).join("");
//   selectCuisine.innerHTML += markup;
// }

// function visListe(data) {
//   const markup = data
//     .map(
//       (opskrift) => `
//         <div class="card">
//                 <img class="card_img" src="https://cdn.dummyjson.com/recipe-images/${opskrift.id}.webp" alt="billede_1">
//                 <div class="card_text">
//                     <h2>${opskrift.name}</h2>
//                     <p>${opskrift.mealType}</p>
//                 </div>
//                 <div class="icons_card">
//                     <div class="icon_card">
//                         <p>Prep time</p>
//                         <img src="images/liste-icon/icon-1.svg" alt="ur">
//                         <p>${opskrift.prepTimeMinutes}</p>
//                     </div>
//                     <div class="icon_card">
//                         <p>Difficulty</p>
//                         <img src="images/liste-icon/icon-2.svg" alt="difficulty">
//                         <p>${opskrift.difficulty}</p>
//                     </div>
//                     <div class="icon_card">
//                         <p>Cook time</p>
//                         <img src="images/liste-icon/icon-1.svg" alt="ur">
//                         <p>${opskrift.cookTimeMinutes}</p>
//                     </div>
//                 </div>
//                 <div class="card_button">
//                     <a href="recipe.html">Læs mere</a>
//                 </div>
//             </div>`
//     )
//     .join("");
//   container.innerHTML = markup;
//   h2.textContent = cuisine + " (" + data.length + ")"; // data.length giver antallet af opskrifter på listen
// }

// function filterCuisine(event) {
//   // Hvilken cuisine er valgt på select-listen?
//   cuisine = event.target.value;
//   if (cuisine == "All") {
//     filteredData = allRecipes;
//   } else {
//     // hvis der valgt andet end "All" filtreres data med den valgte cuisine
//     filteredData = allRecipes.filter((recipe) => recipe.cuisine == cuisine);
//   }
//   // Det filtrerede data vises
//   visListe(filteredData);

//   // overskriften rettes så den viser, hvad der er valgt
//   h2.textContent = cuisine + " (" + filteredData.length + ")";

//   // Når opskrifterne er filtreret dannes en ny liste med kun de mealTypes der findes i det filtrerede data:
//   const uniqueMTypes = Array.from(new Set(filteredData.map((recipe) => recipe.mealType[0])));
//   const markup = uniqueMTypes.map((element) => `<option value="${element}">${element}</option>`).join("");
//   selectMealType.innerHTML = '<option value="All">All</option>' + markup;
// }
