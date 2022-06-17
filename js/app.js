'use strict';

// product constructor function

function Product(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
}

// render images function

Product.prototype.render = function (i) {
  let img = document.getElementById(`img-${i}`);
  img.src = this.src;
};

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

// unique products maker function

let randomProducts = [];
let prevRandProducts = [];
let uniqueProdCount = 3;

function randProductArray() {
  while (randomProducts.length < uniqueProdCount) {
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
    // console.log(shownProduct);
  }
}
showRandProducts();

// add / remove event listener

let totalClicks = 25;
let currentClicks = 0;

function addClickHandler(i) {
  let img = document.getElementById(`img-${i}`);
  img.addEventListener('click', clickImg);

  if (currentClicks === totalClicks) {
    img.removeEventListener('click', clickImg);
    renderChart();
  } else {
    return;
  }
}
addClickHandler(0);
addClickHandler(1);
addClickHandler(2);

// votes & current clicks counter function

function clickImg(event) {
  event.preventDefault();
  currentClicks++;
  let id = event.target.id[4];
  shownProducts[id].votes++;
  console.log(allProducts);
  randomProducts = [];
  showRandProducts();
  addClickHandler(0);
  addClickHandler(1);
  addClickHandler(2);
  save();
  get();
}

// display results after button click function

function displayResults() {
  let listResults = document.getElementById('results');

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];
    let item = document.createElement('li');
    item.innerText = `${product.name} had ${product.votes} votes, and was seen ${product.views} times.`;
    listResults.appendChild(item);
  }
}
let viewResults = document.getElementById('view-results');
viewResults.addEventListener('click', displayResults);

// local storage save, retrieve & render functions

function save() {
  let stringifyProd = JSON.stringify(allProducts);
  localStorage.setItem('products', stringifyProd);
}
function get() {
  let retrievedArray = [];
  let retrievedProd = localStorage.getItem('products');
  JSON.parse(retrievedProd);
  retrievedArray.push(retrievedProd);
}

// chartjs function

function renderChart() {
  let ctx = document.getElementById('myChart');
  let names = [];
  let views = [];
  let votes = [];

  for (let i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name);
    views.push(allProducts[i].views);
    votes.push(allProducts[i].votes);
  }
  // eslint-disable-next-line no-undef
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
  console.log(myChart);
}
