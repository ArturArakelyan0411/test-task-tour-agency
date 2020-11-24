const swiper = new Swiper('.swiper-container', {
  slidesPerView: 6,
  slidesPerColumn: 2,
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    1240: {
      slidesPerView: 6,
    },
    821: {
      slidesPerView: 4,
    },
    620: {
      slidesPerView: 3,
    },
    350: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1: {
      slidesPerView: 1,
    }
  },
});

const navItems = document.querySelectorAll('.nav__items');
const imageText2 = document.querySelectorAll('.swiper__slide_image_text2');

const navAngleDown = document.querySelector('.nav__angleDown');
const headerMobileButton = document.querySelector('.header__mobile_button');
const headerMobileNav = document.querySelector('.header__mobile_nav');
const mobileNavBlock = document.querySelectorAll('.mobile__nav_block');
const mobileNavItems = document.querySelectorAll('.mobile__nav_items');

function swiperSort(event) {
  const eventTextContent = event.target.textContent;
  imageText2.forEach(imageText => {
    if(imageText.textContent === eventTextContent) {
      imageText.parentElement.parentElement.parentElement.style.display = 'flex';
      swiper.update();
    } else if(eventTextContent === 'Все страны') {
      imageText.parentElement.parentElement.parentElement.removeAttribute('style');
      swiper.update();
    } else {
      imageText.parentElement.parentElement.parentElement.style.display = 'none';
      swiper.update();
    }
  });
}

navItems.forEach(navItem => {
  navItem.addEventListener('click', (e) => {
    e.preventDefault();
    navItems.forEach(item => {
      item.classList.remove('active');
    });
    navItem.classList.add('active');
    swiper.update();

    swiperSort(e);
  });
});

headerMobileButton.addEventListener('click', () => {
  headerMobileNav.classList.toggle('navIsOpen');
  navAngleDown.classList.toggle('angleOpened');
});

mobileNavItems.forEach(navItem => {
  navItem.addEventListener('click', (e) => {
    e.preventDefault();
    mobileNavItems.forEach(item => {
      item.parentElement.classList.remove('mobileActive');
      item.parentElement.firstElementChild.classList.remove('mobile__item_checked');
    });
    navItem.parentElement.classList.add('mobileActive');
    navItem.parentElement.firstElementChild.classList.add('mobile__item_checked');
    swiper.update();

    swiperSort(e);
  })
});

const swiperSlide = document.querySelectorAll('.swiper-slide');
const swiperImage = document.querySelectorAll('.swiper__slide__images_image');
const swiperImageInfo = document.querySelectorAll('.swiper__slide__images_image_info');
const swiperLabels = [];

swiperSlide.forEach(slide => {
  const evenNumbers = slide.getAttribute('aria-label').slice(0, 2);
  if(evenNumbers % 2 == 0) {
    swiperLabels.push(evenNumbers);
  }
});

swiperSlide.forEach(slide => {
  if(innerWidth <= 480) {
    swiperLabels.map(label => {
      if(label === slide.getAttribute('aria-label').slice(0, 2)) {
        slide.lastElementChild.classList.add('swiper__slide__images_imageBottom');
        slide.lastElementChild.lastElementChild.classList.add('swiper__slide__images_image_infoBottom');
      }
    });
  }
});

swiperImage.forEach(image => {
  if(innerWidth <= 1000) {
    image.addEventListener('click', (e) => {
      swiperImage.forEach(img => {
        if(img.lastElementChild.style.display === 'flex') {
          img.lastElementChild.style.display = 'none';
        }
      });

      if(e.target === image.lastElementChild.firstElementChild) {
        image.lastElementChild.style.display = 'none';
      } else {
        image.lastElementChild.style.display = 'flex';
      }
    });
  }
});
