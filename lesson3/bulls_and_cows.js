function numberGenerate() {
    var digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var number = [], i = 0;

    number.push(Math.floor(Math.random() * 9) + 1);          // first digit

    for (var j = 0; j < 3; j++) {
        i = digits.indexOf(number[j]);
        digits.splice(i, 1);
        number.push(digits[Math.floor(Math.random() * (9 - j))]);      // other digits
    }
    return number;
}

function isNumberCorrect(strN) {
    if (isNaN(parseInt(strN)) || strN[0] === '0' || strN.length !== 4) return false;
    for (i in strN) {
        if (strN.lastIndexOf(strN[i]) != i) return false;          // строгое сравнение не срабатывает, видимо, у значений разные типы...
    }
    return true;
}

function digitsToNumber(arrN) {
    var res = 0;
    for (var i = 0; i < 4; i++) {
        res = res * 10 + arrN[i];
    }
    return res;
}

function numbersCompare(arrComp, arrUser) {
    var bulls = 0, cows = 0;
    for (i in arrUser) {
        j = arrComp.indexOf(arrUser[i]);
        if (j == i) bulls++;                // строгое сравнение не срабатывает, видимо, у значений разные типы...
        else if (j !== -1) cows++;
    }
    statistics.push([digitsToNumber(arrUser), bulls, cows]);
    return [bulls, cows];
}

function game(numberComp) {
    var line = 'Введите четырехзначное число с неповторяющимися цифрами';
    if (statistics.length > 0) line = 'Предыдущие попытки:\n' + statistics.map(function (x) { return (x[0] + ' - ' + x[1] + 'Б, ' + x[2] + 'К') }).join('\n') + '\n\n' + line;

    var numberUser = prompt(line);

    while (!isNumberCorrect(numberUser)) {
        check = prompt('Вы ввели некорректное число.\n\n2 - выйти из игры \nиное - повторить ввод');
        if (check === '2') return 0;
        numberUser = prompt(line);
    }

    numberUser = numberUser.split("");
    res = numbersCompare(numberComp, numberUser.map(function (x) { return parseInt(x); }));

    if (res[0] === 4) {
        alert('Вы победили! Загаданное число - ' + digitsToNumber(numberComp) + '\nВсего попыток было сделано: ' + statistics.length);
        return 0;
    } else {
        alert('Быков: ' + res[0] + '\nКоров: ' + res[1]);
        return 1;
    }
}

var check = 0, number, statistics;

while (true) {
    check = prompt('Добро пожаловать в игру "Быки и Коровы"!\n\n1 - прочитать правила\n2 - выйти из игры\nиное - начать игру');
    while (check === '1') {
        alert('Правила игры "Быки и Коровы":\nКомпьютер загадывает четырехзначное число, состоящее из различных цифр. Ваша задача отгадать это число.\nЗа ход вы можете ввести свое четырехзначное число также с неповторяющимися цифрами, после чего Вам будет сказано, сколько "Быков" и сколько "Коров" в Вашем числе.\nЧисло "Быков" - это количество цифр, угаданных с точностью до позиции в числе.\nЧисло "Коров" - количество цифр, угаданных без совпадения позиций в числах.\n\nНапример:\nЗадумано число 3652.\nВы называете число 1623.\nРезультат:\n1 Бык (цифра 6 совпадает и по значению, и по позиции)\n2 Коровы (цифры 2 и 3 есть в загаданном числе, но стоят на других местах.');
        check = prompt('1 - прочитать правила\n2 - выйти из игры\nиное - начать игру');
    }
    if (check === '2') break;

    number = numberGenerate();
    statistics = [];
    while (game(number));
    if (check === '2') break;
}