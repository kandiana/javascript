// Products

class product {
    constructor(id, name, cost, unit, unitName, amount) {
        this.id = id;
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
    var i = 0;
    productsList.push(new product(i++, 'Яблоки', 120, 1, 'кг', 10));
    productsList.push(new product(i++, 'Помидоры', 90, 1, 'кг', 10));
    productsList.push(new product(i++, 'Огурцы', 70, 1, 'кг', 10));
    productsList.push(new product(i++, 'Молоко', 69, 1, 'л', 5));
    productsList.push(new product(i++, 'Творог', 145, 1, 'кг', 0));
    productsList.push(new product(i++, 'Котлеты', 116, 1, 'уп', 3));
    productsList.push(new product(i++, 'Рис', 68, 1, 'кг', 0));
    productsList.push(new product(i++, 'Конфеты', 516, 1, 'кг', 20));
}

function productsItemGenerate(item, productsDiv, i) {
    var productsListItem = document.createElement("div");
    productsListItem.setAttribute('class', 'products__item')

    productsListItem.innerHTML = `<p class="products__item-number">${parseInt(i) + 1}</p>` +
        `<img src="img/${item.name}_1.jpg" class="products__item-img" id="img_${item.id}"></img>` +
        `<p class="products__item-name">${item.name}</p>` +
        `<p class="products__item-cost">${item.cost} руб. за ${item.unit} ${item.unitName}</p>` +
        `<p class="products__item-availability" id="availability_${item.id}">${item.amount > 0 ? item.amount : 'нет'}</p>` +
        `<button class=${item.amount > 0 ? "button" : "button_disabled"} id="button_${item.id}">Купить</button>`
    productsDiv.appendChild(productsListItem);

    var itemButton = document.getElementById(`button_${item.id}`);
    itemButton.addEventListener('click', e => buyItem(e.path[0]));

    var itemIMG = document.getElementById(`img_${item.id}`);
    itemIMG.addEventListener('click', changeImage);
}

function productsListPrint() {
    var productsDiv = document.getElementById("products");

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

    removeProduct(product, amount) {
        if (!isNaN(amount)) {
            for (i in this.products) {
                if (this.products[i].name === product.name) {
                    this.amount[i] -= amount;
                    if (this.amount[i] === 0) {
                        this.products.splice(i, 1);
                        this.amount.splice(i, 1);
                    }
                    return;
                }
            }
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

    printBasketContents(basketContentsDiv) {
        while (basketContentsDiv.firstChild) {
            basketContentsDiv.removeChild(basketContentsDiv.firstChild);
        }
        if (this.products.length !== 0) {
            var basketHeader = document.createElement("div");
            basketHeader.classList.add("basket__line");
            basketHeader.classList.add("basket__header");
            basketHeader.innerHTML = '<p class="basket__product-name">Продукт</p>' +
                '<p class="basket__product-cost-calculation"></p>' +
                '<p class="basket__product-cost">Цена</p>';
            basketContentsDiv.appendChild(basketHeader);

            for (i in this.products) {
                var basketLine = document.createElement("div");
                basketLine.classList.add("basket__line");
                basketLine.innerHTML = '<p>' + '<span class="basket__product-name">' + this.products[i].name + '</span>' +
                    '<span class="basket__product-cost-calculation">' + this.products[i].cost + ' pуб.' + ' \u00d7 ' + this.amount[i] + ' ' + this.products[i].unitName + ' = ' + '</span>' + '<span class="basket__product-cost">' +
                    this.products[i].cost * this.amount[i] + ' pуб.</span></p>' +
                    `<button class="basket__button ${this.products[i].amount > 0 ? "button" : "button_disabled"}" id="plus_${i}-${this.products[i].id}">+</button>` +
                    `<button class="basket__button button" id="minus_${i}-${this.products[i].id}">-</button>` +
                    `<button class="basket__button basket__button-x button" id="delete_${i}-${this.products[i].id}">x</button>`;
                basketContentsDiv.appendChild(basketLine);

                var basketPlusButton = document.getElementById(`plus_${i}-${this.products[i].id}`);
                basketPlusButton.addEventListener('click', e => {
                    var prodId = e.path[0].id.slice(e.path[0].id.indexOf('-') + 1);
                    var buyButton = document.getElementById(`button_${prodId}`);
                    buyItem(buyButton);
                })

                var basketMinusButton = document.getElementById(`minus_${i}-${this.products[i].id}`);
                basketMinusButton.addEventListener('click', e => {
                    var prodId = e.path[0].id.slice(e.path[0].id.indexOf('-') + 1);
                    var buyButton = document.getElementById(`button_${prodId}`);
                    returnItem(buyButton, 1);
                })

                var basketDeleteButton = document.getElementById(`delete_${i}-${this.products[i].id}`);
                basketDeleteButton.addEventListener('click', e => {
                    var prodId = e.path[0].id.slice(e.path[0].id.indexOf('-') + 1);
                    var buyButton = document.getElementById(`button_${prodId}`);
                    var basketN = e.path[0].id.slice(e.path[0].id.indexOf('_') + 1, e.path[0].id.indexOf('-'));
                    returnItem(buyButton, basket.amount[basketN]);
                })
            }

            var basketResult = document.createElement("div");
            basketResult.classList.add("basket__line");
            basketResult.classList.add("basket__product-result");
            basketResult.innerHTML = '<p class="basket__product-name">Итого:</p>' +
                '<p class="basket__product-cost-calculation"></p>' +
                '<p class="basket__product-cost">' + this.countBasketPrice() + ' руб.</p>';
            basketContentsDiv.appendChild(basketResult);
        }
        else {
            basketContentsDiv.innerHTML += '<p class="basket__line">Корзина пуста</p>';
        }
    },

    clearBasket() {
        this.products = [];
        this.amount = [];
    }
}

function headerPrint() {
    var headerDiv = document.getElementById("header");
    headerDiv.innerHTML = basket.printBasketCondition();

    var productsBasketSwitchButton = document.createElement("button");
    productsBasketSwitchButton.id = "products-basket-switch";
    productsBasketSwitchButton.classList.add('button');
    productsBasketSwitchButton.innerHTML = "Перейти к корзине";
    headerDiv.insertBefore(productsBasketSwitchButton, headerDiv.firstChild);

    var basketDiv = document.getElementById("basket");
    var productDiv = document.getElementById("products");

    productsBasketSwitchButton.addEventListener('click', function () {
        if (productsBasketSwitchButton.innerHTML === "Перейти к корзине") {
            productsBasketSwitchButton.innerHTML = "Вернуться к покупкам";
            headerDiv.lastChild.classList.add('hidden');
            basketDiv.classList.remove('hidden');
            productDiv.classList.add('hidden');

            var basketBlock = document.getElementById("basket-block_0");
            if (basketBlock.lastChild.classList.contains("hidden")) rollBlock(0);
        }
        else {
            productsBasketSwitchButton.innerHTML = "Перейти к корзине";
            headerDiv.lastChild.classList.remove('hidden');
            basketDiv.classList.add('hidden');
            productDiv.classList.remove('hidden');
        }
    });
}

function shopBasket() {
    basket.clearBasket();
    var n = 0;

    var basketDiv = document.getElementById("basket");
    basketDiv.classList.add('hidden');

    var basketMain = document.createElement("div");
    basketDiv.append(basketMain);

    var basketBlock = document.createElement("div");
    basketBlock.id = `basket-block_${n}`;
    basketMain.appendChild(basketBlock);

    var basketContentsHeader = document.createElement("h3");
    basketContentsHeader.id = `basket-block-header_${n}`;
    basketContentsHeader.classList.add("basket__title")
    basketContentsHeader.innerHTML = "Состав корзины";
    basketBlock.appendChild(basketContentsHeader)

    var basketContentsDiv = document.createElement("div");
    basket.printBasketContents(basketContentsDiv);
    basketContentsDiv.classList.add('basket__block');
    basketBlock.appendChild(basketContentsDiv);

    basketContentsHeader.addEventListener('click', e => rollBlock(e.path[0].id.slice(e.path[0].id.indexOf('_') + 1)));
    n++;

    basketBlock = document.createElement("div");
    basketBlock.id = `basket-block_${n}`;
    basketMain.appendChild(basketBlock);

    var basketAddressHeader = document.createElement("h3");
    basketAddressHeader.id = `basket-block-header_${n}`;
    basketAddressHeader.classList.add("basket__title")
    basketAddressHeader.innerHTML = 'Адрес доставки';
    basketBlock.appendChild(basketAddressHeader)

    var basketAddressDiv = document.createElement("div");
    basketAddressDiv.innerHTML = '<label for="country">Страна</label><input class="form-item"  type="text" placeholder="Страна" id="country" required></textarea>' +
        '<label for="city">Город</label><input class="form-item"  type="text" placeholder="Город" id="city" required></textarea>' +
        '<label for="street">Адрес</label><input class="form-item"  type="text" placeholder="Адрес" id="street" required></textarea>' +
        '<label for="index">Почтовый индекс</label><input class="form-item"  type="text" placeholder="Почтовый индекс" id="index"></textarea>';
    basketAddressDiv.classList.add('basket__block');
    basketAddressDiv.classList.add('hidden');
    basketBlock.appendChild(basketAddressDiv);

    basketAddressHeader.addEventListener('click', e => rollBlock(e.path[0].id.slice(e.path[0].id.indexOf('_') + 1)))
    n++;

    basketBlock = document.createElement("div");
    basketBlock.id = `basket-block_${n}`;
    basketMain.appendChild(basketBlock);

    var basketCommentHeader = document.createElement("h3");
    basketCommentHeader.id = `basket-block-header_${n}`;
    basketCommentHeader.classList.add("basket__title");
    basketCommentHeader.innerHTML = 'Комментарий';
    basketBlock.appendChild(basketCommentHeader);

    var basketCommentDiv = document.createElement("div");
    basketCommentDiv.innerHTML = '<textarea class="form-item"  rows="10" cols="64" placeholder="Текст сообщения" required></textarea>';
    basketCommentDiv.classList.add('basket__block');
    basketCommentDiv.classList.add('hidden');
    basketBlock.appendChild(basketCommentDiv);

    basketCommentHeader.addEventListener('click', e => rollBlock(e.path[0].id.slice(e.path[0].id.indexOf('_') + 1)))

    var basketNextButton = document.createElement("button");
    basketNextButton.id = "basket-next";
    basketNextButton.type = "button";
    basketNextButton.classList.add("basket__next");
    basketNextButton.classList.add("button_disabled");
    basketNextButton.innerHTML = "Далее";
    basketDiv.appendChild(basketNextButton);

    basketNextButton.addEventListener('click', function () {
        if (basket.amount.length > 0 && !basketNextButton.classList.contains("button_disabled")) {
            var i;
            var basketBlock;
            for (i = 0; i < n + 1; i++) {
                basketBlock = document.getElementById(`basket-block_${i}`);
                if (!basketBlock.lastChild.classList.contains("hidden")) break;
            }
            if (i < n) rollBlock(i + 1);
            else if (i === n) basketNextButton.type = "submit";
            else if (i === n + 1) rollBlock(0);
        }
    })
}

function rollBlock(basketBlockN) {
    if (basketBlockN === "0" || basket.amount.length > 0) {
        var basketBlock = document.getElementById(`basket-block_${basketBlockN}`);
        var numOfBlocks = document.getElementById("basket").firstChild.childNodes.length;
        var basketNextButton = document.getElementById("basket-next");

        if (basketBlockN < numOfBlocks - 1) basketNextButton.innerHTML = "Далее";
        else {
            basketNextButton.innerHTML = "Отправить";
            basketNextButton.type = "button";
        }

        if (basketBlock.lastChild.classList.contains("hidden")) {
            for (var i = 0; i < numOfBlocks; i++) {
                if (i !== basketBlockN) document.getElementById(`basket-block_${i}`).lastChild.classList.add("hidden");
            }
            basketBlock.lastChild.classList.remove("hidden");
            if (i !== 0) basketBlock.lastChild.firstChild.focus();


        }
        else basketBlock.lastChild.classList.add("hidden");
    }
}

function buyItem(item) {
    var i = parseInt(item.id.slice(item.id.indexOf('_') + 1));
    var product = productsList[i];

    if (product.amount > 0) {
        var headerDiv = document.getElementById("header");
        var basketContentsDiv = document.getElementById("basket-block_0").lastChild;

        basket.addProduct(product, 1);

        product.amount -= 1;
        if (product.amount === 0) {
            document.getElementById(`availability_${product.id}`).innerHTML = 'нет';
            var buyButton = document.getElementById(item.id);
            buyButton.removeEventListener('click', buyItem);
            buyButton.classList = ['button_disabled']
        }
        else document.getElementById(`availability_${product.id}`).innerHTML = product.amount;

        headerDiv.lastChild.innerHTML = basket.printBasketCondition();
        basket.printBasketContents(basketContentsDiv);

        var basketNextButton = document.getElementById("basket-next");
        if (basketNextButton.classList.contains('button_disabled')) {
            basketNextButton.classList.remove('button_disabled');
            basketNextButton.classList.add('button');
        }
    }
    else alert("Данного продукта нет в наличии");
}

function returnItem(item, n) {
    var i = parseInt(item.id.slice(item.id.indexOf('_') + 1));
    var product = productsList[i];

    var headerDiv = document.getElementById("header");
    var basketContentsDiv = document.getElementById("basket-block_0").lastChild;

    basket.removeProduct(product, n);

    product.amount += n;
    document.getElementById(`availability_${product.id}`).innerHTML = product.amount;

    headerDiv.lastChild.innerHTML = basket.printBasketCondition();
    basket.printBasketContents(basketContentsDiv);

    var basketNextButton = document.getElementById("basket-next");
    if (basket.amount.length === 0) {
        basketNextButton.classList.add('button_disabled');
        basketNextButton.classList.remove('button');
        basketNextButton.type = "button";
    }
}


///////// main function
function init() {
    headerPrint();
    productsListGenerate();
    productsListPrint();

    shopBasket();
}

window.onload = init;