// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    // build <style> element
    const style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    // build <li> element
    const list_html = document.createElement('li');
    list_html.setAttribute('class', 'product');

    const img_html = document.createElement('img');
    img_html.setAttribute('width', '200');
    img_html.setAttribute('max-height', '100%');

    const p_title = document.createElement('p');
    p_title.setAttribute('class', 'title');

    const p_price = document.createElement('p');
    p_price.setAttribute('class', 'price');

    const button = document.createElement('button');

    // create shadow DOM structure
    shadow.append(style, list_html);
    list_html.append(img_html, p_title, p_price, button);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const list_html = this.shadowRoot.children[1];
    const img_html = list_html.children[0];
    const p_title = list_html.children[1];
    const p_price = list_html.children[2];
    const button = list_html.children[3];

    const data = JSON.parse(newValue);

    img_html.setAttribute('src', data.image);
    img_html.setAttribute('alt', data.title);
    p_title.textContent = data.title;
    p_price.textContent = data.price;


    const id_list = JSON.parse(localStorage.getItem('id_list') || '[]');

    if (id_list.includes(data.id)) {
      button.textContent = 'Remove from Cart';
    } else {
      button.textContent = 'Add to Cart';
    }
    
    button.setAttribute('onclick', `updateCart(${button}, ${data.id})`);
  }

  static get observedAttributes() {
    return ['item'];
  }

  get item() {
    return this.getAttribute('item');
  }

  set item(newValue) {
    this.setAttribute('item', newValue);
  }
}

customElements.define('product-item', ProductItem);

function updateCart(button, id) {
  const id_list = JSON.parse(localStorage.getItem('id_list') || '[]');
  let cart_count = parseInt(localStorage.getItem('cart_count'));
  
  if (id_list.includes(id)) {
    const index = id_list.indexOf(id);
    id_list.splice(index, 1);
    cart_count--;
    button.textContent = 'Add to Cart';
  } else {
    id_list.push(id);
    cart_count++;
    button.textContent = 'Remove from Cart';
    alert('Added to Cart!');
  }
  localStorage.setItem('id_list', JSON.stringify(id_list));
  localStorage.setItem('cart_count', cart_count.toString());
}
