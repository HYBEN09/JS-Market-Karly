const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.querySelector('.header__dropdown.menu');

dropdownMenu.addEventListener('mouseleave', () => {
  dropdownMenu.style.display = 'none';
});

menuToggle.addEventListener('mouseenter', () => {
  dropdownMenu.style.display = 'block';
});
