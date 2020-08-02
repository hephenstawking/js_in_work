'use strict';
import timer from './modules/timer';
import tabs from './modules/tabs';
import modal from './modules/modal';
import slider from './modules/slider';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calc';
import {openModal} from './modules/modal';
window.addEventListener('DOMContentLoaded', () => {
    const modalTImerId = setTimeout(() => openModal('.modal', modalTImerId), 50000);

    cards();
    calc();
    timer('.timer', '2020-08-11');
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTImerId);
    forms('form', modalTImerId);
    slider({
      container: '.offer__slider',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      slide: '.offer__slide',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
    });
});