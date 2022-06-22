'use strict';

// product constructor function

function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
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

// render images function

Product.prototype.render = function (i) {
  let img = document.getElementById(`img-${i}`);
  img.src = this.src;
};

// random image generator function

function randomImage() {
  let randImg = Math.floor(Math.random() * allProducts.length);
  return allProducts[randImg];
}

// local storage save & retrieve functions

function save() {
  if (localStorage.getItem('products') === null) {
    let stringifyProd = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifyProd);
  } else get();
}
function get() {
  let retrievedProd = localStorage.getItem('products');
  retrievedProd = JSON.parse(retrievedProd);
  for (let i = 0; i < allProducts.length; i++) {
    allProducts[i].views = allProducts[i].views + retrievedProd[i].views;
    allProducts[i].votes = allProducts[i].votes + retrievedProd[i].votes;
  }
  let sumProd = JSON.stringify(allProducts);
  localStorage.setItem('products', sumProd);
}

// unique product generator function

let randomProducts = [];
let prevRandProducts = [];

function randProductArray() {
  while (randomProducts.length < 3) {
    let randomProduct = randomImage();
    if (
      !randomProducts.includes(randomProduct) &&
      !prevRandProducts.includes(randomProduct)
    ) {
      randomProducts.push(randomProduct);
      prevRandProducts.push(randomProduct);
    }
  }
  if (prevRandProducts.length === 6) {
    prevRandProducts.splice(0, 3);
  }
  return randomProducts;
}

// show unique products function

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

// add & remove click handler

let totalClicks = 25;
let currentClicks = 0;

function addClickHandler(i) {
  let img = document.getElementById(`img-${i}`);
  img.addEventListener('click', onClick);
}
function onClick(event) {
  event.preventDefault();
  let id = event.target.id;
  if (currentClicks === totalClicks) {
    for (let i = 0; i < 2; i++) {
      let img = document.getElementById(`image${i}`);
      img.removeEventListener('click', addClickHandler);
    }
    alert('Voting has ended, please View Results.');
  } else {
    currentClicks++;
    shownProducts[`${id[4]}`].votes++;
    randomProducts = [];
    showRandProducts();
  }
}
addClickHandler(0);
addClickHandler(1);
addClickHandler(2);

// render chart button

let viewResults = document.getElementById('view-results');
viewResults.addEventListener('click', renderChart);

// chartjs function

function renderChart() {
  save();
  let ctx = document.getElementById('myChart').getContext('2d');
  let names = [];
  let views = [];
  let votes = [];

  for (let i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name);
    views.push(allProducts[i].views);
    votes.push(allProducts[i].votes);
  }

  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [
        {
          label: '# of Views',
          data: views,
          backgroundColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1.5,
        },
        {
          label: '# of Votes',
          data: votes,
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1.5,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
