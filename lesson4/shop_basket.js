// хранение товаров в корзине: [имя товара, цена единицы (1шт, 1кг и т.п.) товара в рублях, количество единиц товара]

var basket = {
    products: [],
    amount: [],
    addProduct(product, amount) {
        this.products.push(product);
        this.amount.push(amount);
    },
    countBasketPrice() {
        var finalCost = 0;
        for (i in this.products) {
            finalCost += this.products[i].cost * this.amount[i];
        }
        return finalCost;
    },
    printBasket() {
        result = 'Корзина:\n';
        for (i in this.products) {
            result += this.products[i].name + '     -     ' + this.products[i].cost + ' \u00d7 ' + this.amount[i] + ' = ' + this.products[i].cost * this.amount[i] + ' pуб.\n'
        }
        result += '\nИтого - ' + this.countBasketPrice() + ' руб.';
        return result;
    },
    clearBasket() {
        this.products = [];
        this.amount = [];
    }
}

class Product {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

basket.clearBasket();

basket.addProduct(new Product('Яблоки', 120), 0.5);
basket.addProduct(new Product('Помидоры', 90), 0.8);
basket.addProduct(new Product('Огурцы', 70), 0.8);
basket.addProduct(new Product('Молоко', 69), 2);
basket.addProduct(new Product('Творог', 145), 0.6);
basket.addProduct(new Product('Котлеты', 116), 3);
basket.addProduct(new Product('Рис', 68), 2);
basket.addProduct(new Product('Конфеты', 516), 1.5);

alert(basket.printBasket());

basket.clearBasket();

basket.addProduct(new Product('Яблоки', 120), 1);
basket.addProduct(new Product('Помидоры', 90), 1);
basket.addProduct(new Product('Огурцы', 70), 1);
basket.addProduct(new Product('Рис', 68), 1);

alert(basket.printBasket());