/*============================== SHOW MENU =================================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// MENU SHOW
// Validate if constant exists
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

// MENU HIDDEN
// Validate if constant exists
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header')
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)

/* ============================ SHOW SCROLL UP ======================= */
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup
       this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                                               : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


// ======================================== FORMS SECTION ==========================================
const formsBoth = document.querySelector("form"),
    nextBtn = formsBoth.querySelector(".nextBtn"),
    backBtn = formsBoth.querySelector(".backBtn"),
    allInput = formsBoth.querySelectorAll(".first input");

nextBtn.addEventListener("click", () => {
    let allFilled = true;
    allInput.forEach(input => {
        if (input.value === "") {
            allFilled = false;
        }
    });
    if (allFilled) {
        formsBoth.classList.add('secActive');
    } else {
        alert("Please fill in all the required fields.");
        formsBoth.classList.remove('secActive');
    }
});

backBtn.addEventListener("click", () => formsBoth.classList.remove('secActive'));

const scriptURL = 'https://script.google.com/macros/s/AKfycbz5VHx0VDllqihis57fN6MMavoCX4dQkpDZWOyeBbgG5vhfowpqt82UflTkvVO7HWDgyA/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
});

