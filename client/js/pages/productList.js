import { getNode, getNodes } from '../../lib/index.js';

// DOM 요소 선택
const listItems = getNodes('.best-list li');
const sortOptions = getNodes('.sort-option');
const toggleButtons = getNodes('.toggle-btn');
const productList = getNode('.product-list_nav');

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

// 메뉴 클릭 토글 함수를 버튼에 각각 추가
function toggleNavActive(item, otherItems) {
  otherItems.forEach((otherItem) => {
    if (otherItem !== item) {
      otherItem.classList.remove('nav-active');
    }
  });

  item.classList.toggle('nav-active');
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

/* ---------------------------------- 함수 실행 ---------------------------- */
initializeToggleButtons();
activateSortOption();
