primeNumbers = [2];

function isNumberPrime(n) {
    var i = 0;
    while (i < primeNumbers.length && n >= primeNumbers[i] ** 2) {          // вот требуемый в задании цикл while :)
        if (n % primeNumbers[i++] === 0) return false;
    }
    return true;
}

for (var i = 3; i < 100; i++) {                               // тут тоже можно было бы while вставить, но, мне кажется, for лучше подходит
    if (isNumberPrime(i)) primeNumbers.push(i);
}

alert('Простые числа до 100:\n' + primeNumbers.join(', ') + '.\n\nВсего их ' + primeNumbers.length);
