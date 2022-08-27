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




})