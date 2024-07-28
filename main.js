// Banner
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
    // refreshBannerSlider = setInterval(()=> {bannernext.click()}, 3000);
}

bannerdots.forEach((li, key) => {
    li.addEventListener('click', function(){
        banneractive = key;
        reloadBannerSlider();
    })
})