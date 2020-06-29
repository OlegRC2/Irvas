import {addMessageAndData} from './forms';                              // подключаем функцию для отправки данных на сервер и вывод статуса отправки пользователю

function calc() {                                                       // функция для калькулятора
    const firstModal = document.querySelector('.popup_calc'),           // берем первое модальное окно
          secondModal = document.querySelector('.popup_calc_profile'),  // берем второе модальное окно
          thirdModal = document.querySelector('.popup_calc_end'),       // берем третье модальное окно
          closeButton = document.querySelectorAll('[data-close]'),      // берем все кнопки закрытия по дата атрибуту
          calcForm = document.querySelector('[data-form]');             // берем последнее окно с формой в калькуляторе
    let dataCalc = {};                                                  // создаем пустой объект, в нем будет вся итоговая инфа

    function openModal(modalSelector) {                                 // функция для открытия модального окна
        modalSelector.style.display = 'block';                          // делаем окно видимым
        document.body.style.overflow = 'hidden';                        // запрет прокрутки страницы во время того как открыто модальное окно
    }    

    function closeModal(modalSelector) {                                // функция для закрытия модального окна
        modalSelector.style.display = 'none';                           // скрываем окно
        document.body.style.overflow = '';                              // установка дефолтного значения на параметр прокрутки страницы
    } 

    function closeBtn(modalSelector) {                                  // функция закрытия окна при клике на кнопку или подложку
        modalSelector.addEventListener('click', (event) => {            // закрытие окна при клике вне окна
            if (event.target === modalSelector) {                       // если место клика входит в родительский элемент окна, но не само окно (у него другой класс)
                closeModal(modalSelector);
            }
        });
        closeButton.forEach(btn => {                                    // т.к. получаем псевдомассив, то надо его перебрать и навесить обработчик на каждую кнопку закрытия окна
            btn.addEventListener('click', () => closeModal(modalSelector));
        });
    }

    function message(modalSelector, messageText) {                      // функция вывода сообщения при неправильных действиях пользователя
        const message = document.createElement('div'),                  // создаем элемент
              modal = document.querySelector(modalSelector);            // берем нужный div с контентом калькулятора, в него добавим сообщение
        message.style.cssText = `
            font-family: 'Open Sans', sans-serif;
            font-size: 1.7rem;
            font-weight: 700;
            font-style: normal;
            color: #333333;
            margin-top: 15px;
        `;                                                              // задаем стили будущего сообщения
        message.textContent = messageText;                              // добавляем сообщение в div
        modal.append(message);                                          // добавляем этот div в форму

        setTimeout(() => {
            message.remove();                                           // удаляем этот созданный элемент через 4 секунды
        }, 4000);
    }

    function typeWindow() {                                             // функция работы первого окна калькулятора

        const tabsWindow = document.querySelectorAll('.balcon_icons_img'),       // берем блок с табами
            width = document.getElementById('width'),                            // берем инпут с шириной
            height = document.getElementById('height'),                          // берем инпут с высотой
            button1Window = document.querySelector('.popup_calc_button');        // берем кнопку "Далее"
            
        button1Window.addEventListener('click', () =>{                  // навешиваем обработчик клика на кнопку
            if (width.value && height.value) {                          // если поля ширина и высота заполнены, то
                tabsWindow.forEach((item, i) =>{                        // перебираем все табы
                    if (item.classList.contains('do_image_more')) {     // если у таба присутствует класс активности, то
                        dataCalc.typeWindow = i + 1;                    // записываем его в итоговый объект как номер выбранного окна
                    }
                });

                dataCalc.widthWindow = width.value;                     // записываем в объект введенную ширину окна
                dataCalc.heightWindow = height.value;                   // записываем в объект введенную высоту окна

                closeModal(firstModal);                                 // закрываем это окно
                openModal(secondModal);                                 // открываем следующее окно
                closeBtn(secondModal);                                  // добавляем возможность закрытия окна
                width.value = '';                                       // сбрасываем значение ширины в окне
                height.value = '';                                      // сбрасываем значение высоты в окне

            } else {
                const messageText = 'Необходимо запонить ширину и высоту';  // пишем текст сообщения
                message('.popup_calc_content', messageText);            // добавляем сообщение в модальное окно 
            }
        });
    }

    typeWindow();

    function typeGlassWindow() {
        const button2Window = document.querySelector('.popup_calc_profile_button'); // берем кнопку "Далее"
            
        button2Window.addEventListener('click', () =>{                  // навешиваем обработчик клика на кнопку
            const selectForm = document.getElementById('view_type'),    // берем форму с выбором остекления
                  check = document.getElementsByName('checkbox-test'),  // берем оба чекбокса
                  selectId = selectForm.options.selectedIndex;          // получаем индекс выбранного остекления

            if (check[0].checked && check[1].checked) {                 // если выбраны сразу 2 чекбокса, то
                const messageText = 'Необходимо выбрать только 1 тип профиля, либо холодное, либо теплое';  // сообщение пользователю
                message('.popup_calc_profile_content', messageText);    // выводим это сообщение в модальном окне
            } else if (!check[0].checked && !check[1].checked) {        // если не выбран ни один чекбокс
                const messageText = 'Необходимо выбрать тип профиля';   // сообщение пользователю
                message('.popup_calc_profile_content', messageText);    // выводим это сообщение в модальном окне
            } else {                                                    // если форма заполнена правильно, т.е. выбран профиль и стоит 1 чекбокс
                dataCalc.typeGlass = selectForm.options[selectId].text; // добавляем в итоговый объект выбранное остекление
                if (check[0].checked) {                                 // если отмечен первый чекбокс, то
                    dataCalc.profile = 'cold';
                } else {                                                // если отмечен второй чекбокс, то
                    dataCalc.profile = 'warm';
                }

                closeModal(secondModal);                                // закрываем это окно
                openModal(thirdModal);                                  // открываем следующее окно
                closeBtn(thirdModal);                                   // добавляем возможность закрытия окна
                check[0].checked = false;                               // сбрасываем значение чекбокса
                check[1].checked = false;                               // сбрасываем значение чекбокса
            }
        });
    }
    
    typeGlassWindow();

    calcForm.addEventListener('submit', (e) => {                        // навешиваем обработчик события на форму калькулятора, срабатывает при отправке
        e.preventDefault();                                             // отменяем действия браузера по умолчанию, чтобы не перезагружалась страница
        addMessageAndData(calcForm, dataCalc);                          // вызываем функцию отправки данных на сервер и вывод статуса отправки пользователю                                               
    });
}

export default calc;