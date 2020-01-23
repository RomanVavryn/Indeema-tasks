// * Реалізувати анімацію за допомогою CSS3 при відкриванні і закриванні
// модального вікна (плавна поява і плавне закривання вікна) 
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

// button 
let open_button = document.createElement('button');
// add text & styling
open_button.innerText = 'Open Modal Window';
open_button.style.fontFamily = 'Roboto';
open_button.style.fontSize = '4vh'; // for responsive text
// button size
open_button.style.width = '20vh';
open_button.style.height = '15vh';
//  box styling
open_button.style.backgroundColor = '#FF7F50';
open_button.style.border = '1px solid black';
open_button.style.color = '#000';
open_button.style.borderRadius = '5%';
open_button.style.boxShadow = '0px 0px 7px 0px #000';
open_button.style.cursor = 'pointer';
open_button.style.padding = '0';

// add button to wrapper
container.append(open_button)

// button node 
let open_btn = container.lastChild;

// add event listener
open_btn.addEventListener('mouseover', btnHoverEffectOn)
open_btn.addEventListener('mouseout', btnHoverEffectOff)
open_btn.addEventListener('mousedown', btnActivEffectOn)
open_btn.addEventListener('mouseup', btnActiveffectOff)

// button hover effect on
function btnHoverEffectOn(item) {
    let btn = item.target;
    btn.style.backgroundColor = '#00FF00';
    btn.style.color = '#fff';
}

// button hover effect off
function btnHoverEffectOff(item) {
    let btn = item.target;
    btn.style.backgroundColor = '#FF7F50';
    btn.style.color = '#000';
}

// btn mouse down effect on
function btnActivEffectOn(item) {
    let btn = item.target;
    btn.style.backgroundColor = '#8B0000';
    btn.style.color = '#FFD700';
}

// btn mouse down effect off + open modal window
function btnActiveffectOff(item) {
    let btn = item.target;
    btn.style.backgroundColor = '#FF7F50';
    btn.style.color = '#000';

    // open modal window
    openModalWindow(item);
}

// add modal window to container
function openModalWindow(item) {

    let modalWindow = document.createElement('div');
    // position
    modalWindow.style.position = 'absolute';
    modalWindow.style.top = '30vh';
    modalWindow.style.right = '30vh';
    // size
    modalWindow.style.height = '35vh';
    modalWindow.style.width = '35vh';
    modalWindow.style.border = '1px solid #000';
    // else styles
    modalWindow.style.backgroundColor = randomColor();
    modalWindow.style.boxShadow = '0px 0px 7px 0px #000';
    modalWindow.style.display = 'flex';
    modalWindow.style.flexDirection = 'column';

    // random bg color for modal window
    function randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // close (delete) modal window -----
    // button
    let close_btn = document.createElement('button');
    // add text & styling
    close_btn.innerText = 'close';
    close_btn.style.fontFamily = 'Roboto';
    close_btn.style.fontSize = '2vh'; // for responsive text
    // button size
    close_btn.style.width = '5vh';
    close_btn.style.height = '5vh';
    // position
    close_btn.style.margin = '0.5vh';
    //  box styling
    close_btn.style.backgroundColor = '#fff';
    close_btn.style.border = '1px solid black';
    close_btn.style.color = '#000';
    close_btn.style.borderRadius = '5%';
    close_btn.style.boxShadow = '0px 0px 7px 0px #000';
    close_btn.style.cursor = 'pointer';
    close_btn.style.padding = '0';

    close_btn.addEventListener('click', closeModalWindow)

    // delete parent node from dom 
    function closeModalWindow(item) {
        item.path[1].remove()
    }
    // close (delete) modal window end -----

    // add close btn to modal window
    modalWindow.append(close_btn);

    // text for modal window
    let modalWindowText = document.createElement('p');
    modalWindowText.innerText = 'Drag me';
    // style
    modalWindowText.style.margin = '0';
    modalWindowText.style.fontFamily = 'Roboto';
    modalWindowText.style.fontSize = '4vh';

    // add text to modal window 
    modalWindow.append(modalWindowText);


    // drag & drop -----
    modalWindow.setAttribute('draggable', 'true');
    // need for remember mouse over item position
    let mOffsetY;
    let mOffsetX;

    modalWindow.addEventListener('dragstart', dragStart);
    modalWindow.addEventListener('dragend', dragend);

    // remember  mouse over item position
    function dragStart(item) {
        mOffsetY = item.offsetY;
        mOffsetX = item.offsetX;
    }

    // drop item
    function dragend(item) {
        let elem = item.target;
        elem.style.top = (item.pageY - mOffsetY) + 'px';
        elem.style.left = (item.pageX - mOffsetX) + 'px';
    }
    //  drag & drop end ----- 

    // add to container
    container.append(modalWindow);
}