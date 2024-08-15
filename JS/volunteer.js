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
    allInput = formsBoth.querySelectorAll(".first input"),
    submitButton = formsBoth.querySelector('.submit-text'),
    successPopup = document.getElementById('successPopup'),
    closePopup = document.getElementById('closePopup'),
    progressBar = document.getElementById('progressBar');

// Utility function to validate text fields (no numbers allowed)
function validateText(input) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(input.value.trim());
}

// Utility function to validate number fields (only numbers allowed)
function validateNumber(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input.value.trim());
}

// Utility function to validate email format
function validateEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(input.value.trim());
}

// Utility function to validate phone numbers (exactly 10 digits)
function validatePhoneNumber(input) {
    return input.value.trim().length === 10 && validateNumber(input);
}

// Next button click event
nextBtn.addEventListener("click", () => {
    for (let input of allInput) {
        if (input.name === "Full Name" || input.name === "Emergency Contact Person" || input.name === "Relation") {
            if (!validateText(input)) {
                alert(`Please enter a valid ${input.name}. Only alphabets are allowed.`);
                return;
            }
        }
        if (input.name === "Email") {
            if (!validateEmail(input)) {
                alert('Please enter a valid email address.');
                return;
            }
        }
        if (input.name === "Mobile Number" || input.name === "Whatsapp Number" || input.name === "Emergency Phone Number") {
            if (!validatePhoneNumber(input)) {
                alert(`Please enter a valid ${input.name}. It must be exactly 10 digits.`);
                return;
            }
        }
        if (input.name === "Residential Address") {
            // No specific validation needed since it allows all characters
        }
    }

    // If all validations pass, move to the second form
    formsBoth.classList.add('secActive');
});

// Back button click event
backBtn.addEventListener("click", () => formsBoth.classList.remove('secActive'));

// Script URL for Google Sheets integration
const scriptURL = 'https://script.google.com/macros/s/AKfycbz5VHx0VDllqihis57fN6MMavoCX4dQkpDZWOyeBbgG5vhfowpqt82UflTkvVO7HWDgyA/exec';
const form = document.forms['submit-to-google-sheet'];

// Form submission event
form.addEventListener('submit', e => {
    e.preventDefault();

    // Change the button text to "Submitting..."
    submitButton.textContent = 'Submitting...';

    // Disable the submit button to prevent multiple submissions
    submitButton.closest('button').disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            console.log('Success!', response);

            // Reset the form
            form.reset();

            // Reset to the first step of the form
            formsBoth.classList.remove('secActive');

            // Reset the button text and enable the button again
            submitButton.textContent = 'Submit';
            submitButton.closest('button').disabled = false;

            // Show the success popup
            successPopup.style.display = 'block';

            // Initialize the progress bar width and timer
            let progressBarWidth = 100;
            const totalDuration = 3000;  // 3 seconds
            const interval = 50;         // Update every 50ms
            const decrement = (interval / totalDuration) * 100;

            // Decrease the width of the progress bar over time
            const countdownInterval = setInterval(() => {
                progressBarWidth -= decrement;
                if (progressBarWidth <= 0) {
                    progressBarWidth = 0;
                    clearInterval(countdownInterval);
                    successPopup.style.display = 'none';
                }
                progressBar.style.width = `${progressBarWidth}%`;
            }, interval);
        })
        .catch(error => {
            console.error('Error!', error.message);

            // Reset the button text and enable the button again
            submitButton.textContent = 'Submit';
            submitButton.closest('button').disabled = false;

            alert('There was an error submitting your form. Please try again.');
        });
});

// Close the popup when the user clicks on the 'x'
closePopup.addEventListener('click', () => {
    successPopup.style.display = 'none';
});




