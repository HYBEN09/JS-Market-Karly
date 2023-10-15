import { getNode, getNodes } from '../../lib/index.js';

// DOM 요소 선택
const listItems = getNodes('.best-list li');
const sortOptions = getNodes('.sort-option');
const toggleButtons = getNodes('.toggle-btn');
const productList = getNode('.product-list_nav');
const cartButtons = getNodes('.best-cart_btn');
const bestContainer = getNode('.best-container');
const cartWrapper = getNode('.cart-popup_wrapper');
const cartPlusBtn = getNode('.cart-popup_count-plus');
const cartMinusBtn = getNode('.cart-popup_count-minus');

let products = [];

/* -------------------------------------------------------------------------- */
/*                             메뉴 클릭 토글 함수                                */
/* -------------------------------------------------------------------------- */
function toggleListNav(e) {
  const listItem = e.currentTarget.parentElement;
  const listNav = listItem.nextElementSibling;

  listNav.classList.toggle('active');
  listItem.classList.toggle('active');
  e.currentTarget.classList.toggle('active');
}

function initializeToggleButtons() {
  toggleButtons.forEach((button) => {
    button.addEventListener('click', toggleListNav);
  });
}

/* -------------------------------------------------------------------------- */
/*                    SortOption 클릭 이벤트 처리 기능 추가                         */
/* -------------------------------------------------------------------------- */

