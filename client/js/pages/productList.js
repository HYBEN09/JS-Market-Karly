import { getNode, getNodes } from '../../lib/index.js';

// DOM 요소 선택
const listItems = getNodes('.best-list li');
const sortOptions = getNodes('.sort-option');
const toggleButtons = getNodes('.toggle-btn');
const productList = getNode('.product-list_nav');
const bestContainer = getNode('.best-container');

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
function generateDiscountInfo(discountRate) {
  return `
    <dd class="best__discount-rate">${(discountRate * 100).toFixed(0)}%</dd>
  `;
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
      <dd class="best__price">  ${Math.floor(
        product.price * (1 - product.saleRatio)
      )}원</dd></div>
        </div>
    `
    : `<dd class="best__price">${product.price}원</dd>`;

  return /*html*/ `
    <a href="#">
      <figure class="best-img_wrapper">
        <div class="image-container">
          <img src="${product.image.thumbnail}" alt="${
            product.image.alt
          }" class="best-product_img" />
        </div>
        <button class="best-cart_btn">
          <img src="../../assets/icons/cart.png" alt="장바구니 아이콘" class="best-cart_img" />
        </button>
        <figcaption class="best-img_container">
          <h3 class="a11yHidden">${product.name}</h3>
          <dl class="best-item">
            <dt aria-hidden="true" class="a11yHidden">배송안내</dt>
            <dd class="best__delivery">샛별배송</dd>
            <dt aria-hidden="true" class="a11yHidden">배송안내</dt>
            <dd id="${product.id}" class="best__name">${product.name}</dd>
            <div class="price_info">
              <dt class="a11yHidden">가격</dt>
              ${priceInfo}
              <dt class="a11yHidden">상품설명</dt>
            </div>
            <dd class="best__info">${product.description}</dd>
        ${
          product.kalryOnly === 'true'
            ? `
            <div class="best-message">
              <dt aria-hidden="true" class="a11yHidden">단독</dt>
              <dd class="best__only">Karly Only</dd>
              <dt aria-hidden="true" class="a11yHidden">수량정보</dt>
              <dd class="best__limit">한정수량</dd>
            </div>
            `
            : `<div style="height: 34px;"></div>`
        }
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
      data.forEach((product) => {
        const productHTML = generateProductHTML(product);
        bestContainer.innerHTML += productHTML;
      });
    })
    .catch((error) => console.error(error));
}

/* ---------------------------------- 함수 실행 ---------------------------- */
initializeToggleButtons();
activateSortOption();
loadAndDisplayProducts();
