'use strict';

// get submit btn
let sumbitBtn = document.getElementById('submit');

// add event listener
sumbitBtn.addEventListener('click', calc)

function calc(event) {
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

    // invalid if sum < price
    if ((sum - price) < 0) {
        return
    }

    // rest
    let rest = sum - price;
    rest = rest.toFixed(2);
    // rest without the fractional part
    let dolars = Math.trunc(rest);
    // fractional part
    let cents = Number((rest % 1).toFixed(2));
    // cents constants
    const cent_50 = 0.50;
    const cent_25 = 0.25;
    const cent_10 = 0.10;
    const cent_05 = 0.05;
    const cent_01 = 0.01;
    // cents in fractional part
    let rest_c50 = 0;
    let rest_c25 = 0;
    let rest_c10 = 0;
    let rest_c05 = 0;
    let rest_c01 = 0;

    // calc what cents should be returned
    for (let i = 0; i < 100; i++) {
        // if cents not left
        if (cents <= 0) {
            return
        }

        // how many 50 cents must be returned
        if ((cents - cent_50) >= 0) {
            cents = cents - cent_50 + 0.0001;
            rest_c50++;
            continue;
        }
        // how many 25 cents must be returned
        if ((cents - cent_25) >= 0) {
            cents = cents - cent_25 + 0.0001;
            rest_c25++;
            continue;
        }
        // how many 10 cents must be returned
        if ((cents - cent_10) >= 0) {
            cents = cents - cent_10 + 0.0001;
            rest_c10++;
            continue;
        }
        // how many 05 cents must be returned
        if ((cents - cent_05) >= 0) {
            cents = cents - cent_05 + 0.0001;
            rest_c05++;
            continue;
        }
        // how many 01 cents must be returned
        if ((cents - cent_01) >= 0) {
            cents = cents - cent_01 + 0.0001;
            rest_c01++;
            continue;
        }
    }

    // show/return - rest/result
    // get result div
    let result = document.getElementById('rest');
    // reset previous result
    result.innerText = '';
    // show result
    result.innerHTML += `<p>Your rest: ${rest}</p>`;
    // show if there are cents to return
    if (dolars > 0) {
        result.innerHTML += `<p>${dolars} - dolars</p>`;
    }
    if (rest_c50 > 0) {
        result.innerHTML += `<p>${rest_c50} - 50 cents</p>`;
    }
    if (rest_c25 > 0) {
        result.innerHTML += `<p>${rest_c25} - 25 cents</p>`;
    }
    if (rest_c10 > 0) {
        result.innerHTML += `<p>${rest_c10} - 10 cents</p>`;
    }
    if (rest_c05 > 0) {
        result.innerHTML += `<p>${rest_c05} - 5 cents</p>`;
    }
    if (rest_c01 > 0) {
        result.innerHTML += `<p>${rest_c01} - 1 cents</p>`;
    }
}