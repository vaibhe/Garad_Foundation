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

// ====================================== FORMS SECTION ====================================
// const Bothforms = document.querySelector("form"),
//      nextBtn = Bothforms.querySelector(".nextBtn"),
//      backBtn = Bothforms.querySelector(".backBtn"),
//      allInput = Bothforms.querySelectorAll(".first input");


// nextBtn.addEventListener("click", () => {
//     allInput.forEach(input => {
//         if (input.value != "") {
//             Bothforms.classList.add('secActive');
//         } else {
//             Bothforms.classList.remove('secActive');
//         }
//     })
// })

// backBtn.addEventListener("click", () => Bothforms.classList.remove('secActive'));

// const scriptURL = '<SCRIPT URL>'
// const form = document.forms['submit-to-google-sheet']

//   form.addEventListener('submit', e => {
//     e.preventDefault()
//     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//       .then(response => console.log('Success!', response))
//       .catch(error => console.error('Error!', error.message))
//   })

// ====================================== FORMS SECTION ====================================
const Bothforms = document.querySelector("form"),
      nextBtn = Bothforms.querySelector(".nextBtn"),
      backBtn = Bothforms.querySelector(".backBtn"),
      firstInputs = Bothforms.querySelectorAll(".first input, .first select"),
      secondInputs = Bothforms.querySelectorAll(".second input, .second select"),
      submitButton = Bothforms.querySelector(".submit"),
      submitText = Bothforms.querySelector(".submit-text"),
      successPopup = document.getElementById("successPopup"),
      progressBar = document.getElementById("progressBar"),
      closePopup = document.getElementById("closePopup");

const scriptURL = '<SCRIPT URL>';
const form = document.forms['submit-to-google-sheet'];

// Validation patterns
const patterns = {
    text: /^[A-Za-z\s]+$/,
    url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    number: /^\d{10}$/, // Exactly 10 digits for Contact Person Number
    date: /^\d{4}-\d{2}-\d{2}$/,
    address: /^[\w\s.,'-]+$/ // Allows text, numbers, and special characters
};

// Validation function
function validateInput(input) {
    let isValid = false;
    let value = input.value.trim();
    let name = input.getAttribute("name");

    if (name === "Organization Name" || name === "Contact Person Name" || name === "Country" || 
        name === "Organization Type" || name === "Type of Partnership" || name === "Specific Areas of Interest" || 
        name === "Reason for Interest in Partnership" || name === "Mission and Vision" || 
        name === "Key Achievements/Projects" || name === "Target Beneficiaries/Communities" || 
        name === "Authorized Signature" || name === "Any Other Relevant Details") {
        isValid = patterns.text.test(value);
    } else if (name === "Organization Website" || name === "Any Relevant Certifications/Accreditations" || 
               name === "Attachments (Project Proposals, Brochures, etc.)") {
        isValid = patterns.url.test(value);
    } else if (name === "Contact Person Email") {
        isValid = patterns.email.test(value);
    } else if (name === "Contact Person Number") {
        isValid = patterns.number.test(value); // Validates exactly 10 digits
    } else if (name === "Organization Address") {
        isValid = patterns.address.test(value); // Allows text, numbers, and special characters
    } else if (name === "Year Established") {
        isValid = value !== ""; // Allows both text and numbers
    } else if (name === "Date of Submission") {
        isValid = patterns.date.test(value);
    } else if (name === "Proposed Partnership Duration" || name === "Terms and Conditions Agreement" || 
               name === "Terms and Privacy Policy") {
        isValid = value !== "";
    }

    return isValid;
}

// Function to validate all inputs on the current form section
function validateForm(inputs) {
    for (let input of inputs) {
        if (!validateInput(input)) {
            alert(`Invalid input in ${input.getAttribute("name")}`);
            input.focus();
            return false;
        }
    }
    return true;
}

// Handle Next button click
nextBtn.addEventListener("click", () => {
    if (validateForm(firstInputs)) {
        Bothforms.classList.add('secActive');
    }
});

// Handle Back button click
backBtn.addEventListener("click", () => Bothforms.classList.remove('secActive'));

// Handle form submission
form.addEventListener('submit', e => {
    e.preventDefault();

    if (validateForm(secondInputs)) {
        const termsAgreement = form.querySelector("select[name='Terms and Conditions Agreement']").value;
        const privacyConsent = form.querySelector("select[name='Terms and Privacy Policy']").value;

        if (termsAgreement === "yes" && privacyConsent === "yes") {
            submitText.textContent = "Submitting...";
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    console.log('Success!', response);
                    showSuccessPopup();
                    form.reset();
                    Bothforms.classList.remove('secActive'); // Go back to the first form
                    submitText.textContent = "Submit";
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    submitText.textContent = "Submit";
                });
        } else {
            alert("Please agree to the Terms and Conditions and Privacy Policy to submit the form.");
        }
    }
});

// Show success popup with progress bar
function showSuccessPopup() {
    successPopup.style.display = "block";
    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            successPopup.style.display = "none";
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 30); // Adjust the speed as needed
}

// Close popup manually
closePopup.addEventListener("click", () => {
    successPopup.style.display = "none";
});


