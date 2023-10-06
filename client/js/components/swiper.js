const bannerSwiper = new Swiper('.banner > .swiper', {
  autoplay: true,
  loop: true,
  speed: 200,
  parallax: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const mainSwiper = new Swiper('.swiper1', {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 10,
  speed: 400,
  navigation: {
    nextEl: '.nextbtn',
    prevEl: '.prevbtn',
  },
});

const mainSwiper2 = new Swiper('.swiper2', {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 10,
  speed: 400,
  navigation: {
    nextEl: '.nextbtn2',
    prevEl: '.prevbtn2',
  },
});
