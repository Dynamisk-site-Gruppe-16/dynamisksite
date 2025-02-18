const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mycategory = urlParams.get("meal-type");

console.log("Kategori:", mycategory);

let productContainer = document.querySelector(".product_list_container");

fetch(``)
  .then((Response) => Response.json())
  .then((data) => showList(data));

function showList(products) {
  const markup = products
    .map((product) => {
      return ` <div class="kort">
      <div>
                    <img class="${product.soldout && "udsolgt"}" src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="jakke">
                    <p class="${product.soldout && "soldout"} ${!product.soldout && "hide"}" >Sold out</p>
                      <p class="${product.discount && "rabat"} ${!product.discount && "hide"}" >-${product.discount}%</p>
                </div>
                 <h2> ${product.productdisplayname}</h2>
                <p class="grey"> ${product.subcategory} | ${product.brandname}</p>
                <p>${product.price}</p>
                 <a href="produkt.html?id=${product.id}">Læs mere</a>
 
            </div>`;
    })
    .join("");
  productContainer.innerHTML = markup;
}
