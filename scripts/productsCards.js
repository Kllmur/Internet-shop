'use strict';

const pathToImages = 'img';
const pathToProductsImages = `${pathToImages}/cardImages`;
const featuredItemsEl = document.querySelector('.fetured__product');

/**
 * Эта функция принимает один из объектов из массива products в файле products.js.
 * @param {ProductDTO} product объект с информацией о продукте
 * @returns {string} html-разметка карточки товара
 */
function getProductMarkup(product) {
    return `
        <div class="fetured__capsule" >

        <img src="${pathToProductsImages}/${product.image}" alt="${product.name}">

            <div class="overlay">
                    <button class="btn" data-productId="${product.id}">
                        <img class="logo__basket" src="img/basket__add.svg" alt="logo">
                            <p> Add to cart</p>
                    </button>
            </div>

            <a class="link__product" href="product.html">
                <h3 class="catalog__title"> ${product.name}</h3>
            </a>
            <p class="capsule__text">${product.description}</p>
            <p class="capsule__price">$${product.price}</p>

        </div>
    `;
}

/**
 * Функция вставляет карточки товаров в страницу.
 * @param {ProductDTO[]} products массив товаров из файла products.js
 * @param {HTMLDivElement} featuredItemsEl элемент с классом .featuredItems
 */
function insertProductsIntoPage(products, featuredItemsEl) {
    let productsMarkup = '';
    for (let product of products) {
        productsMarkup += getProductMarkup(product);
    }
    featuredItemsEl.insertAdjacentHTML('afterbegin', productsMarkup);
}


/**
 * Функция назначает обработку клика на все кнопки "Add to cart".
 */
function addEventListenersForAddToCartButtons() {
    const addToCartBtns = document.querySelectorAll('button[data-productId]');
    addToCartBtns.forEach(function (button) {
        button.addEventListener('click', addedProductHandler);
    })
}

/**
 * Функция-обработчик события клика по кнопке "Add to cart".
 * @param {MouseEvent} event
 */
function addedProductHandler(event) {
    const productId = event.currentTarget.getAttribute('data-productId');
    addProductIntoBasket(productId);
}

insertProductsIntoPage(products, featuredItemsEl);
addEventListenersForAddToCartButtons();