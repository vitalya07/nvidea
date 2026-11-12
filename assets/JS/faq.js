// const faqItems = document.querySelectorAll('.faq__list-item');

// faqItems.forEach(item => {
//     const top = item.querySelector('.faq__list-item--top');
//     const bottom = item.querySelector('.faq__list-item--bottom');

//     top.addEventListener('click', () => {
//         const isOpen = item.classList.contains('open');

//         // Закрываем остальные вкладки
//         faqItems.forEach(faqItem => {
//             faqItem.classList.remove('open');

//             const answer = faqItem.querySelector('.faq__list-item--bottom');
//             answer.style.maxHeight = null;
//         });

//         // Если вкладка была закрыта — открываем её
//         if (!isOpen) {
//             item.classList.add('open');
//             bottom.style.maxHeight = bottom.scrollHeight + 'px';
//         }
//     });
// });
const faqItems = document.querySelectorAll('.faq__list-item');

faqItems.forEach(item => {
    const top = item.querySelector('.faq__list-item--top');
    const bottom = item.querySelector('.faq__list-item--bottom');

    top.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(faqItem => {
            faqItem.classList.remove('open');

            const answer = faqItem.querySelector('.faq__list-item--bottom');
            answer.style.maxHeight = '0px';
        });

        if (!isOpen) {
            item.classList.add('open');
            bottom.style.maxHeight = bottom.scrollHeight + 'px';
        }
    });
});