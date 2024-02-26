// Selecting DOM elements
const lengthSlider = document.querySelector(".pass-length input"); // Slider for password length
const options = document.querySelectorAll(".option input"); // Checkboxes for password options
const copyIcon = document.querySelector(".input-box span"); // Icon for copying password
const passwordInput = document.querySelector(".input-box input"); // Input field displaying generated password
const passIndicator = document.querySelector(".pass-indicator"); // Indicator for password strength
const generateBtn = document.querySelector(".generate-btn"); // Button for generating password

// Character sets for password generation
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

// Function to generate a password
const generatePassword = () => {
    let staticPassword = "", // String to hold characters based on selected options
        randomPassword = "", // Final generated password
        excludeDuplicate = false, // Flag to exclude duplicate characters
        passLength = lengthSlider.value; // Password length

    // Iterating through options to build staticPassword and check for duplicate exclusion
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += `  ${staticPassword} `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    // Generating the random password based on staticPassword and other options
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    }
    // Displaying the generated password in the input field
    passwordInput.value = randomPassword;
}

// Function to update password strength indicator
const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

// Function to update slider and generate password
const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider(); // Calling the updateSlider function initially

// Function to copy the generated password to clipboard
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value); // Writing password to clipboard
    copyIcon.innerText = "check"; // Changing icon to checkmark temporarily
    copyIcon.style.color = "#4285f4"; // Changing icon color
    // Resetting icon and color after a delay
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

// Event listeners

// Click event for copying password
copyIcon.addEventListener("click", copyPassword);
// Input event for slider to update password
lengthSlider.addEventListener("input", updateSlider);
// Click event for generating new password
generateBtn.addEventListener("click", generatePassword);