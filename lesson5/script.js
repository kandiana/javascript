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
        if (numberOfItems === 0) return '<p class="basket__condition">?????????????? ??????????</p>';
        else {
            var itemWord;
            var rubleWord;
            var totalCost = this.countBasketPrice();

            if (numberOfItems === 1) itemWord = '??????????';
            else if (numberOfItems > 1 && numberOfItems < 5) itemWord = '???????????? ??????????';
            else itemWord = '?????????????? ??????????';

            if (totalCost % 100 > 10 && totalCost % 100 < 15) rubleWord = '????????????';
            else if (totalCost % 10 === 1) rubleWord = '??????????';
            else if (totalCost % 10 > 1 && totalCost % 10 < 5) rubleWord = '??????????';
            else rubleWord = '????????????';

            return `<p class="basket__condition">?? ?????????????? ${numberOfItems} ${itemWord} ???????????????????? ${totalCost} ${rubleWord}.</p>`
        }
    },
    printBasketContents() {
        var result;
        console.log(this);
        if (this.products.length !== 0) {
            result = '<p class="basket__line basket__header">' +
                '<span class="basket__product-name">??????????????</span>' +
                '<span class="basket__product-cost-calculation"></span>' +
                '<span class="basket__product-cost">????????</span>' +
                '</p>';
            for (i in this.products) {
                result += '<p class="basket__line">' + '<span class="basket__product-name">' + this.products[i].name + '</span>' +
                    '<span class="basket__product-cost-calculation">' + this.products[i].cost + ' p????.' + ' \u00d7 ' + this.amount[i] + ' ' + this.dimension[i] + ' = ' + '</span>' + '<span class="basket__product-cost">' +
                    this.products[i].cost * this.amount[i] + ' p????.</span></p>';
            }
            result += '<p class="basket__line basket__product-result">' +
                '<span class="basket__product-name">??????????:</span>' +
                '<span class="basket__product-cost-calculation"></span>' +
                '<span class="basket__product-cost">' + this.countBasketPrice() + ' ??????.</span>' +
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

    // ?????????? ???????????? ??????????????...
    if (Math.round(Math.random())) basket.addProduct(new Product('????????????', 120), 0.5, '????');
    if (Math.round(Math.random())) basket.addProduct(new Product('????????????????', 90), 0.8, '????');
    if (Math.round(Math.random())) basket.addProduct(new Product('????????????', 70), 0.8, '????');
    if (Math.round(Math.random())) basket.addProduct(new Product('????????????', 69), 2, '??');
    if (Math.round(Math.random())) basket.addProduct(new Product('????????????', 145), 0.6, '????');
    if (Math.round(Math.random())) basket.addProduct(new Product('??????????????', 116), 3, '????');
    if (Math.round(Math.random())) basket.addProduct(new Product('??????', 68), 2, '????');
    if (Math.round(Math.random())) basket.addProduct(new Product('??????????????', 516), 1.5, '????');
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
    basketContentsButton.innerHTML = '???????????????? ???????????????????? ????????????';
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
    cleaningButton.addEventListener('click', clear);   // ?? ???????? ???? ???????????????????? ???????????????? ???????????????? ?? ?????? ?????????????? (clear) ?? ?? ???????? ???? ??????????????, ????????????...
}

window.onload = init;