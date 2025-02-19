const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mymealtype = urlParams.get("meal-type");

console.log("Kategori:", mymealtype);

let productContainer = document.querySelector(".grid_container");

fetch(`https://dummyjson.com/recipes?meal-type=${mymealtype}`)
  .then((response) => response.json())
  .then((data) => {
    console.log("recipes", data);
    showList(data.recipes);
  });

function showList(meal) {
  console.log(meal);
  let markup = "";

  meal
    .map((meal) => {
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
                        <p>${meal.prepTimeMinutes}</p>
                    </div>
                    <div class="icon_card">
                        <p>Difficulty</p>
                        <img src="images/liste-icon/icon-2.svg" alt="difficulty">
                        <p>${meal.difficulty}</p>
                    </div>
                    <div class="icon_card">
                        <p>Cook time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>${meal.cookTimeMinutes}</p>
                    </div>
                </div>
                <div class="card_button">
                    <a href="recipe.html">Læs mere</a>
                </div>
            </div>`;
    })
    .join("");
  console.log("min markup er", markup);
  productContainer.innerHTML = markup;
}
