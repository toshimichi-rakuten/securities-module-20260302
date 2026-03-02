// swiper
var heroSwiper = new Swiper ('.s3-member-banner__inner', {
    loop: true,
    loopedSlides: 3,
    speed: 500,
    width: 732,
    centeredSlides : true,
    autoplay: {
      delay: 4000,
      stopOnLast: false,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });
  var visitorCarousel = new Swiper ('.s3-hero__inner .swiper-container', {
    loop: true,
    speed: 500,
    centeredSlides : true,
    autoplay: {
      delay: 12000,
      stopOnLast: false,
      disableOnInteraction: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  });

  $('.s3-hero__inner .swiper-container').on('mouseover', function() {
    visitorCarousel.autoplay.stop();
  });
  $('.s3-hero__inner .swiper-container').on('mouseout', function() {
    visitorCarousel.autoplay.start();
  });

  var groupSwiper = new Swiper ('.s3-rakuten-g-banner__inner', {
    loop: true,
    slidesPerView: 5,
    loopedSlides: 5,
    speed: 500,
    width: 1048,
    spaceBetween: 32,
    centeredSlides : true,
    freeMode: true,
    autoplay: {
      delay: 4000,
      stopOnLast: false,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  })
