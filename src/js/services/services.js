const postData = async (url, data) => {                         // отправка самого запроса на сервер, передаем url сервера и data - данные, которые отправляем. async - мы говорим, что внутри функции будет асинхронный код
    const res = await fetch(url, {                              // делаем запрос к серверу при помощи fetch. await используется в паре с async и это значит, что пока fetch не вернет ответ далеше код не выполнится (ожидание по дефолту 30с)
        method: "POST",                                         // прописываем метод запроса
        headers: {
            'Content-type': 'application/json'                  // прописываем заголовок запроса
        },
        body: data                                              // то, что передаем
    });

    return await res.json();                                    // возвращаем ответ от сервера. await - ждем пока ответ преобразуется из json в обыный формат и только потом возвращаем
};

const getResource = async (url) => {                            // отправка самого запроса на сервер, передаем url сервера, async - мы говорим, что внутри функции будет асинхронный код
    const res = await fetch(url);                               // делаем запрос к серверу при помощи fetch. await используется в паре с async и это значит, что пока fetch не вернет ответ дальше код не выполнится (ожидание по дефолту 30с)
    if (!res.ok) {                                              // у fetch есть свойство .ok, если что то пошло не так, то там false
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);  // throw - это вывести в консоль, Error - это класс ошибки. .status - это код ошибки (404, 500 и т.д.)
    }

    return await res.json();                                    // возвращаем ответ от сервера. await - ждем пока ответ преобразуется из json в обыный формат и только потом возвращаем
};

export {postData};
export {getResource};