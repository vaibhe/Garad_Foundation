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



/* ============================ IMAGE GALLERY SECTION ===================================== */
const imagesWrapper = document.querySelector(".images");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".uil-times");
const downloadImgBtn = lightBox.querySelector(".uil-import");

const downloadImg = (img = null) => { //imgURL

    const imgURL = img || downloadImgBtn.getAttribute("data-img");
    // Converting received img to blob, creating its download link, & downloading it
    fetch(imgURL).then(res => res.blob()).then(file => {
            const a = document.createElement("a");
            const filename = imgURL.substring(imgURL.lastIndexOf('/') + 1); // Extract filename from the image URL
            const url = URL.createObjectURL(new Blob([file], { type: 'image/jpeg' })); // Ensuring correct MIME type
            a.href = url;
            a.download = filename; // Set the extracted filename as the download name
            a.click();
            URL.revokeObjectURL(url); // Clean up the URL.createObjectURL reference
        })
        .catch(() => alert("Failed to download image!"));
}

const showLightbox = (img) => { //(name, img)
    // Showing lightbox and setting img source, name and button attribute
    const imgElement = lightBox.querySelector("img");

    imgElement.src = img;
    // lightBox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
    lightBox.classList.remove("show");
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", () => downloadImg());
