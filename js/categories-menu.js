document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.categories__menu');
    const foodContainers = {
        burger: document.querySelector('.food__container-burger'),
        snacks: document.querySelector('.food__container-snacks'),
        hotdog: document.querySelector('.food__container-hotdog')
    };

    categories.forEach(category => {
        category.addEventListener('click', function() {
            const selectedCategory = this.getAttribute('data-category');

            // Убираем активный класс и скрываем все контейнеры
            categories.forEach(cat => cat.classList.remove('active'));
            Object.values(foodContainers).forEach(container => {
                container.classList.add('hidden');
            });

            // Добавляем активный класс выбранной категории и показываем соответствующий контейнер
            this.classList.add('active');
            if (foodContainers[selectedCategory]) {
                foodContainers[selectedCategory].classList.remove('hidden');
            }
        });
    });
});