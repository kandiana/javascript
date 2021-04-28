// Вариант 1
for (var i = 1; i <= 20; i++) {
    console.log('x'.repeat(i));
}

// Вариант 2
var pyr = 'x';
for (var i = 2; i <= 20; i++) {
    pyr += '\n' + 'x'.repeat(i);
}
console.log(pyr)

// Симметричная пирамида (немного не в тему, но мне захотелось попробовать)
var pyrHeight = 20;
pyr = ' '.repeat(pyrHeight) + 'x'
for (var i = 2; i <= (pyrHeight * 2); i += 2) {
    pyr += '\n' + ' '.repeat(pyrHeight - i / 2) + 'x'.repeat(i + 1);
}
console.log(pyr)