function gallary(gallaryWindowSelector, previewSelector) {

    const gallaryWindow = document.querySelector(gallaryWindowSelector),        // получаем главный родительский элемент блока с галереей
          preview = document.querySelectorAll(previewSelector);                 // получаем все превью всех изображений
          
    function openImg(src, alt) {                                                // функция открытия картинки   

        const parentElement = document.createElement('div'),                    // создаем элемент div
              imgElement = document.createElement('img'),                       // создаем элемент img
              animationElement = document.createElement('div');                 // создаем элемент div, для анимации

        parentElement.classList.add('new-div-with-img');                        // задали класс новому элементу

        imgElement.src = src;                                                   // назначаем нужный адрес изображения
        imgElement.alt = alt;                                                   // назначаем нужный альт

        parentElement.style.cssText = `
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9;
            background-color: rgba(0, 0, 0, 0.8);
        `;                                                                      // задали стили для темной подложки

        animationElement.style.cssText = `
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        `;                                                                      // задали стили для пустого элемента

        imgElement.style.cssText = `
            display: block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100vh;
        `;                                                                      // задали стили для картинки

        parentElement.append(animationElement);                                 // добавили элемент для анимации в div с подложкой
        animationElement.append(imgElement);                                    // добавили картинку в элемент для анимации
        gallaryWindow.append(parentElement);                                    // добавили в html созданный елемент 
        parentElement.classList.add('animated', 'fadeIn', 'faster');            // добавляем анимацию подложке
        animationElement.classList.add('animated', 'zoomIn', 'animateGallary'); // добавляем анимацию из библиотеки animate.css
        document.body.style.overflow = 'hidden';                                // запрет прокрутки страницы во время того как открыто изображение
    }

    function closeImg() {                                                       // функция закрытия изображения
        const newDiv =  gallaryWindow.lastElementChild,                         // берем весь созданный блок элементов
              animationElement = document.querySelector('.animateGallary'),     // отдельно берем элемент для анимации
              parentElement = document.querySelector('.new-div-with-img');      // берем подложку (для анимации)

        animationElement.classList.remove('zoomIn');                            // удаляем анимацию открытия
        parentElement.classList.remove('fadeIn');                               // удаляем анимацию открытия

        animationElement.classList.add('zoomOut');                              // добавляем анимацию закрытия
        parentElement.classList.add('fadeOut');                                 // добавляем анимацию закрытия
        setTimeout(() => newDiv.remove(), 900);                                 // удаляем созданный блок через 900 мс после анимации
        document.body.style.overflow = '';                                      // установка дефолтного значения на параметр прокрутки страницы
        
    }

    preview.forEach(item => {                                                   // навешиваем обработчик клика на все превью
        item.addEventListener('click', (event) => {
            event.preventDefault();                                             // отменяем стандартное поведение браузера
            const target = event.target;                                        // элемент в который кликнули
            if (target == item) {                                               // если кликнутый элемент равен перебираемому
                const src = item.parentElement.href,                            // вытаскиваем из него путь к изображению
                      alt = item.alt;                                           // и альт
                openImg(src, alt);                                              // открываем это изображение

                const newDiv = document.querySelector('.animateGallary');       // берем созданный элемент для анимации
                newDiv.addEventListener('click', (event) => {                   // вешаем обработчик клика
                    if (event.target == newDiv) {                               // если кликнули на этот элемент
                        closeImg();                                             // закрываем изображение
                    }
                });
            }
        });
    });
}

export default gallary;