// хранение товаров в корзине: [имя товара, цена единицы (1шт, 1кг и т.п.) товара в рублях, количество единиц товара]

function countBasketPrice(basketArr) {
    var finalCost = 0;
    for (p of basketArr) {
        finalCost += p[1] * p[2];
    }
    return finalCost;
}

var basket = [['Яблоки', 120, 0.5], ['Помидоры', 90, 0.8], ['Огурцы', 70, 0.8], ['Молоко', 69, 2], ['Творог', 145, 0.6], ['Котлеты', 116, 3], ['Рис', 68, 2], ['Конфеты', 516, 1.5]];

alert('Корзина:\n' + basket.map(function (x) { return (x[0] + '     -     ' + x[1] + ' \u00d7 ' + x[2] + ' = ' + x[1] * x[2] + ' pуб.'); }).join('\n') + '\n\nИтого - ' + countBasketPrice(basket) + ' руб.');