function activateSortOption() {
  sortOptions.forEach((option) => {
    option.addEventListener('click', function () {
      sortOptions.forEach((o) => o.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

/* -------------------------------------------------------------------------- */
/*                Product 데이터를 불러오고 화면에 보여주는 함수                        */
/* -------------------------------------------------------------------------- */
// 할인 정보 HTML을 생성하는 함수
function generateDiscountInfo(discountRate) {
  return `<dd class="best__discount-rate">${(discountRate * 100).toFixed(
    0
  )}%</dd>`;
}

// 상품 HTML을 생성하는 함수
function generateProductHTML(product) {
  const discountInfo = product.saleRatio
    ? generateDiscountInfo(product.saleRatio)
    : '';
  const priceInfo = product.saleRatio
    ? /*html*/ `
    <div>
      <dd class="dimmed-price">${product.price}원</dd>
      <div class="price_info">
        <dd class="best__discount-rate">${(product.saleRatio * 100).toFixed(
          0
        )}%</dd>
        <dd class="best__price">${Math.floor(
          product.price * (1 - product.saleRatio)
        )}원</dd>
      </div>
    </div>`
    : `<dd class="best__price">${product.price}원</dd>`;

  const kalryOnlyInfo =
    product.kalryOnly === 'true'
      ? /*html*/ `
    <div class="best-message">
      <dd class="best__only">Karly Only</dd>
      <dd class="best__limit">한정수량</dd>
    </div>`
      : '';

  return /*html*/ `
    <a href="#" data-id="${product.id}">
      <figure class="best-img_wrapper">
        <div class="image-container">
          <img src="${product.image.thumbnail}" alt="${product.image.alt}" class="best-product_img" />
          <button class="best-cart_btn">
            <img src="../../assets/icons/cart.png" alt="장바구니 아이콘" class="best-cart_img" />
          </button>
        </div>
        <figcaption class="best-img_container">
          <h3 class="a11yHidden">${product.name}</h3>
          <dl class="best-item">
            <dd class="best__delivery">샛별배송</dd>
            <dd id="${product.id}" class="best__name">${product.name}</dd>
            <div class="price_info">
              ${priceInfo}
            </div>
            <dd class="best__info">${product.description}</dd>
            ${kalryOnlyInfo}
          </dl>
        </figcaption>
      </figure>
    </a>`;
}

// 상품 목록을 로드하고 표시하는 함수
function loadAndDisplayProducts() {
  fetch('http://localhost:5000/products')
    .then((response) => response.json())
    .then((data) => {
      products = data;
      console.log(products);
      data.forEach((product) => {
        const productHTML = generateProductHTML(product);
        bestContainer.innerHTML += productHTML;
      });

      initializeCartButtons();
    })
    .catch((error) => console.error(error));
}

/* -------------------------------------------------------------------------- */
/*                                장바구니 팝업                                  */
/* -------------------------------------------------------------------------- */

// 장바구니 팝업  동적 생성
function generateCartPopup(item) {
  let existingPopup = cartWrapper.querySelector('.cart-popup');

  if (existingPopup) {
    updateCartPopup(existingPopup, item);
  } else {
    cartWrapper.innerHTML += /*html*/ `
         <div class="cart-popup muiDialog-paper" role="document">
            <div class="cart-popup_content">
              <div class="cart-popup_content-top">
                <h2 id="cartPopupTitle" class="cart-popup_content-title">
                  <span>${item.name}</span>
                </h2>
                <div class="cart-popup_content-count">
                  <p class="cart-popup_product">${item.price}원</p>
                  <div class="cart-popup_count-box">
                    <button class="cart-popup_count-minus">-</button>
                    <span
                      class="cart-popup_count-total"
                      aria-live="polite"
                      aria-atomic="true"
                      >1</span
                    >
                    <button class="cart-popup_count-plus">+</button>
                  </div>
                </div>
              </div>
              <div class="cart-popup_content-middle">
                <div class="cart-popup_totals">
                  <p class="cart-popup_sum">합계</p>
                  <p><span class="cart-popup_price">${item.price}</span>원</p>
                </div>

                <div class="cart-popup_info">
                  <p>
                    <span class="save-tag cart-popup_save-tag">적립</span> 구매
                    시 5원 적립
                  </p>
                </div>
              </div>
              <div class="cart-popup_content-bottom">
                <div class="cart-popup_buttons">
                  <button
                    type="button"
                    class="cart-cancel cart-popup_cancel-button"
                  >
                    취소
                  </button>
                  <button type="button" class="cart-add cart-popup_add-button">
                    장바구니 담기
                  </button>
                </div>
              </div>
            </div>
          </div>
      `;

    const cancelBtn = getNode('.cart-cancel');
    cancelBtn.addEventListener('click', closeCartPopup);
    updateCartPopup(cartWrapper.querySelector('.cart-popup'), item);
    const addBtn = getNode('.cart-add');
    addBtn.addEventListener('click', handleAddToCartClick);
    updateCartPopup(cartWrapper.querySelector('.cart-popup'), item);
  }
}

function updateCartPopup(popup, item) {
  const titleElement = popup.querySelector('.cart-popup_content-title span');
  const priceElement = popup.querySelector('.cart-popup_product');
  const sumElement = popup.querySelector('.cart-popup_price');
  const minusButton = popup.querySelector('.cart-popup_count-minus');
  const plusButton = popup.querySelector('.cart-popup_count-plus');
  const countElement = popup.querySelector('.cart-popup_count-total');

  let count = 1;

  titleElement.textContent = item.name;
  priceElement.textContent = `${item.price}원`;
  sumElement.textContent = `${item.price}`;

  function handleMinusClick() {
    if (count > 1) {
      count--;
      countElement.textContent = count.toString();
      sumElement.innerText = `${item.price * count}`;
    }
  }

  function handlePlusClick() {
    count++;
    countElement.innerText = count.toString();
    sumElement.innerText = `${item.price * count}`;
  }

  minusButton.removeEventListener('click', handleMinusClick);
  minusButton.addEventListener('click', handleMinusClick);

  plusButton.removeEventListener('click', handlePlusClick);
  plusButton.addEventListener('click', handlePlusClick);
}

// 장바구니 취소 버튼 누를시 팝업창 닫히게 하는 함수
function closeCartPopup() {
  cartWrapper.classList.remove('show');
}

// 카트 버튼 클릭시 팝업 띄우기
function initializeCartButtons() {
  let cartButtons = getNodes('.best-cart_btn');
  cartButtons.forEach((button) =>
    button.addEventListener('click', handleCartButtonClick)
  );
}

// 장바구니 버튼에 이벤트 리스너를 추가하는 함수
function handleAddToCartClick(e) {
  e.preventDefault();

  const popup = e.currentTarget.closest('.cart-popup');

  const productId = popup.querySelector(
    '.cart-popup_content-title span'
  ).textContent;

  const price = parseInt(
    popup.querySelector('.cart-popup_product').textContent.replace('원', '')
  );

  const product = products.find((item) => item.name === productId);

  const cartItem = {
    id: productId,
    name: product.name,
    price: price,
    salePrice: product.salePrice,
    description: product.description,
    thumbnail: product.image.thumbnail,
    categoryImg: product.category.image,
    categoryData: product.category.data,
    quantity: parseInt(
      popup.querySelector('.cart-popup_count-total').textContent
    ),
  };

  let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = storedCart.find((item) => item.id === cartItem.id);

  if (existingItem) {
    existingItem.quantity += cartItem.quantity;
  } else {
    storedCart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(storedCart));
  closeCartPopup();
}

function handleCartButtonClick(event) {
  event.preventDefault();

  // 클릭한 버튼의 부모 요소(상품 요소)에서 data-id 값을 가져오기
  const productId = event.currentTarget.closest('a').dataset.id;

  // products 배열에서 해당 id를 가진 상품 찾기
  const product = products.find((product) => product.id === productId);

  generateCartPopup(product);

  cartWrapper.classList.add('show');
}

/* ---------------------------------- 함수 실행 ---------------------------- */
initializeToggleButtons();
activateSortOption();
loadAndDisplayProducts();
