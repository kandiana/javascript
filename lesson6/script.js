// Products

class product {
    constructor(name, cost, unit, unitName, amount) {
        this.name = name;
        this.cost = cost;
        if (isNaN(unit)) this.unit = 1;
        else this.unit = unit;
        this.unitName = unitName;
        this.amount = amount;
    }
}
var productsList = [];

function productsListGenerate() {
    productsList.push(new product('Яблоки', 120, 1, 'кг', 10));
    productsList.push(new product('Помидоры', 90, 1, 'кг', 10));
    productsList.push(new product('Огурцы', 70, 1, 'кг', 10));
    productsList.push(new product('Молоко', 69, 1, 'л', 5));
    productsList.push(new product('Творог', 145, 1, 'кг', 0));
    productsList.push(new product('Котлеты', 116, 1, 'уп', 3));
    productsList.push(new product('Рис', 68, 1, 'кг', 0));
    productsList.push(new product('Конфеты', 516, 1, 'кг', 20));
}

function productsItemGenerate(item, productsDiv, i) {
    var productsListItem = document.createElement("div");
    productsListItem.setAttribute('class', 'products__item')

    productsListItem.innerHTML = `<p class="products__item-number">${parseInt(i) + 1}</p>` +
        `<img src="img/${item.name}_1.jpg" class="products__item-img" id="img_${i}"></img>` +
        `<p class="products__item-name">${item.name}</p>` +
        `<p class="products__item-cost">${item.cost} руб. за ${item.unit} ${item.unitName}</p>` +
        `<p class="products__item-availability" id="availability_${i}">${item.amount > 0 ? item.amount : 'нет'}</p>` +
        `<button class=${item.amount > 0 ? "button" : "button_disabled"} id="button_${i}">Купить</button>`
    productsDiv.appendChild(productsListItem);

    var itemButton = document.getElementById(`button_${i}`);
    if (item.amount > 0) itemButton.addEventListener('click', buyItem);

    var itemIMG = document.getElementById(`img_${i}`);
    itemIMG.addEventListener('click', changeImage);
}

function productsListPrint() {
    var productsDiv = document.createElement("div");
    productsDiv.setAttribute('class', 'products');
    productsDiv.id = "products";
    document.body.appendChild(productsDiv);

    var productsListHeader = document.createElement("div");
    productsListHeader.setAttribute('class', 'products__item');
    productsListHeader.classList.add('products__title');
    productsListHeader.innerHTML = '<p class="products__item-number">№</p>' +
        '<h3 class="products__item-img">Изображение</h3>' +
        '<h3 class="products__item-name">Наименование</h3>' +
        '<h3 class="products__item-cost">Стоимость</h3>' +
        '<h3 class="products__item-availability">Наличие</h3>';
    productsDiv.appendChild(productsListHeader);

    for (p in productsList) productsItemGenerate(productsList[p], productsDiv, p);
}

function changeImage(img) {
    var productImage = img.path[0];
    var i = parseInt(productImage.src.slice(productImage.src.indexOf('_') + 1, productImage.src.indexOf('.')));
    // var imgPath = productImage.src.slice(0, productImage.src.indexOf('_') + 1) + (i % 3 + 1) + '.jpg';  // если по 3 картинки
    var imgPath = productImage.src.slice(0, productImage.src.indexOf('_') + 1) + (i + 1) + '.jpg';
    productImage.src = imgPath;
    productImage.onerror = function () {
        productImage.src = productImage.src.slice(0, productImage.src.indexOf('_') + 1) + 1 + '.jpg';
        console.clear();
    }
}


// Basket

