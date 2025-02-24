document.addEventListener('DOMContentLoaded', function() {
    const deliveryModalWrapper = document.querySelector('.delivery-modal-wrapper');
    const deliveryModal = document.querySelector('.delivery-modal');
    const pickupInput = document.getElementById('pickup');
    const deliveryInput = document.getElementById('delivery');
    const deliveryAddressBlock = document.querySelector('.delivery-modal__address');
    const form = deliveryModal.querySelector('form'); 
    const buttonDelivery = document.querySelector('.basket-modal__open-delivery-btn');

    // Функция для закрытия модального окна
    const closeDelivery = event => {
        const target = event.target;

        if (target === deliveryModalWrapper ||        
            target.closest('.delivery-modal__close-btn') ||
            event.code === 'Escape') {
            deliveryModalWrapper.style.opacity = 0;  

            setTimeout(() => {
                deliveryModalWrapper.style.visibility = 'hidden'; 
            }, 250);

            window.removeEventListener('keydown', closeDelivery);
        }
    }

    // Функция для открытия модального окна
    const openDelivery = () => {
        deliveryModalWrapper.style.visibility = 'visible';
        deliveryModalWrapper.style.opacity = 1;
        window.addEventListener('keydown', closeDelivery)
    };

    buttonDelivery.addEventListener('click', openDelivery);
    deliveryModalWrapper.addEventListener('click', closeDelivery);

    // Функция для переключения видимости блока адреса доставки
    function toggleDeliveryAddressVisibility() {
        if (deliveryInput.checked) {
            deliveryAddressBlock.style.display = 'block';
        } else {
            deliveryAddressBlock.style.display = 'none';
        }
    }

    // Инициализация видимости при загрузке страницы
    toggleDeliveryAddressVisibility();

    // Обработчики событий для переключения видимости при изменении выбора
    pickupInput.addEventListener('change', toggleDeliveryAddressVisibility);
    deliveryInput.addEventListener('change', toggleDeliveryAddressVisibility);

    // Обработчик отправки формы
    deliveryModal.querySelector('.delivery-modal__submit-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        // Сбор данных формы
        const formData = {
            name: deliveryModal.querySelector('.delivery-modal__input-name').value,
            phone: deliveryModal.querySelector('.delivery-modal__input-tel').value,
            deliveryType: deliveryModal.querySelector('input[name="delivery"]:checked').value,
            address: deliveryInput.checked ? {
                street: deliveryModal.querySelector('.delivery-modal__input-address[placeholder="Вулиця"]').value,
                house: deliveryModal.querySelector('.delivery-modal__input-address-num[placeholder="№ Будинку"]').value,
                apartment: deliveryModal.querySelector('.delivery-modal__input-address-num[placeholder="Квартира"]').value
            } : null
        };

        // Здесь можно добавить код для отправки данных на сервер
        console.log(formData); // Для демонстрации выводим данные в консоль

        // Очистка формы после отправки
        deliveryModal.querySelector('form').reset();
        toggleDeliveryAddressVisibility(); // Сброс видимости адреса доставки
    });
});