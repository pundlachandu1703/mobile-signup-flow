/* =========================================
   NOVA MOBILE SIGNUP FLOW
========================================= */


/* Current Step */

let currentStep = 1;


/* Total signup steps */

const totalSteps = 5;


/* User Data */

const userData = {

    name: "",

    email: "",

    password: "",

    interests: [],

    country: "",

    city: ""

};



/* =========================================
   ELEMENTS
========================================= */

const progressBar =
    document.getElementById(
        "progressBar"
    );


const stepNumber =
    document.getElementById(
        "stepNumber"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


const dots =
    document.querySelectorAll(
        ".dot"
    );



/* =========================================
   UPDATE UI
========================================= */

function updateUI() {


    /* Hide all screens */

    document
        .querySelectorAll(".screen")
        .forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
        );


    /* Show current screen */

    const screen =
        document.getElementById(
            `screen${currentStep}`
        );


    if (screen) {

        screen.classList.add(
            "active"
        );

    }


    /* Progress */

    const percentage =
        (currentStep / totalSteps)
        * 100;


    progressBar.style.width =
        `${percentage}%`;


    stepNumber.textContent =
        `${currentStep}/${totalSteps}`;


    /* Dots */

    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentStep - 1
            );

        }
    );


    /* Back button */

    if (currentStep === 1) {

        backButton.style.visibility =
            "hidden";

    }

    else {

        backButton.style.visibility =
            "visible";

    }

}



/* =========================================
   NEXT STEP
========================================= */

function nextStep() {

    if (
        currentStep <
        totalSteps
    ) {

        currentStep++;

        updateUI();

    }

}



/* =========================================
   PREVIOUS STEP
========================================= */

backButton.addEventListener(
    "click",
    function() {


        if (
            currentStep > 1
        ) {

            currentStep--;

            updateUI();

        }

    }
);



/* =========================================
   NAME VALIDATION
========================================= */

function validateName() {


    const input =
        document.getElementById(
            "nameInput"
        );


    const error =
        document.getElementById(
            "nameError"
        );


    const name =
        input.value.trim();


    if (name.length < 2) {

        error.textContent =
            "Please enter your name.";

        input.focus();

        return;

    }


    error.textContent = "";


    userData.name =
        name;


    nextStep();

}



/* =========================================
   EMAIL VALIDATION
========================================= */

function validateAccount() {


    const emailInput =
        document.getElementById(
            "emailInput"
        );


    const passwordInput =
        document.getElementById(
            "passwordInput"
        );


    const emailError =
        document.getElementById(
            "emailError"
        );


    const email =
        emailInput.value.trim();


    const password =
        passwordInput.value;


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(email)
    ) {

        emailError.textContent =
            "Please enter a valid email address.";

        emailInput.focus();

        return;

    }


    if (
        password.length < 8
    ) {

        alert(
            "Password must contain at least 8 characters."
        );

        passwordInput.focus();

        return;

    }


    emailError.textContent = "";


    userData.email =
        email;


    userData.password =
        password;


    nextStep();

}



/* =========================================
   PASSWORD VISIBILITY
========================================= */

function togglePassword() {


    const input =
        document.getElementById(
            "passwordInput"
        );


    if (
        input.type === "password"
    ) {

        input.type =
            "text";

    }

    else {

        input.type =
            "password";

    }

}



/* =========================================
   PASSWORD STRENGTH
========================================= */

document
    .getElementById(
        "passwordInput"
    )
    .addEventListener(
        "input",
        function() {


            const password =
                this.value;


            const bar =
                document.getElementById(
                    "strengthBar"
                );


            if (
                password.length === 0
            ) {

                bar.style.width =
                    "0%";

                return;

            }


            let strength = 0;


            if (
                password.length >= 8
            ) {

                strength++;

            }


            if (
                /[A-Z]/.test(password)
            ) {

                strength++;

            }


            if (
                /[0-9]/.test(password)
            ) {

                strength++;

            }


            if (
                /[^A-Za-z0-9]/.test(password)
            ) {

                strength++;

            }


            bar.style.width =
                `${strength * 25}%`;



            if (strength <= 1) {

                bar.style.background =
                    "#ef4444";

            }

            else if (strength <= 2) {

                bar.style.background =
                    "#f59e0b";

            }

            else {

                bar.style.background =
                    "#22c55e";

            }

        }
    );



