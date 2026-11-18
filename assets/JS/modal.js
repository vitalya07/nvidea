
document.addEventListener("DOMContentLoaded", () => {
    // Элементы модального окна
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal__content");
    const closeButton = document.querySelector(".modal__close");
    const openButtons = document.querySelectorAll(".btn");

    // Элементы формы
    const form = document.querySelector(".modal__form");
    const formContent = document.querySelector(".modal__form-content");
    const submitButton = document.querySelector(".modal__submit");

    const nameInput = form?.querySelector('[name="name"]');
    const emailInput = form?.querySelector('[name="email"]');
    const phoneInput = form?.querySelector('[name="phone"]');
    const policyInput = form?.querySelector('[name="policy"]');

    // Элементы результата
    const result = document.querySelector(".modal__result");
    const resultIcon = document.querySelector(".modal__result-icon");
    const resultTitle = document.querySelector(".modal__result-title");
    const resultText = document.querySelector(".modal__result-text");
    const resultButton = document.querySelector(".modal__result-btn");

    // Проверка наличия необходимых элементов
    if (
        !modal || !modalContent || !closeButton ||
        !form || !formContent || !submitButton ||
        !nameInput || !emailInput || !phoneInput || !policyInput ||
        !result || !resultIcon || !resultTitle || !resultText ||
        !resultButton
    ) {
        return;
    }

    let isSending = false;
    let isSubmitted = false;

    // Создание сообщения об ошибке
    const errorMessage = document.createElement("p");
    errorMessage.className = "modal__form-error";
    errorMessage.hidden = true;
    form.append(errorMessage);

    // Открытие модального окна
    function openModal() {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }

    // Закрытие модального окна
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }

    // Открытие по кнопкам .btn
    openButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.type === "submit") return;
            openModal();
        });
    });

    // Закрытие по крестику
    closeButton.addEventListener("click", closeModal);

    // Закрытие по кнопке результата
    resultButton.addEventListener("click", closeModal);

    // Закрытие по клику вне окна
    modal.addEventListener("click", (event) => {
        if (!modalContent.contains(event.target)) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeModal();
        }
    });

    // Показ сообщения об успешной отправке
    function showSuccess(message) {
        formContent.hidden = true;
        result.hidden = false;

        result.classList.remove("modal__result--error");
        result.classList.add("modal__result--success");

        resultIcon.textContent = "✓";
        resultTitle.textContent = "Заявка отправлена!";
        resultText.textContent =
            message || "Спасибо! Мы свяжемся с вами в ближайшее время.";

        isSubmitted = true;
    }

    // Отображение ошибки
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.hidden = false;
    }

    // Отправка формы
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Защита от повторной отправки
        if (isSending || isSubmitted) return;

        errorMessage.hidden = true;

        // Получение значений полей
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const policy = policyInput.checked;

        // Проверка имени
        if (name.length < 2) {
            showError("Введите корректное имя.");
            nameInput.focus();
            return;
        }

        // Проверка электронной почты
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("Введите корректный адрес электронной почты.");
            emailInput.focus();
            return;
        }

        // Проверка телефона
        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
            showError("Проверьте правильность номера телефона.");
            phoneInput.focus();
            return;
        }

        // Проверка согласия
        if (!policy) {
            showError("Необходимо согласиться с политикой обработки данных.");
            policyInput.focus();
            return;
        }

        // Начало отправки
        isSending = true;
        submitButton.disabled = true;
        submitButton.textContent = "Отправка...";

        try {
            const response = await fetch("mail.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    policy: policy
                })
            });

            // Получение ответа сервера
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Не удалось отправить заявку."
                );
            }

            // Успешная отправка
            showSuccess(data.message);

        } catch (error) {
            console.error("Ошибка отправки:", error);

            showError(
                error.message || "Произошла ошибка. Попробуйте ещё раз."
            );

        } finally {
            isSending = false;

            // Возвращаем кнопку, если отправка не удалась
            if (!isSubmitted) {
                submitButton.disabled = false;
                submitButton.textContent = "Отправить заявку";
            }
        }
    });
});
