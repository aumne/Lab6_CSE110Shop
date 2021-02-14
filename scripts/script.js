// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // fetch data if not stored yet
  if (!(localStorage.getItem('fetch_data'))) { 
    const response = await fetch('https://fakestoreapi.com/products');
    const fetch_data = await response.json();
    localStorage.setItem('fetch_data', JSON.stringify(fetch_data));
  }

  if (!(localStorage.getItem('cart_count'))) { 
    localStorage.setItem('cart_count', 0);
  }

  const product_data = JSON.parse(localStorage.getItem('fetch_data') || '[]');
  const product_list = document.getElementById('product-list');

  // add all products to product list
  for (let id in product_data) {
    const current_product = document.createElement('product-item');
    current_product.item = product_data[id];

    product_list.appendChild(current_product);
  }

});