var basket = {
    products: [],
    amount: [],

    addProduct(product, amount) {
        if (!isNaN(amount) && !isNaN(product.cost)) {
            for (p of this.products) {
                if (p.name === product.name) {
                    this.amount[this.products.indexOf(p)] += amount;
                    return;
                }
            }
            this.products.push(product);
            this.amount.push(amount);
        }
    },

    countBasketPrice() {
        var finalCost = 0;
        for (i in this.products) {
            finalCost += this.products[i].cost * this.amount[i] / this.products[i].unit;
        }
        return finalCost;
    },

    printBasketCondition() {
        var numberOfItems = this.products.length;
        if (numberOfItems === 0) return '<p class="basket__condition">Корзина пуста</p>';
        else {
            var itemWord;
            var rubleWord;
            var totalCost = this.countBasketPrice();

            if (numberOfItems === 1) itemWord = 'товар';
            else if (numberOfItems > 1 && numberOfItems < 5) itemWord = 'товара общей';
            else itemWord = 'товаров общей';

            if (totalCost % 100 > 10 && totalCost % 100 < 15) rubleWord = 'рублей';
            else if (totalCost % 10 === 1) rubleWord = 'рубль';
            else if (totalCost % 10 > 1 && totalCost % 10 < 5) rubleWord = 'рубля';
            else rubleWord = 'рублей';

            return `<p class="basket__condition">В корзине ${numberOfItems} ${itemWord} стоимостью ${totalCost} ${rubleWord}.</p>`
        }
    },

    printBasketContents() {
        var result;
        if (this.products.length !== 0) {
            result = '<p class="basket__line basket__header">' +
                '<span class="basket__product-name">Продукт</span>' +
                '<span class="basket__product-cost-calculation"></span>' +
                '<span class="basket__product-cost">Цена</span>' +
                '</p>';
            for (i in this.products) {
                result += '<p class="basket__line">' + '<span class="basket__product-name">' + this.products[i].name + '</span>' +
                    '<span class="basket__product-cost-calculation">' + this.products[i].cost + ' pуб.' + ' \u00d7 ' + this.amount[i] + ' ' + this.products[i].unitName + ' = ' + '</span>' + '<span class="basket__product-cost">' +
                    this.products[i].cost * this.amount[i] + ' pуб.</span></p>';
            }
            result += '<p class="basket__line basket__product-result">' +
                '<span class="basket__product-name">Итого:</span>' +
                '<span class="basket__product-cost-calculation"></span>' +
                '<span class="basket__product-cost">' + this.countBasketPrice() + ' руб.</span>' +
                '</p>';
        }
        return result;
    },

    clearBasket() {
        this.products = [];
        this.amount = [];
    }
}

function shopBasket() {
    basket.clearBasket();

    var basketDiv = document.createElement("div");
    basketDiv.setAttribute('class', 'basket');
    basketDiv.id = "basket";
    document.body.insertBefore(basketDiv, document.body.firstChild);

    basketDiv.innerHTML = basket.printBasketCondition();

    var basketContentsButton = document.createElement("button");
    basketContentsButton.setAttribute('class', 'button_disabled');
    //basketContentsButton.classList.add('invisible');
    basketContentsButton.id = "basket_button";

    basketContentsButton.innerHTML = 'Показать содержимое корзины';
    basketDiv.appendChild(basketContentsButton);

    basketContentsButton.addEventListener('click', function () {
        if (basketContentsButton.innerHTML === 'Показать содержимое корзины' && basketContentsButton.className !== 'button_disabled') {
            var basketContents = document.createElement("div");
            basketContents.innerHTML = basket.printBasketContents()
            basketDiv.appendChild(basketContents);
            basketContentsButton.innerHTML = 'Скрыть содержимое корзины';
        }
        else if (basketContentsButton.innerHTML === 'Скрыть содержимое корзины') {
            basketDiv.removeChild(basketDiv.lastChild);
            basketContentsButton.innerHTML = 'Показать содержимое корзины';
        }
    });
}

function buyItem(item) {
    var i = parseInt(item.path[0].id.slice(item.path[0].id.indexOf('_') + 1));
    var product = productsList[i];
    var productDiv = document.getElementById("products");
    var productItem = productDiv.childNodes[i + 1];

    var basketDiv = document.getElementById("basket");

    var prev_amount = basket.amount.length;
    basket.addProduct(product, 1);

    product.amount -= 1;
    if (product.amount === 0) {
        document.getElementById(`availability_${i}`).innerHTML = 'нет';
        var buyButton = document.getElementById(item.path[0].id);
        buyButton.removeEventListener('click', buyItem);
        buyButton.classList = ['button_disabled']
    }
    else document.getElementById(`availability_${i}`).innerHTML = product.amount;

    var basketButton = document.getElementById("basket_button");

    if (prev_amount === 0 && basket.amount.length > 0) {
        basketButton.classList = ['button'];
        // document.getElementsByClassName('basket__condition')[0].style = "margin-bottom: 20px";
    }
    // else if (prev_amount > 0 && basket.amount.length === 0) {
    //     basketButton.classList.add('invisible');
    //     document.getElementsByClassName('basket__condition')[0].style = "";
    // }
    basketDiv.firstChild.innerHTML = basket.printBasketCondition();

    if (basketButton.innerHTML === 'Скрыть содержимое корзины') {
        basketDiv.lastChild.innerHTML = basket.printBasketContents();
    }
}


///////// main function
function init() {
    //генерация внешнего вида страницы
    productsListGenerate();
    productsListPrint();

    //функция покупки
    shopBasket();
}

window.onload = init;