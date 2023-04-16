const templateCardNode = document
  .querySelector('#card')
  .content.querySelector('.card');
const cardWrapperNode = document.querySelector('.card-wrapper');
const fragmentWrapperCards = document.createDocumentFragment();

const temlateBrandNode = document
  .querySelector('#brand')
  .content.querySelector('.brand');
const sortWrapperNode = document.querySelector('.brands-list');
const fragmentWrapperSort = document.createDocumentFragment();

const cartItems = [];

const renderCard = (cards) => {
  cards.forEach((card) => {
    const cardValue = templateCardNode.cloneNode(true);

    cardValue.querySelector('.card__title').textContent = card.title;
    cardValue.querySelector('.card__img').src = card.image;
    cardValue.querySelector('.price__currency').textContent =
      card.regular_price.currency;
    cardValue.querySelector('.price__value').textContent =
      card.regular_price.value;
    cardValue.querySelector('#card-brand').textContent = card.brand;

    fragmentWrapperCards.appendChild(cardValue);
  });

  cardWrapperNode.appendChild(fragmentWrapperCards);
  return cardWrapperNode;
};

const renderSort = (brands) => {
  brands.forEach((brand) => {
    const sortBrand = temlateBrandNode.cloneNode(true);

    sortBrand.querySelector('.brand__title').textContent = brand.title;
    sortBrand.querySelector('#brand-id').textContent = brand.id;

    const btnAdd = document.querySelectorAll('.button-add');

    btnAdd.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('added');
      });
    });

    fragmentWrapperSort.appendChild(sortBrand);
  });

  sortWrapperNode.appendChild(fragmentWrapperSort);
  return sortWrapperNode;
};

fetch('./assets/products.json')
  .then((res) => res.json())
  .then((json) => renderCard(json));

fetch('./assets/brands.json')
  .then((res) => res.json())
  .then((json) => renderSort(json));

document.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'A') {
    route(evt)
  }
  evt.preventDefault();
});

const route = (evt) => {
  window.history.pushState({}, '', evt.target.href);
  handleLocation();
};

const routers = {
  '/': 'index.html',
  '/cartt': 'cartt.html',
  '/page': 'page.html'
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const html = await fetch(routers[path]).then((data) => data.text());
  document.querySelector('.container').innerHTML = html;
};

window.route = route;
