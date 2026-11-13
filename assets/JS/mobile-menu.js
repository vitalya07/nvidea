
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.header__nav a');

if (header && hamburger) {
    // Открытие и закрытие меню
    hamburger.addEventListener('click', () => {
        header.classList.toggle('menu-open');
    });

    // Закрытие меню при выборе пункта навигации
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('menu-open');
        });
    });

    // Закрытие меню клавишей Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            header.classList.remove('menu-open');
        }
    });

    // Закрытие меню при переходе на десктопный размер
    window.addEventListener('resize', () => {
        if (window.innerWidth > 993) {
            header.classList.remove('menu-open');
        }
    });
}
