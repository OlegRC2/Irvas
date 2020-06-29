import './slider';
import modals from './modules/modals';                           // подключаем файл с модальным окном
import tabs from './modules/tabs';                               // подключаем файл с табами
import gallary from './modules/gallary';                         // подключаем файл с галереей
import timer from './modules/timer';                             // подключаем файл с таймером
import {forms} from './modules/forms';                           // подключаем файл с формами
import calc from './modules/calc';                               // подключаем файл с калькулятором




window.addEventListener('DOMContentLoaded', () => {              // ждем пока загрузится весь документ 
  
    modals('.popup_engineer', '.popup_engineer_btn');            // функция модального окна для кнопки "вызвать замерщика"
    modals('.popup', '.phone_link', 60000, '.popup');            // функция модального окна для двух других кнопок на странице, 3-й аргумент время через которое будет открываться окно в 4-м аргументе. Эти 2 аргумента могут не передаваться
    modals('.popup_calc', '.popup_calc_btn');                    // функция модального окна с калькулятором

    tabs('.glazing_block', '.glazing_content', '.glazing_slider', 'active', '.first_tabs_block');   // табы для первого блока с табами
    tabs('.decoration_item', '.decoration_content_item', '.decoration_slider', 'after_click', '.second_tabs_block');   // табы для второго блока с табами
    tabs('.balcon_icons_img', '[data-modal-calc-content]', '.balcon_icons', 'do_image_more', '.calc_tabs_block');   // табы для третьего блока с калькулятором

    gallary('.works', '.preview');                               // функция для работы галереи на сайте

    timer('.container1', '2020-08-01');                          // функция для таймера на странице

    calc();

    forms('.form');                                              // функция для отправки форм


    













});