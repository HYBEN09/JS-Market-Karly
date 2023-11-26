import { getNode } from '../../lib/index.js';

/* -------------------------------------------------------------------------- */
/*                                 배너를 숨기는 함수                              */
/* -------------------------------------------------------------------------- */
const closeBannerButton = getNode('.top-banner__close-btn');
const topBanner = getNode('.top-banner');

function hideBanner() {
  topBanner.style.display = 'none';
}

function setupCloseButton() {
  closeBannerButton.addEventListener('click', hideBanner);
}

document.addEventListener('DOMContentLoaded', setupCloseButton);

/* -------------------------------------------------------------------------- */
/*                                 공지사항 토글 메뉴                              */
/* -------------------------------------------------------------------------- */
// const menuToggle = document.getElementById('menu-toggle');
// const dropdownMenu = getNode('.header__dropdown.menu');

// dropdownMenu.addEventListener('mouseleave', () => {
//   dropdownMenu.style.display = 'none';
// });

// menuToggle.addEventListener('mouseenter', () => {
//   dropdownMenu.style.display = 'block';
// });

/* -------------------------------------------------------------------------- */
/*                            로그인 & 로그아웃 기능                               */
/* -------------------------------------------------------------------------- */
window.onload = function () {
  const storedUserInfo = JSON.parse(localStorage.getItem('User'));

  if (storedUserInfo) {
    const loginLink = document.querySelector(
      '.header__nav-link[href="./login.html"]'
    );
    const registerLink = document.querySelector(
      '.header__nav-link[href="./register.html"]'
    );

    if (loginLink && registerLink) {
      loginLink.textContent = storedUserInfo.name;
      registerLink.textContent = '로그아웃';

      registerLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('User');
        location.reload();
      });
    }
  }
};
