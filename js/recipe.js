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

        <h1>${data.name}</h1>

            <div class="grid_1_3">
                 <p><span class="label">Rating: </span>${data.rating}</p>
                <p><span class="label">Mealtype: </span>${data.mealType}</p>
                <p><span class="label">Difficulty: </span>${data.difficulty}</p>
                <p><span class="label">Prep time: </span>${data.prepTimeMinutes}</p>
                <p><span class="label">Cook time: </span>${data.cookTimeMinutes}</p>
                <p><span class="label">Servings: </span>${data.servings}</p>
            </div>

            <div class="grid_1_1">
                <div class="produktbillede">
                    <img class="billede" src="https://cdn.dummyjson.com/recipe-images/${myRecipe}.webp" alt="image">
                </div>

                <div class="ingredientbox">
                    <h2 class="ingredients">Ingredients</h2>
                    <ul class="ingredientlist">${data.ingredients
                      .map(
                        (ingredient) => `<li class="ingredientsli"> <input class="checkbox"
                                type="checkbox">
                            ${ingredient}</li>`
                      )
                      .join("")}</ul>
                </div>
            </div>

            <div class="grid_2_1">
                <div class="instructionbox">
                    <h2 class="instructions">Instructions</h2>
                    <ul class="instructionlist">${data.instructions
                      .map(
                        (instruction) => `<li class="instructionli">
                            ${instruction}</li>
                        `
                      )
                      .join("")}</ul>
                </div>
            </div>

            <h3 class="rateh3">Rate this recipe:</h3>
          <div class="rating">
  <input type="radio" id="star5" name="rating" value="5">
  <label for="star5">&#9733;</label>

  <input type="radio" id="star4" name="rating" value="4">
  <label for="star4">&#9733;</label>

  <input type="radio" id="star3" name="rating" value="3">
  <label for="star3">&#9733;</label>

  <input type="radio" id="star2" name="rating" value="2">
  <label for="star2">&#9733;</label>

  <input type="radio" id="star1" name="rating" value="1">
  <label for="star1">&#9733;</label>
</div>
        </div>`;
  });
