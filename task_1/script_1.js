// Написати форму для вирахування решти при внесенні певної суми і ціни
// товару. У формі створити поля: “Сума” (де користувач вводить суму
// грошей, яку він віддає) та “Ціна” (де користувач вводить ціну товарів,
// що купує). При натисканні на кнопку “Повернути решту” - скріпт
// повинен вираховувати скільки здачі буде на 1 цент, 5 центів, 10 центів,
// 25 центів, 50 центів і долари. Наприклад, при внесенні 3.14 долари і ціна
// товару 0.99 долара, повинно повернути “Ваша решта: 2 долари, 15
// центів.” (по номіналу 2 долари, 10 центів, 5 центів.)
'use strict';

// get submit btn
let sumbitBtn = document.getElementById('submit');

// add event listener
sumbitBtn.addEventListener('click', culc)

function culc(event) {
    // cancel btn submit event
    event.preventDefault();

    // get elements
    let sum = document.getElementById('sum');
    let price = document.getElementById('price');

    // convert to numbner 
    sum = Number(sum.value);
    price = Number(price.value);
    sum = sum.toFixed(2);
    price = price.toFixed(2)

    // if invalid sum/price
    if ((sum - price) < 0) {
        return
    }

    // rest
    let rest = sum - price;
    console.log(rest.toFixed(2))
        // convert rest
    rest = rest.toFixed(2);
    // rest in dolars 
    let dolars = Math.trunc(rest);
    // get fractional part
    let cents = Number((rest % 1).toFixed(2));
    // cent for rest
    const cent_50 = 0.50;
    const cent_25 = 0.25;
    const cent_10 = 0.10;
    const cent_05 = 0.05;
    const cent_01 = 0.01;
    // cent in fractional part
    let rest_c50 = 0;
    let rest_c25 = 0;
    let rest_c10 = 0;
    let rest_c05 = 0;
    let rest_c01 = 0;

    for (let i = 0; i < 100; i++) {
        // console.log(cents)
        // if cents not left
        if (cents <= 0) {
            return
        }

        if ((cents - cent_50) >= 0) {
            cents = cents - cent_50 + 0.0001;
            // cents = Math.trunc(cents);
            rest_c50++
            continue;
        }

        if ((cents - cent_25) >= 0) {
            cents = cents - cent_25 + 0.0001;
            // cents = Math.trunc(cents);
            rest_c25++
            continue;
        }

        if ((cents - cent_10) >= 0) {
            cents = cents - cent_10 + 0.0001;
            // cents = Math.trunc(cents);
            rest_c10++
            continue;
        }

        if ((cents - cent_05) >= 0) {
            cents = cents - cent_05 + 0.0001;
            // cents = Math.trunc(cents);
            rest_c05++
            continue;
        }

        if ((cents - cent_01) >= 0) {
            cents = cents - cent_01 + 0.0001;
            // cents = Math.trunc(cents);
            rest_c01++
            continue;
        }

    }

    // show rest 
    console.clear();

    if (dolars > 0) {
        console.log(dolars);
        console.log('dolars');
    }
    if (rest_c50 > 0) {
        console.log(rest_c50);
        console.log('50 censt');
    }
    if (rest_c25 > 0) {
        console.log(rest_c25);
        console.log('25 censt');
    }
    if (rest_c10 > 0) {
        console.log(rest_c10);
        console.log('10 censt');
    }
    if (rest_c05 > 0) {
        console.log(rest_c05);
        console.log('05 censt');
    }
    if (rest_c01 > 0) {
        console.log(rest_c01);
        console.log('01 censt');
    }









}