import { getNode } from '../../lib/index.js';

const cartProduct = getNode('.cart-product');
const orderSummary = getNode('.order-summary');

// 장바구니에서 특정 아이템 삭제
function deleteItemFromCart(itemName) {
  let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  storedCart = storedCart.filter((item) => item.name !== itemName);
  localStorage.setItem('cart', JSON.stringify(storedCart));

  loadAndDisplayCart();
}

// 장바구니가 비어있을 때 출력할 메시지 생성
function displayEmptyMessage() {
  cartProduct.innerHTML = /*html*/ `
      <div class="cart__message">
        <p>장바구니에 담긴 상품이 없습니다</p>
      </div>
    `;
}

// 각 상품에 대한 HTML 생성
function createCartItemHTML(item, index) {
  const displayedPricePerItem = item.salePrice ? item.salePrice : item.price;
  const totalDisplayedPrice = displayedPricePerItem * item.quantity;

  const cartItemHTML = /*html*/ `
      <div class="cart-product_top">
              <div class="cart-product_data">
                <img
                  src="${item.categoryImg}"
                  alt=""
                  width="30"
                  height="30"
                />
                <h3>${item.categoryData} 상품</h3>
              </div>
              <button class="cart-toggle-button" aria-label="접기/펼치기">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBpZD0iN2EwMnFxZzNqYSIgZD0iTTExIDEyaDl2OSIvPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDMwdjMwSDB6Ii8+CiAgICAgICAgPHVzZSBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSIgdHJhbnNmb3JtPSJyb3RhdGUoLTQ1IDE1LjUgMTYuNSkiIHhsaW5rOmhyZWY9IiM3YTAycXFnM2phIi8+CiAgICA8L2c+Cjwvc3ZnPgo="
                  alt="접기"
                />
              </button>
            </div>

            <ul class="cart-product-list">
              <li class="cart-product-item">
                <input type="checkbox" id="product-checkbox-${index}"  />
                <label for="product-checkbox-1">
                  <img
                     src="${item.thumbnail}"
                    alt="상품 이미지"
                    width="60"
                    height="78"
                  />
                </label>
                <div class="cart-product-details">
                  <p class="cart-product-name">${item.name}</p>
                  <p class="cart-product-description">${item.description}</p>
                </div>
                <form class="cart-quantity-form">
                  <button
                    type="button"
                    class="cart-quantity-decrease"
                    aria-label="수량 내리기"
                  ></button>
                  <div class="cart-quantity">${item.quantity}</div>
                  <button
                    type="button"
                    class="cart-quantity-increase"
                    aria-label="수량 올리기"
                  ></button>
                </form>

                <div class="cart-prices">
                  <span class="cart-price-discounted" aria-label="할인 가격"
                    >${totalDisplayedPrice}원</span
                  >
                  <span class="cart-price-original" aria-label="판매 가격"
                    >${item.price}원</span
                  >
                </div>
                <button
                  type="button"
                  class="cart-delete-button"
                  aria-label="상품 삭제"
                   data-item-name="${item.name}" 
                ></button>
              </li>
            </ul>
            `;

  cartProduct.innerHTML += cartItemHTML;
}

// 상품 정보 동적 구현
function loadAndDisplayCart() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  cartProduct.innerHTML = '';

  // 장바구니가 비어 있는 경우
  if (storedCart.length === 0) {
    displayEmptyMessage();
    return;
  }

  storedCart.forEach((item, index) => {
    createCartItemHTML(item, index);
  });

  // "수량 증가" 버튼에 대한 이벤트 리스너 추가
  Array.from(
    cartProduct.getElementsByClassName('cart-quantity-increase')
  ).forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemName = event.target
        .closest('.cart-product-item')
        .querySelector('.cart-product-name').textContent;
      updateQuantity(itemName, +1);
    });
  });

  // "수량 감소" 버튼에 대한 이벤트 리스너 추가
  Array.from(
    cartProduct.getElementsByClassName('cart-quantity-decrease')
  ).forEach((button) => {
    button.addEventListener('click', (event) => {
      const itemName = event.target
        .closest('.cart-product-item')
        .querySelector('.cart-product-name').textContent;
      updateQuantity(itemName, -1);
    });
  });
}

// 배송 정보 동적 구현
function loadAndDisplayOrder() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalAmount = 0;
  let totalPrice = 0;
  let totalDiscount = 0;

  storedCart.forEach((item) => {
    const displayedPricePerItem = item.salePrice ? item.salePrice : item.price;
    const totalDisplayedPrice = displayedPricePerItem * item.quantity;
    totalAmount += totalDisplayedPrice;
    totalPrice += item.price * item.quantity;

    if (item.salePrice) {
      let discountPerItem = item.price - item.salePrice;
      totalDiscount += discountPerItem * item.quantity;
    }
  });

  const orderItemHTML = /*html*/ `
          <div class="summary__item">
                <span class="summary__label">상품금액</span>
                <span class="summary__value">
                <span class="summary__amount">${totalPrice}</span>
                <span class="summary__unit">원</span></span>
          </div>
              <div class="summary__item">
                <span class="summary__label">상품할인금액</span>
                <span class="summary__value"
                  ><span class="summary__amount">-${totalDiscount}</span
                  ><span class="summary__unit">원</span></span
                >
              </div>
              <div class="summary__item">
                <span class="summary__label">배송비</span>
                <span class="summary__value"
                  ><span class="summary__amount">0</span
                  ><span class="summary__unit">원</span></span
                >
              </div>
              <div class="summary__payment">
                <span class="summary__label">결제예정금액</span>
                <span class="payment__amount">
                  <strong
                    > <span class="payment__value">${totalAmount}</span>
                    <span class="payment__currency">원</span></strong
                  >
                </span>
              </div>
                <div class="summary__savings">
                <span class="savings__label">적립</span>
                <span class="savings__details">최대 36원 적립 일반 0.1%</span>
              </div>
              `;

  orderSummary.innerHTML += orderItemHTML;
}

const updateQuantity = (name, delta) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cart.find((item) => item.name === name);

  if (item) {
    item.quantity += delta;
    if (item.quantity < 1) item.quantity = 1; // Ensure the quantity is at least 1
    localStorage.setItem('cart', JSON.stringify(cart));
    loadAndDisplayCart();
  }
};

//상품 삭제
function handleDeleteButtonClick(event) {
  if (event.target.classList.contains('cart-delete-button')) {
    const itemName = event.target.dataset.itemName;
    deleteItemFromCart(itemName);
  }
}

cartProduct.addEventListener('click', handleDeleteButtonClick);

loadAndDisplayOrder();
window.onload = loadAndDisplayCart;
