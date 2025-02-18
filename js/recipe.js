const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const myRecipe = urlParams.get("id");

console.log("recipes:", myRecipe);

let productContainer = document.querySelector(".recipe_container");

fetch(`https://dummyjson.com/recipes/${myRecipe}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
        <div>
            <div class="produktbillede">
                <img class="billede" src="https://cdn.dummyjson.com/recipe-images/${myRecipe}.webp" alt="image">
            </div>

            <div>

                <h1>${data.name}</h1>
                <h3>Rating</h3>
                <p>${data.rating}</p>
                <h3>Mealtype</h3>
                <p>${data.mealType}</p>
                <h3>Difficulty</h3>
                <p>${data.difficulty}</p>
                <h3>Prep time</h3>
                <p>${data.prepTimeMinutes}</p>
                <h3>Cook time</h3>
                <p>${data.cookTimeMinutes}</p>
                <h3>Servings</h3>
                <p>${data.servings}</p>
            </div>

            <div>
                <h2>Ingredients</h2>
                <p>${data.ingredients}</p>
            </div>

            <div>
                <h2>Instructions</h2>
                <p>${data.instructions}</p>
            </div>
        </div>`;
  });
