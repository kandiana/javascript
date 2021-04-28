function numberToObject(num) {
    if (num >= 1000) return {};
    var numObj = {
        ones: num % 10,
        tens: Math.floor(num / 10) % 10,
        hundreds: Math.floor(num / 100),
    }
    return numObj;
}

number = parseInt(prompt('Введите целое число от 0 до 999'));

while (isNaN(number)) {
    number = prompt('Вы ввели не число.\nВведите целое число от 0 до 999');
}

console.log(number)
console.log(numberToObject(number));

