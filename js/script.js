import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);

  tabs('.tabcontainer', '.tabcontent', '.tabheader', '.tabheader__item', 'tabheader__item_active');
  modal('[data-modal]', '.modal',modalTimerId);
  timer('.timer', '2022-10-01');
  cards();
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    field: '.offer__slider-inner',
    wrapper: '.offer__slider-wrapper'
  });
  calc();
  forms(modalTimerId);
});