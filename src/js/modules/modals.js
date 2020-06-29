function modals(modalSelector, modalBtn, time = 60000, timerModal) {
    let modalTimerId;
    
    if (modalSelector == timerModal) {                                 // если передан класс .popup, то открываем это окно через нужное время           
        modalTimerId = setTimeout(() => openModal(modalSelector), time); // открытие модального окна через определенное время
    }

    function openModal(modalSelector) {                             // функция для открытия модального окна

        if (document.body.style.overflow != 'hidden') {             // если в данный момент окно открыто, то (не открывать еще окно)
            const modal = document.querySelector(modalSelector);    // берем модальное окно

            modal.style.display = 'block';                          // делаем окно видимым
            modal.classList.add('animated', 'fadeIn');
            document.body.style.overflow = 'hidden';                // запрет прокрутки страницы во время того как открыто модальное окно
        }    
    }    

    function closeModal(modalSelector) {                             // функция для закрытия модального окна
        const modal = document.querySelector(modalSelector);         // берем модальное окно

        modal.classList.remove('fadeIn');
        modal.style.display = 'none';                                // скрываем окно
        document.body.style.overflow = '';                           // установка дефолтного значения на параметр прокрутки страницы
    } 
    
    const modalButton = document.querySelectorAll(modalBtn),         // берем все кнопки вызова окна по классу
          modal = document.querySelector(modalSelector),             // берем само модальное окно
          closeButton = document.querySelectorAll('[data-close]');   // берем все кнопки закрытия по дата атрибуту

    modalButton.forEach(btn => {                                     // т.к. получаем псевдомассив, то надо его перебрать и навесить обработчик на каждую кнопку открытия окна
        btn.addEventListener('click', (e) => {
            openModal(modalSelector);                                // запускаем функцию открытия
            e.preventDefault();                                      // отменяем стандартное поведение браузера, чтобы на ссылке не срабатывала заглушка
            if (modalSelector == timerModal && e.target && e.target.classList.contains(modalBtn.slice(1))) { // если в окно, которое должно открываться через n время уже тыкали, то
                clearInterval(modalTimerId);                         // убираем открытие через заданное время
            }
        });
    });

    closeButton.forEach(btn => {                                     // т.к. получаем псевдомассив, то надо его перебрать и навесить обработчик на каждую кнопку закрытия окна
        btn.addEventListener('click', () => closeModal(modalSelector));
    });

    modal.addEventListener('click', (event) => {                     // закрытие окна при клике вне окна
        if (event.target === modal) {                                // если место клика входит в родительский элемент окна, но не само окно (у него другой класс)
            closeModal(modalSelector);
        }
    });
}

export default modals;