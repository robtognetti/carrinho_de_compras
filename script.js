const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

let totalItems = [];

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};
// casa de cambio aulão Atanes 10-08-2022
const fetchCreate = async () => {
  const message = document.createElement('message');
  message.className = 'loading';
  message.innerText = 'Loading...';
  document.querySelector('.container-title').appendChild(message);
  const pegandoFetch = await fetchProducts('computador');
  document.querySelector('.loading').style.display = 'none';
  const sectionLoading = document.querySelector('.loading');
  sectionLoading.remove();
  const itemHtml = document.querySelector('.items');
  const { results } = pegandoFetch;
  results.forEach(({ id, title, thumbnail }) => {
  const item = createProductItemElement({ sku: id, name: title, image: thumbnail });
  itemHtml.appendChild(item);
  });
};

const cartItemClickListener = (event, sku) => {
  const evento = event.target;
  totalItems = totalItems.filter((element) => element.id !== sku);
  saveCartItems(totalItems);
  evento.remove();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};
// Mentoria Hellen 10-08-2022, Casa de Câmbio Aulão Professor Atanes 10-08-2022, StackOverflow how to use window listener with click events 
window.addEventListener('click', async (event) => {
  const section = event.target.parentElement;
  const idItem = section.querySelector('.item__sku').innerText;
  const resposta = await fetchItem(idItem);
  const { id: sku, title: name, price: salePrice } = resposta;
  const total = createCartItemElement({ sku, name, salePrice });
  const carrinho = document.getElementsByClassName('cart__items')[0];
  carrinho.appendChild(total);
});

const returnSavedItems = () => {
  // Monitoria Guthias 09-08-2022 Esquenta Bloco 09
  const carrinho = document.querySelector('.cart__items') || [];
  carrinho.innerHTML = localStorage.cartItems;
};

const clearCart = () => {
  const carrinho = document.querySelector('.cart__items');
  const limpar = document.querySelector('.empty-cart');
  limpar.addEventListener('click', () => {
    carrinho.innerHTML = '';
  });
};

window.onload = () => { 
  fetchCreate();
  getSavedCartItems();
  returnSavedItems();
  clearCart();
};