import {postData} from '../services/services';                  // импортируем функции, которые используются в этом коде

function forms(formSelector) {                                  // сюда передаем селектор формы

    const forms = document.querySelectorAll(formSelector);      // получаем все формы со страницы

    forms.forEach(item => {
        bindPostData(item);                                     // на всех формах выполняем эту функцию
    });

    function bindPostData(form) {
        if (form.dataset.form != 'calc') {                      // дальнейший код не будет выполняться на форме калькулятора, т.к. там отличаются отправляемые данные
            form.addEventListener('submit', (e) => {            // навешиваем обработчик события на форму, срабатывает при отправке
                e.preventDefault();                             // отменяем действия браузера по умолчанию, чтобы не перезагружалась страница
                addMessageAndData(form);                        // выполняем функцию показывающую статус и отправляющую на сервер данные 
            });
        }
    }
}

function addMessageAndData(form, calcData = false) {            // функция показывающая статус и отправляющая на сервер данные, по дефолту данные с калькулятора отключены, но их можно передать, когда данные будут получены 
    const message = {                                           // объект для обратной связи пользователю
        loadingSpinner: 'assets/img/spinner/Spinner-1s-51px.svg',
        loadingText: 'Отправка Ваших данных',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const statusMessageSpnr = document.createElement('img'),    // создаем новый элемент на странице для показа его пользователю в котором будет спиннер
          statusMessageText = document.createElement('div');    // создаем новый элемент на странице для показа его пользователю в котором будет div с текстом
          statusMessageSpnr.src = message.loadingSpinner;       // добавляем новому элементу атрибут src
          statusMessageSpnr.style.cssText = `
            display: block;
            margin: 0 auto;
          `;                                                    // добавили стили картинке, чтобы встала по центру
    statusMessageText.textContent = message.loadingText;        // добавили в новый div сообщение с текстом
    form.append(statusMessageSpnr);                             // добавляем сообщение на страницу после формы
    form.append(statusMessageText);                             // добавляем сообщение на страницу после формы
    
    const formData = new FormData(form);                        // создаем переменную по классу FormData. Этот класс собирает данные, которые отправить надо. У инпутов в формах должен быть обязательно быть атрибут "name", без него работать не будет

    if (calcData && Object.entries(calcData).length != 0) {     // если данные с калькулятора переданы и этот объект с данными не пустой, то
        for (let key in calcData) {                             // перебираем по ключам объект
            formData.append(key, calcData[key]);                // добавляем каждую запись к уже сформированной formData с личными данными пользователя
        }
        calcData = {};                                          // после записи в formData очищаем объект данных калькулятора
    }

    const json = JSON.stringify(Object.fromEntries(formData.entries())); // сначала преобразуем formData в массив с массивами (entries), затем превращаем в обычный объект (fromEntries), а потом превращаем этот объект в JSON (JSON.stringify)

    postData('http://localhost:3000/requests', json)            // отправляем данные на сервер
    .then(data => {                                             // получаем ответ с сервера, data - это данные с сервера
        statusMessageSpnr.remove();                             // удаляем спиннер
        statusMessageText.remove();                             // удаляем текстовое сообщение об отправке
        showThanksModal(message.success);                       // вызываем функцию, которая выводит сообщение что все успешно
        console.log(data);                                      // выводим в консоль, то что отправили
    })
    .catch(data => {  
        console.log(data);                                      // при какой-то ошибке пишем что будет происходить
        statusMessageSpnr.remove();                             // удаляем спиннер
        statusMessageText.remove();                             // удаляем текстовое сообщение об отправке
        showThanksModal(message.failure);                       // сообщение пользователю об ошибке
    })
    .finally(() => {                                            // блок в котором выполняются действия независимо от того что было выполнено, then или catch
        form.reset();                                           // сбросить данные в форме
    });

    function showThanksModal(message) {                         // функция для создания сообщения полсе отправки формы
        const thanksModal = document.createElement('div');      // создаем элемент
              
        thanksModal.style.cssText = `
                font-family: 'Open Sans', sans-serif;
                font-size: 2rem;
                font-weight: 700;
                font-style: normal;
                color: #333333;
            `;                                                  // задаем стили будущего сообщения
        thanksModal.textContent = message;                      // добавляем сообщение в div
        form.append(thanksModal);                               // добавляем этот div в форму
       
        setTimeout(() => {
            thanksModal.remove();                               // удаляем этот созданный элемент через 4 секунды
        }, 4000);        
    }
}

export {forms};
export {addMessageAndData};