import { getNode } from '../../lib/index.js';

const cartProduct = getNode('.cart-product');

function deleteItemFromCart(itemName) {
  let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  storedCart = storedCart.filter((item) => item.name !== itemName);
  localStorage.setItem('cart', JSON.stringify(storedCart));

  loadAndDisplayCart();
}

function loadAndDisplayCart() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

  cartProduct.innerHTML = '';

  // 장바구니가 비어 있는 경우
  if (storedCart.length === 0) {
    cartProduct.innerHTML = /*html*/ `
      <div class="cart__message">
        <p>장바구니에 담긴 상품이 없습니다</p>
      </div>
    `;
    return;
  }

  storedCart.forEach((item) => {
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
                <input type="checkbox" id="product-checkbox-1" />
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
                    disabled
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
                    >${item.salePrice}원</span
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
  });
}

//상품 삭제
function handleDeleteButtonClick(event) {
  if (event.target.classList.contains('cart-delete-button')) {
    const itemName = event.target.dataset.itemName;
    deleteItemFromCart(itemName);
  }
}

cartProduct.addEventListener('click', handleDeleteButtonClick);

window.onload = loadAndDisplayCart;
