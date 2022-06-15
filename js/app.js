'use strict';

// product constructor function

function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
}

// products array

let allProducts = [
  new Product('bag'),
  new Product('banana'),
  new Product('bathroom'),
  new Product('boots'),
  new Product('breakfast'),
  new Product('bubblegum'),
  new Product('chair'),
  new Product('cthulhu'),
  new Product('dog-duck'),
  new Product('dragon'),
  new Product('pen'),
  new Product('pet-sweep'),
  new Product('scissors'),
  new Product('shark'),
  new Product('sweep'),
  new Product('tauntaun'),
  new Product('unicorn'),
  new Product('water-can'),
  new Product('wine-glass'),
];

// random image generator function

function randomImage() {
  let randImg = Math.floor(Math.random() * allProducts.length);
  return allProducts[randImg];
}

// render images function

Product.prototype.render = function (i) {
  let img = document.getElementById(`img-${i}`);
  img.src = this.src;
};

// 3 random products array maker function

let randomProducts = [];

function randProductArray() {
  while (randomProducts.length < 3) {
    let randomProduct = randomImage();
    if (!randomProducts.includes(randomProduct)) {
      randomProducts.push(randomProduct);
    }
  }
  return randomProducts;
}

// display 3 random products function

let shownProducts = [];

function showRandProducts() {
  shownProducts = randProductArray();
  for (let i = 0; i < shownProducts.length; i++) {
    let shownProduct = shownProducts[i];

    shownProduct.views++;
    shownProduct.render(i);
    console.log(shownProduct);
  }
}
showRandProducts();

// click image controler & round counter function

let totalClicks = 25;
let currentClicks = 0;

function clickImg() {
  currentClicks++;
  randomProducts = [];
  showRandProducts();
  addClickHandler(0);
  addClickHandler(1);
  addClickHandler(2);
}

// add / remove event listener & click counter function

function addClickHandler(i) {
  shownProducts[i].clicks++;
  let img = document.getElementById(`img-${i}`);
  if (currentClicks === totalClicks) {
    img.removeEventListener('click', clickImg);
  } else {
    img.addEventListener('click', clickImg);
    shownProducts[i].clicks++;
    showRandProducts();
  }
}
addClickHandler(0);
addClickHandler(1);
addClickHandler(2);

// display results function

function diplayResults() {
  let listResults = document.getElementById('results');

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];
    let item = document.createElement('li');
    item.innerText = `${product.name} had ${product.clicks} votes, and was seen ${product.views} times.`;
    listResults.appendChild(item);
  }
}
let viewResults = document.getElementById('view-results');
viewResults.addEventListener('click', diplayResults);
