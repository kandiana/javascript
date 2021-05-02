/////////// task 1

function chessBoard(width, height) {
    clear();
    var check = document.getElementById("board");
    var board = document.createElement("div");
    board.setAttribute('class', 'board');
    board.id = "board";
    document.body.appendChild(board);

    var boardWrapper = document.createElement('div');
    boardWrapper.setAttribute('class', 'wrapper');
    board.appendChild(boardWrapper);

    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if ((i === 0 || i === 9) && (j === 0 || j === 9)) {
                var corner = document.createElement('div');
                corner.setAttribute('class', 'corner');

                boardWrapper.appendChild(corner);
            }
            else if ((i === 0 || i === 9)) {
                var symbol = document.createElement('div');

                symbol.setAttribute('class', 'symbol');
                if (i === 0) symbol.classList.add('symbol_upside-down');

                symbol.innerHTML = letters[8 - j];

                boardWrapper.appendChild(symbol);
            }
            else if ((j === 0 || j === 9)) {
                var symbol = document.createElement('div');

                symbol.setAttribute('class', 'symbol');
                if (j === 9) symbol.classList.add('symbol_upside-down');

                symbol.innerHTML = i;

                boardWrapper.appendChild(symbol);
            }
            else {
                var tile = document.createElement('div');
                tile.setAttribute('class', 'tile');

                if ((i + j) % 2 === 0) tile.classList.add('tile_white');
                else tile.classList.add('tile_black');

                if (i === 1) tile.classList.add('tile_top');
                else if (i === 8) tile.classList.add('tile_bottom');

                if (j === 1) tile.classList.add('tile_left');
                else if (j === 8) tile.classList.add('tile_right');

                boardWrapper.appendChild(tile);
            }
        }
    }
}

function clearElement(elementId) {
    var element = document.getElementById(elementId);
    if (element !== null) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.remove();
    }
}





////////// task 2
var basket = {
    products: [],
    amount: [],
    dimension: [],
    addProduct(product, amount, dimension) {
        if (!isNaN(amount) && !isNaN(product.cost)) {
            this.products.push(product);
            this.amount.push(amount);
            this.dimension.push(dimension);
        }
    },
    countBasketPrice() {
        var finalCost = 0;
        for (i in this.products) {
            finalCost += this.products[i].cost * this.amount[i];
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
        console.log(this);
        if (this.products.length !== 0) {
            result = '<p class="basket__line basket__header">' +
                '<span class="basket__product-name">Продукт</span>' +
                '<span class="basket__product-cost-calculation"></span>' +
                '<span class="basket__product-cost">Цена</span>' +
                '</p>';
            for (i in this.products) {
                result += '<p class="basket__line">' + '<span class="basket__product-name">' + this.products[i].name + '</span>' +
                    '<span class="basket__product-cost-calculation">' + this.products[i].cost + ' pуб.' + ' \u00d7 ' + this.amount[i] + ' ' + this.dimension[i] + ' = ' + '</span>' + '<span class="basket__product-cost">' +
                    this.products[i].cost * this.amount[i] + ' pуб.</span></p>';
            }
            result += '<p class="basket__line basket__product-result">' +
                '<span class="basket__product-name">Итого:</span>' +
                '<span class="basket__product-cost-calculation"></span>' +
                '<span class="basket__product-cost">' + this.countBasketPrice() + ' руб.</span>' +
                '</p>';
        }
        console.log(this.countBasketPrice())
        return result;
    },
    clearBasket() {
        this.products = [];
        this.amount = [];
        this.dimension = [];
    }
}

class Product {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

function shopBasketGenerate() {
    basket.clearBasket();

    // чтобы разное выводил...
    if (Math.round(Math.random())) basket.addProduct(new Product('Яблоки', 120), 0.5, 'кг');
    if (Math.round(Math.random())) basket.addProduct(new Product('Помидоры', 90), 0.8, 'кг');
    if (Math.round(Math.random())) basket.addProduct(new Product('Огурцы', 70), 0.8, 'кг');
    if (Math.round(Math.random())) basket.addProduct(new Product('Молоко', 69), 2, 'л');
    if (Math.round(Math.random())) basket.addProduct(new Product('Творог', 145), 0.6, 'кг');
    if (Math.round(Math.random())) basket.addProduct(new Product('Котлеты', 116), 3, 'уп');
    if (Math.round(Math.random())) basket.addProduct(new Product('Рис', 68), 2, 'кг');
    if (Math.round(Math.random())) basket.addProduct(new Product('Конфеты', 516), 1.5, 'кг');
}

function shopBasket() {
    clear();
    shopBasketGenerate();

    var basketDiv = document.createElement("div");
    basketDiv.setAttribute('class', 'basket');
    basketDiv.id = "basket";
    document.body.appendChild(basketDiv);

    basketDiv.innerHTML = basket.printBasketCondition();

    var basketContentsButton = document.createElement("button");
    basketContentsButton.setAttribute('class', 'menu__button');
    basketContentsButton.innerHTML = 'Показать содержимое козины';
    basketDiv.appendChild(basketContentsButton);

    basketContentsButton.addEventListener('click', function () { basketDiv.innerHTML += basket.printBasketContents(); });
}

function clearBasket() {
    var element = document.getElementById("basket");
    if (element !== null) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.remove();
    }
}




////////// clearing

function clearElement(elementId) {
    var element = document.getElementById(elementId);
    if (element !== null) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        element.remove();
    }
}

function clear() {
    clearElement("board");
    clearElement("basket");
}







///////// main function
function init() {
    var chessButton = document.getElementById("chessButton");
    var basketButton = document.getElementById("basketButton");
    var cleaningButton = document.getElementById("cleaningButton");

    chessButton.addEventListener('click', chessBoard);
    basketButton.addEventListener('click', shopBasket);
    cleaningButton.addEventListener('click', clear);   // у меня не получилось передать аргумент в эту функцию (clear) и я пока не понимаю, почему...
}

window.onload = init;