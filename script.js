alert('Task 1');
var tc = parseInt(prompt('Input temperature in degrees Celsius:'));
var tf = (9 / 5) * tc + 32;
alert('And here is your temperature in degrees Fahrenheit:\n' + tc + '\u00b0C = ' + tf + '\u00b0F');

alert('Task 2');
var admin, somename;
somename = 'Василий';
admin = somename;
alert('Admin is ' + admin);

alert('Task 3');
alert('Do you know what JS-expression 1000 + \"108\" is equal to?\nPress \'ok\' to find out!');
alert('1000 + \"108\" = ' + (1000 + "108"));

alert('Task 4');
alert('I\'ve read about asynk and defer attributes. And I think I get why they are needed: to not keep user waiting. And I think I get what\'s the difference:\n\u2022 you use defer when the scripts are a part of the page content and the loading order is important;\n\u2022 you use async when the scripts contain some additional content (like adds) and you don\'t care when and in what order they are executed.\n\nBut I still don\'t know enough to check everything in practice...\nMaybe I could do it if I wrote these tasks in four different scripts?');