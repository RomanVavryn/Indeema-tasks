// Написати таблицю, де можна додавати дані через форму, редагувати дані
// і видаляти будь-який рядок (row). Таблиця повинна містити наступні
// поля: ім’я, прізвище, електронну адресу. Повинна бути валідація
// поля’’e-mail.’’ і дата створення має генеруватися автоматично.
// * Реалізувати можливість виділяти декілька рядків і видаляти їх.
'use strict';

// body node
let body = document.body;
body.style.margin = '0'; // body no margin

// wrapper
let wrapper = document.createElement('div');
// wrapper full screan size
wrapper.style.width = '100vw';
wrapper.style.height = '100vh';
// flex align all elem in center
wrapper.style.display = 'flex';
wrapper.style.justifyContent = 'center';
wrapper.style.alignItems = 'center';
// else styles
wrapper.style.backgroundColor = '#FFF';
wrapper.style.position = 'relative';

// add wrapper to body
body.append(wrapper);

// wrapper node 
let container = body.lastChild;