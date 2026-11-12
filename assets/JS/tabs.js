const commandTabs = document.querySelectorAll('.comands__tabs-tab');
const commandImages = document.querySelectorAll('.comands__content-img');

commandTabs.forEach((tab, index) => {

    tab.addEventListener('click', () => {

        // Убираем active у всех табов
        commandTabs.forEach(item => {
            item.classList.remove('active');
        });

        // Убираем active у всех изображений
        commandImages.forEach(image => {
            image.classList.remove('active');
        });

        // Активируем выбранный таб
        tab.classList.add('active');

        // Показываем соответствующее изображение
        commandImages[index].classList.add('active');

    });

});