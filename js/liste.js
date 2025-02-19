const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mycategory = urlParams.get("meal-type");

console.log("Kategori:", mycategory);

let productContainer = document.querySelector(".product_list_container");

fetch(``)
  .then((Response) => Response.json())
  .then((data) => showList(data));

function showList(meal) {
  const markup = meal
    .map((product) => {
      return `  <div class="card">
                <img class="card_img" src="https://cdn.dummyjson.com/recipe-images/${product.id}.webp" alt="billede_1">
                <div class="card_text">
                    <h2>Classic Margherita Pizza</h2>
                    <p>Dinner</p>
                </div>
                <div class="icons_card">
                    <div class="icon_card">
                        <p>Prep time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>15 min</p>
                    </div>
                    <div class="icon_card">
                        <p>Difficulty</p>
                        <img src="images/liste-icon/icon-2.svg" alt="difficulty">
                        <p>Easy</p>
                    </div>
                    <div class="icon_card">
                        <p>Cook time</p>
                        <img src="images/liste-icon/icon-1.svg" alt="ur">
                        <p>20 min</p>
                    </div>
                </div>
                <div class="card_button">
                    <a href="recipe.html">Læs mere</a>
                </div>
            </div>`;
    })
    .join("");
  productContainer.innerHTML = markup;
}
