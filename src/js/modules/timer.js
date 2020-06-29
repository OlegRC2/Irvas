const timer = (id, deadLine) => {

    function getTimeRemaining(endTime) {                            // функция для расчета времени между временем пользователя и конечным временем таймера
        const t = Date.parse(endTime) - Date.parse(new Date()),     // переводим дату из формата строки в миллисекунды (Data.parse) и вычитаем текущую дату 
              days = Math.floor(t / (1000 * 60 * 60 * 24)),         // полученную разницу в миллисекундах делим на кол-во миллисекунд в 1 дне и получаем оставшиеся время в днях
              hours = Math.floor(t / (1000 * 60 * 60) % 24),        // % возвращает остаток от деления. В данной операции получаем кол-во дней, а остаток это кол-во часов
              minutes = Math.floor((t / 1000 / 60) % 60),           // % возвращает остаток от деления. В данной операции получаем кол-во часов, а остаток это кол-во минут
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };        
    }

    function getZero(num) {                                         // функция для добавления 0 если значение имеет 1 символ. Например часов осталось 9, функция сделает 09
        if (num >= 0 && num < 10) {                                 // если приходящее в функцию число больше либо равно 0 и меньше 10
            return `0${num}`;                                       // возвращаем число с 0 впереди
        } else {
            return num;                                             // если число 2-х значное возвращаем его обратно
        }

    }

    function setClock(selector, endTime) {                          // функция для установки рассчитанного времени на страницу
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),                // получили эти элементы со страницы
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);        // обновление таймера на странице каждую секунду

        updateClock();                                              // первый раз таймер запускается через секунду из-за timeInterval выше. Чтобы таймер запустился сразу вызываем эту функцию

        function updateClock() {                                    // расчет времени, который остался на текущий момент
            const t = getTimeRemaining(endTime);                    // получили рассчитанный объект со всеми значениями

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);                     // записываем на странцу полученные значения через getZero, чтобы было с 0 спереди
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {                                     // если время вышло останавливаем таймер
                clearInterval(timeInterval);                        // команда остановки setTime и setInterval
            }
        }
    }

    setClock(id, deadLine);
};

export default timer;