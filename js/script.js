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

  // timer

  const deadline = '2022-09-07';

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

  const modalOpen = document.querySelectorAll('[data-modal]');
  const modalClose = document.querySelector('[data-close]');
  const modal = document.querySelector('.modal');

  function closeModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
  }

  function openModal() {    
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  
  modalOpen.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    })
  })


  modalClose.addEventListener('click', closeModal)

  modal.addEventListener('click', e => {
    if (e.target == modal) {
      closeModal();
    }
  })

  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 10000);

  window.addEventListener('scroll', showModalByScroll)

})