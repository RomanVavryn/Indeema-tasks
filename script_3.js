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
tableDate.innerText = dateTime;
// Time -----

// Delete fn -----
// add listener for delete btn
addDeleteFnToBtn();

function addDeleteFnToBtn() {
    //  get all delete buttons
    let btnDeleteColection = document.getElementsByClassName('delete');
    // convert from htmlcolection to array
    let delBtn = [...btnDeleteColection];

    delBtn.map((item) => {
        item.onclick = deleteRow
    })

    //  delete row fn
    function deleteRow(item) {
        item.path[2].remove()
    }
}
// Delete fn -----

// edit row -----

// add listener for edit btn
addEditinFnToBtn();

function addEditinFnToBtn() {
    //  get all edit buttons
    let btnEditColection = document.getElementsByClassName('editbtn');
    // convert from htmlcolection to array
    let editBtn = [...btnEditColection];
    editBtn.map((item) => {
        item.onclick = editRow
    })
}

//  edit row fn
function editRow(item) {
    // remember key/value
    let elem_key = item.path[2].cells[0] // Key
    let elem_value = item.path[2].cells[1] // Value

    // remember key/value text
    let elem_key_text = elem_key.innerText;
    let elem_value_text = elem_value.innerText;

    // edit button disabled
    let currentBtn = item.target;
    currentBtn.setAttribute('disabled', '');

    // create & add inputs
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

            //  get new text
            let newText = item.target.value;

            // validation email
            // get valid key text
            let v1 = item.path[2].cells[0].firstChild.value; // valid in state editing (input)
            let v2 = item.path[2].cells[0].innerText; // valid in state normal (text)
            // if v1 === undefind 
            if (!v1) {
                v1 = v2;
            }
            // valid email?
            if (v1.toLowerCase() === 'email' || v1.toLowerCase() === 'e-mail') {
                // get valid email text
                let emailv1 = item.path[2].cells[1].firstChild.value;
                let emailv2 = item.path[2].cells[1].innerText;
                if (!emailv1) {
                    emailv1 = emailv2;
                }
                // if validation fails return (or not stop editing)
                if (!validateEmail(emailv1.trim())) {
                    return
                }
            }

            // validation fn
            function validateEmail(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }

            // add new text
            item.path[1].innerText = newText;
        }

        //  if editing done 
        if (item.path[2].cells[1].innerHTML.length < 40 && item.path[2].cells[0].innerHTML.length < 40) {
            // edit button (not) disabled 
            currentBtn.removeAttribute('disabled')
        }

    }

    // delete key/value text before adding input
    elem_key.innerText = '';
    elem_value.innerText = '';

    // add inputs
    elem_key.append(editInputKey);
    elem_value.append(editInputValue);
}
// edit row -----


// add row -----
//  get form elements
let add_key = document.getElementById('Key');
let add_value = document.getElementById('value');
let add_brn = document.getElementById('submit');

// get tablte elem
let add_table = document.getElementById('row-list');

// add btn listener
add_brn.addEventListener('click', addNewItem);

// add btn disabled
add_brn.setAttribute('disabled', '');
add_key.onkeyup = inputNotEmpty;
add_value.onkeyup = inputNotEmpty;

function inputNotEmpty() {

    // check if inputs are empty
    if (add_key.value.trim() === '' || add_value.value.trim() === '') {
        add_brn.setAttribute('disabled', '');
        return
    }

    // add button (not) disabled 
    add_brn.removeAttribute('disabled')
}

function addNewItem() {

    // check if inputs are empty
    if (add_key.value.trim() === '' || add_value.value.trim() === '') {
        return
    }

    //  create row structure
    let new_tr = document.createElement('tr');
    let new_th = document.createElement('th');
    let new_td = document.createElement('td');
    let new_td_btns = document.createElement('td')

    // add to tr - th tag with value 
    new_th.innerText = add_key.value;
    new_tr.append(new_th);
    // add to tr - td tag with value 
    new_td.innerText = add_value.value;
    new_tr.append(new_td);
    // add to tr - td with buttons 
    new_td_btns.setAttribute('class', 'btns');
    new_td_btns.innerHTML = '<td class="btns"><button class="editbtn">edit</button><button class="delete">del</button></td>';
    new_tr.append(new_td_btns);

    // add to table
    add_table.append(new_tr);

    // add/reset listeners
    addDeleteFnToBtn();
    addEditinFnToBtn();

    // clear inputs
    add_key.value = '';
    add_value.value = '';
}
// add row end-----