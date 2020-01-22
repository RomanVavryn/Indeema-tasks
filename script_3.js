// Написати таблицю, де можна додавати дані через форму, редагувати дані
// і видаляти будь-який рядок (row). Таблиця повинна містити наступні
// поля: ім’я, прізвище, електронну адресу. Повинна бути валідація
// поля’’e-mail.’’ і дата створення має генеруватися автоматично.
// * Реалізувати можливість виділяти декілька рядків і видаляти їх.
'use strict';

// Time -----
// get current time
let today = new Date();
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); // Y-M-D
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(); // H-M-S
let dateTime = date + ' ' + time; // full time Y-M-D - H-M-S

// add time to table 
let tableDate = document.getElementById('dateTime');
tableDate.innerHTML = dateTime;
// Time -----

// Delete fn -----
//  get all delete buttons
let btnDeleteColection = document.getElementsByClassName('delete');
// convert from htmlcolection to array
let delBtn = [...btnDeleteColection];
// add listener for delete btn
delBtn.map((item) => {
    item.addEventListener('click', deleteRow)
})

//  delete row fn
function deleteRow(item) {
    item.path[2].remove()
}
// Delete fn -----

// edit row -----
//  get all edit buttons
let btnEditColection = document.getElementsByClassName('editbtn');
// convert from htmlcolection to array
let editBtn = [...btnEditColection];
// add listener for edit btn
editBtn.map((item) => {
    item.addEventListener('click', editRow)
})

//  edit row fn
function editRow(item) {
    // remember key/value
    let elem_key = item.path[2].cells[0] // Key
    let elem_value = item.path[2].cells[1] // Value

    // remember key/value text
    let elem_key_text = elem_key.innerHTML;
    let elem_value_text = elem_value.innerHTML;

    // edit button disabled on
    let currentBtn = item.target;
    currentBtn.setAttribute('disabled', '');

    // create inputs to add inside 
    let editInputKey = document.createElement('input');
    editInputKey.setAttribute('type', 'text');
    editInputKey.setAttribute('class', 'editing');
    editInputKey.setAttribute('value', elem_key_text);

    let editInputValue = document.createElement('input');
    editInputValue.setAttribute('type', 'text');
    editInputValue.setAttribute('class', 'editing');
    editInputValue.setAttribute('value', elem_value_text);

    // add event listener
    editInputKey.addEventListener('keypress', finEditing);
    editInputValue.addEventListener('keypress', finEditing);

    // finishing editing
    function finEditing(item) {
        if (item.key === 'Enter' && item.target.value.trim() !== '') {

            //  new text
            let newText = item.target.value;

            // add new text
            item.path[1].innerHTML = newText;
        }

        //  es
        if (item.path[2].cells[1].innerHTML.length < 40 && item.path[2].cells[0].innerHTML.length < 40) {
            // edit button disabled off
            currentBtn.removeAttribute('disabled')
        }

    }

    // reset key/value text
    elem_key.innerHTML = '';
    elem_value.innerHTML = '';

    // add inputs
    elem_key.append(editInputKey);
    elem_value.append(editInputValue);
}
// edit row -----