/* =========================================
   INTEREST SELECTION
========================================= */

document
    .querySelectorAll(
        ".interest"
    )
    .forEach(
        button => {


            button.addEventListener(
                "click",
                function() {


                    const interest =
                        this.dataset.interest;


                    this.classList.toggle(
                        "selected"
                    );


                    if (
                        userData.interests
                        .includes(interest)
                    ) {


                        userData.interests =
                            userData.interests.filter(
                                item =>
                                    item !== interest
                            );

                    }

                    else {


                        userData.interests.push(
                            interest
                        );

                    }

                }
            );

        }
    );



/* =========================================
   INTEREST VALIDATION
========================================= */

function validateInterests() {


    const error =
        document.getElementById(
            "interestError"
        );


    if (
        userData.interests.length === 0
    ) {

        error.textContent =
            "Please select at least one interest.";

        return;

    }


    error.textContent = "";


    nextStep();

}



/* =========================================
   COMPLETE SIGNUP
========================================= */

function completeSignup() {


    const country =
        document.getElementById(
            "countryInput"
        ).value;


    const city =
        document.getElementById(
            "cityInput"
        ).value.trim();


    const terms =
        document.getElementById(
            "termsInput"
        );


    const error =
        document.getElementById(
            "locationError"
        );


    if (!country) {

        error.textContent =
            "Please select your country.";

        return;

    }


    if (!city) {

        error.textContent =
            "Please enter your city.";

        return;

    }


    if (!terms.checked) {

        error.textContent =
            "Please accept the Terms and Privacy Policy.";

        return;

    }


    error.textContent = "";


    userData.country =
        country;


    userData.city =
        city;


    /* Save locally */

    localStorage.setItem(
        "novaUser",
        JSON.stringify(userData)
    );


    showSuccess();

}



/* =========================================
   SUCCESS SCREEN
========================================= */

function showSuccess() {


    document
        .querySelectorAll(".screen")
        .forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
        );


    document
        .getElementById(
            "successScreen"
        )
        .classList.add(
            "active"
        );


    progressBar.style.width =
        "100%";


    stepNumber.textContent =
        "✓";


    backButton.style.visibility =
        "hidden";


    dots.forEach(
        dot => {

            dot.classList.add(
                "active"
            );

        }
    );


    document
        .getElementById(
            "userName"
        )
        .textContent =
        userData.name;


    document
        .getElementById(
            "summary"
        )
        .innerHTML = `

            <strong>📧 Email</strong>
            ${userData.email}

            <br>

            <strong>📍 Location</strong>
            ${userData.city},
            ${userData.country}

            <br>

            <strong>🎯 Interests</strong>
            ${userData.interests.join(", ")}

        `;

}



/* =========================================
   RESTART
========================================= */

function restartSignup() {


    currentStep = 1;


    userData.name = "";

    userData.email = "";

    userData.password = "";

    userData.interests = [];

    userData.country = "";

    userData.city = "";


    document
        .getElementById(
            "nameInput"
        ).value = "";


    document
        .getElementById(
            "emailInput"
        ).value = "";


    document
        .getElementById(
            "passwordInput"
        ).value = "";


    document
        .getElementById(
            "cityInput"
        ).value = "";


    document
        .getElementById(
            "countryInput"
        ).value = "";


    document
        .getElementById(
            "termsInput"
        ).checked = false;


    document
        .querySelectorAll(
            ".interest"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "selected"
                );

            }
        );


    updateUI();

}



/* =========================================
   START
========================================= */

updateUI();