'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const tabContainer = document.querySelector('.tabcontainer');
  const tabsContent = tabContainer.querySelectorAll('.tabcontent');
  const tabHeadersBox = tabContainer.querySelector('.tabheader');
  const tabHeaders = tabContainer.querySelectorAll('.tabheader__item');


  const hide = function () {
    tabsContent.forEach(tab => {
      tab.classList.add('hide');
      tab.classList.remove('show', 'fade');
    });
    tabHeaders.forEach(tab => {
      tab.classList.remove('tabheader__item_active');
    })
  }

  const show = function (i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabHeaders[i].classList.add('tabheader__item_active');
  }

  tabHeadersBox.addEventListener('click', e => {
    if (e.target && e.target.matches('.tabheader__item')) {
      tabHeaders.forEach((el, i) => {
        if (e.target == el) {
          hide();
          show(i);
        }
      })
    }
  })


  hide();
  show();
  // const hide = function () {
  //   tabsContent.forEach(tab => {
  //     tab.classList.add('hide');
  //     tab.classList.remove('show', 'fade');
  //   });
  //   tabHeaders.forEach(tab => {
  //     tab.classList.remove('tabheader__item_active');
  //   })
  // }

  // const show = function (i = 0) {
  //   tabsContent[i].classList.add('show', 'fade');
  //   tabHeaders[i].classList.add('tabheader__item_active');
  // }

  // tabHeadersBox.addEventListener('click', e => {
  //   if (e.target && e.target.matches('.tabheader__item')) {
  //     tabHeaders.forEach((el, i) => {
  //       if (e.target == el) {
  //         hide();
  //         show(i);
  //       }
  //     })
  //   }
  // })


  // hide();
  // show();

  // timer

  const deadline = '2022-10-01';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((t / (1000 * 60)) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();


    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }

  }

  setClock('.timer', deadline)

  // modal

  const modalTrigger = document.querySelectorAll('[data-modal]');
  const modal = document.querySelector('.modal');
  // const modalCloseBtn = document.querySelector('[data-close]');


  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  })


  // modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target == modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  })

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  window.addEventListener('scroll', showModalByScroll)


  // classes


  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.currency = 50;
      this.changeToRUB();
    }

    changeToRUB() {
      this.price = this.price * this.currency;
    }

    render() {
      const div = document.createElement('div');

      if (this.classes.length === 0) {
        this.class = 'menu__item';
        div.classList.add(this.class);
      } else {
        this.classes.forEach(className => div.classList.add(className));
      }

      div.innerHTML = `
      <img src=${this.src} alt="${this.alt}">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>
    `;
      this.parent.append(div);
    }
  }

  // const getResource = async (url) => {
  //   const result = await fetch(url);

  //   if (!result.ok) {
  //     throw new Error(`couldnt fetch ${url}, stats: ${result.status}`);
  //   }

  //   return await result.json();
  // };

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // forms json
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'thank you! we will contact you soon',
    failure: 'something went wrong'
  };

  forms.forEach(form => {
    bindPostData(form);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await result.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        })

    });

  }

  // add style

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    prevModalDialog.classList.remove('show');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>&times;</div>
      <div class="modal__title">${message}</div>
    </div>
  `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  // slider
  const slidesWrapper = document.querySelector('.offer__slider-wrapper');
  const slides = slidesWrapper.querySelectorAll('.offer__slide');
  const slider = document.querySelector('.offer__slider');
  const prev = document.querySelector('.offer__slider-prev');
  const next = document.querySelector('.offer__slider-next');
  const current = document.querySelector('#current');
  const total = document.querySelector('#total');
  const slidesField = slidesWrapper.querySelector('.offer__slider-inner');
  const width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;

  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  // slider navigation
  
  function changeDotOpacity() {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  function changeSliderCounter() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function getNumber(str) {
    return +str.replace(/\D/g, '');
  }

  slider.style.position = 'relative';

  const indicators = document.createElement('ol');
  const dots = [];

  
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `    
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff; 
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset == getNumber(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += getNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    changeSliderCounter();

    changeDotOpacity()
  });

  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = getNumber(width) * (slides.length - 1);

    } else {
      offset -= getNumber(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    changeSliderCounter();

    changeDotOpacity();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = getNumber(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      changeSliderCounter();

      changeDotOpacity();
    });
  });


  
  


  

});