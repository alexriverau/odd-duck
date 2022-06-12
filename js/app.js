'use strict';

// Product Constructor Function

function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
}

// Products Array

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
  new Product('wine-glass')
];

// Random Image Generator Function

function randomImage() {
  let randImg = Math.floor(Math.random() * allProducts.length);
  return allProducts[randImg];
}

// Render Random Images Function

Product.prototype.render = function (i) {
  let img = document.getElementById(`img-${i}`);
  img.src = this.src
};

// Random Product Array Maker Function

let randomProducts = [];

function randProductArray() {
  while (randomProducts.length < 3) {
    let randomProduct = randomImage();
    if(!randomProducts.includes(randomProduct)) {
      randomProducts.push(randomProduct);
    }
  }
  return randomProducts;
}

// Display Random Products Function

let shownProducts = [];

function showRandProducts() {
  shownProducts = randProductArray();
  for (let i = 0; i < shownProducts.length; i++) {
    let shownProduct = shownProducts[i];

    shownProduct.views++;
    shownProduct.render(i);
  }
}
showRandProducts();

// Click Handler Function

function addClickHandler (i) {
  let img = document.getElementById(`img-${i}`);
  img?.addEventListener('click', function() {
    console.log(`clicked image ${i}`);
    shownProducts[i].clicks++;
    randomProducts = [];
    showRandProducts();
  });
}
addClickHandler(0);
addClickHandler(1);
addClickHandler(2);