function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass, idClassTabs) {

    const tabs = document.querySelectorAll(tabsSelector),               // получаем кнопки-табы
          tabsContent = document.querySelectorAll(tabsContentSelector), // получаем контент в самих табах
          tabsParent = document.querySelector(tabsParentSelector);      // получаем родителя, в котором ссылки на табы

    function hideTabContent() {                                         // функция скрывания всех табов
        tabsContent.forEach(item => {
            item.style.display = 'none';                                // скрываем таб
        });

        tabs.forEach(item => {                                          // убираем класс активности со всех кнопок-табов
            if (idClassTabs == '.calc_tabs_block') {                    // для табов на калькуляторе
                item.classList.remove(activeClass);
            } else {
                item.lastElementChild.classList.remove(activeClass);    // класс активности ставится на ссылку в блоке-табе (для двух других табов)
            }
            
        });
    }

    function showTabContent(i = 0) {                                    // функция показа одного элемента. Задаем i=0 по дефолту, чтобы сначала был активен первый таб
        tabsContent[i].style.display = 'block';                         // показываем таб
        tabsContent[i].classList.add('animated', 'fadeIn', 'slow');     // добавляем анимацию
        if (idClassTabs == '.calc_tabs_block') {                        // для табов на калькуляторе
            tabs[i].classList.add(activeClass);                         // добавляем класс активности по нажатию на элементы таба (для табов на калькуляторе)
        } else {
            tabs[i].lastElementChild.classList.add(activeClass);        // добавляем класс активности ссылке по нажатию на элементы таба (для двух других табов)
        }
        
    }

    hideTabContent();                                                   // скрыли все табы
    showTabContent();                                                   // показали дефолтное значение

    tabsParent.addEventListener('click', (event) => {                   // вешаем обработчик клика
        const target = event.target;                                    // элемент в который кликнули

        if (target && target.classList.contains(idClassTabs.slice(1))) { // смотрим что кликнули в нужный элемент по ТЗ, т.к. класс с точкой, то нужно ее вырезать
            tabs.forEach((item, i) => {                                 // перебираем все табы 
    
                if (idClassTabs == '.second_tabs_block') {              // необходимо понять на каком блоке табов выполняется действия, если на втором, то
                    if (target.parentElement.parentElement == item) {   // если родитель родителя кликнутого элемента, совпадает с перебираемым
                        hideTabContent();                               // скрываем все табы и
                        showTabContent(i);                              // показываем тот, который сейчас в переборе
                    }
                } else {                                                // если действия выполняются на 1 блоке табов или калькуляторе, то
                    if (target.parentElement == item) {                 // если родитель кликнутого элемента, совпадает с перебираемым
                        hideTabContent();                               // скрываем все табы и
                        showTabContent(i);                              // показываем тот, который сейчас в переборе
                    }
                }
            });
        }
    });
}

export default tabs;