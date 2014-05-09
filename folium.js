/**
 * Folium - простой слайдер изображений
 * User: Bizikov
 * Version: 0.1
 */


(function () {
    var folium = findElement('#folium');
    var numberOfImages = 0;
    var images = 0;
    var currentImages = 0;

    /*
     *  Поиск элемента
     */
    function findElement(name) {
        var attr = name[0] === '.' ? 'class' : 'id';
        var elementName = name.substr(1);
        var foundElement = [];
        switch (attr) {
            case 'class':
                if (document.getElementsByClassName) {
                    foundElement = document.getElementsByClassName(elementName);
                    return foundElement.length ? foundElement : null;
                } else {
                    return null;
                }
                break;
            case 'id':
            default:
                if (document.getElementById) {
                    foundElement = document.getElementById(elementName);
                    return foundElement ? foundElement : null;
                } else {
                    return null;
                }
        }
    }

    /*
     *  Создает указанный элемент, при необходимости задает ему атрибут с именем.
     */
    function createElement(element, name) {
        var unit = document.createElement(element);
        var attr = name[0] === '.' ? 'class' : 'id';
        unit.setAttribute(attr, name.substr(1));
        return unit;
    }

    /*
     *   Изменяем описание к изображению
     */
    function changeСaption(image) {
        var alt = image.getAttribute('alt');
        var figcaption = findElement('.folium--caption');
        if (figcaption) {
            figcaption[0].textContent = alt;
        } else {
            figcaption = createElement('figcaption', '.folium--caption');
            figcaption.textContent = alt;
            folium.appendChild(figcaption);
        }

    }

    /*
     *  Работаем с изображениями
     */
    function findOnlyImages(array) {
        var images = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i].tagName.toLowerCase() === 'img') {
                images.push(array[i]);
            }
        }
        return images;
    }

    // Собираем фотографии
    images = findOnlyImages(folium.children);
    // Прячем все изображения, кроме первого
    for (var i = 1; i < images.length; i++) {
        images[i].style.display = 'none';
    }
    // Добавляем описание к фотографии, если оно есть
    changeСaption(images[0]);
    // Добавляем навигацию
    var foliumNavigation = createElement('ul', '.folium--navigation');
    var foliumNavigationItem;

    for (var k = 0; k < images.length; k++) {
        foliumNavigationItem = createElement('li', '.folium--navigation--item');
        foliumNavigationItem.setAttribute('data-count', k.toString());
        foliumNavigation.appendChild(foliumNavigationItem);
    }
    foliumNavigation.children[currentImages].setAttribute('class', 'folium--navigation--item__current'); // Выделяем сразу первый по умолчанию
    folium.insertBefore(foliumNavigation, folium.firstChild);


    /*
     Обработка кликов по элементам навигации
     */
    foliumNavigation.addEventListener('click', function (e) {
        var element = e.target;
        var selectedId = element.getAttribute('data-count');
        if (selectedId) {
            foliumNavigation.children[currentImages].setAttribute('class', 'folium--navigation--item');
            element.setAttribute('class', 'folium--navigation--item__current');
            images[currentImages].style.display = 'none';
            images[selectedId].style.display = 'block';
            changeСaption(images[selectedId]);
            currentImages = selectedId;
        }
    }, false);
})();
