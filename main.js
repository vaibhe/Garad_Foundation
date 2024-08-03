// Dynamic Numbers
let valueDisplays = document.querySelectorAll(".numbers-num");
let interval = 5000;

valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function (){
        startValue += 1;
        valueDisplay.textContent = startValue;
        if(startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
});

/*=============== SHOW MENU ===============*/
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

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')  

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }      
    })
}
window.addEventListener('scroll', scrollActive)


/* ============================ Banner ============================= */
let bannerlist = document.querySelector('.banner-slider .banner-list');
let banneritems = document.querySelectorAll('.banner-slider .banner-list .banner-item');
let bannerdots = document.querySelectorAll('.banner-slider .banner-dots li');
let bannerprev = document.getElementById('banner-prev');
let bannernext = document.getElementById('banner-next');

let banneractive = 0;
let bannerLengthItems = banneritems.length - 1;

bannernext.onclick = function(){
    if(banneractive + 1 > bannerLengthItems){
        banneractive = 0;
    } else {
        banneractive = banneractive + 1;
    }
    reloadBannerSlider();
}

bannerprev.onclick = function(){
    if(banneractive - 1 < 0){
        banneractive = bannerLengthItems;
    }else {
        banneractive = banneractive - 1;
    }
    reloadBannerSlider();
}

let refreshBannerSlider = setInterval(()=> {bannernext.click()}, 5000);

function reloadBannerSlider(){
    let bannercheckLeft = banneritems[banneractive].offsetLeft;
    bannerlist.style.left = -bannercheckLeft + 'px';

    let bannerLastActiveDot = document.querySelector('.banner-slider .banner-dots li.banner-active');
    bannerLastActiveDot.classList.remove('banner-active');
    bannerdots[banneractive].classList.add('banner-active');
    clearInterval(refreshBannerSlider);
    refreshBannerSlider = setInterval(()=> {bannernext.click()}, 3000);
}

bannerdots.forEach((li, key) => {
    li.addEventListener('click', function(){
        banneractive = key;
        reloadBannerSlider();
    })
})

// footer image (1440*1009)
