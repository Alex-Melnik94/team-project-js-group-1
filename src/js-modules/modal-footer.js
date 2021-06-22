const popupLinks =document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding')


// popupLinks.addEventListener('click', function (options) {
//     const modal = document.createElement('div')
//     modal.classList.add('wrapper');
//     modal.insertAdjacentHTML('afterbegin', 
//     )

// })


let unlock =true;

const timeout = 800;

if (popupLinks.length > 0) {
    for(let i =0; i < popupLinks.length; i += 1) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click',function(event) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        event.preventDefault();
    });
}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i += 1) {
        const el =popupCloseIcon[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
}

function popupOpen (curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        
        if(popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        });

    }
}

function popupClose (popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock () {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    for (let i = 0; i < lockPadding.length; i += 1) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');


    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function() {
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;

    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});


