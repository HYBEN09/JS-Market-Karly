import { getNode } from '../../lib/index.js';

/* ------------------------------- 배너를 숨기는 함수 ------------------------------- */
const closeBannerButton = getNode('.top-banner__close-btn');
const topBanner = getNode('.top-banner');

function hideBanner() {
  topBanner.style.display = 'none';
}

function setupCloseButton() {
  closeBannerButton.addEventListener('click', hideBanner);
}

document.addEventListener('DOMContentLoaded', setupCloseButton);

/* ------------------------------- 공지사항 토글 메뉴 ------------------------------- */
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = getNode('.header__dropdown.menu');

dropdownMenu.addEventListener('mouseleave', () => {
  dropdownMenu.style.display = 'none';
});

menuToggle.addEventListener('mouseenter', () => {
  dropdownMenu.style.display = 'block';
});
