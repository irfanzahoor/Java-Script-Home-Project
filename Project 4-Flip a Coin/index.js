// Coin flip game

// Initialize variables to keep track of heads and tails counts
let heads = 0;
let tails = 0;

// Select the coin element from the DOM
let coin = document.querySelector(".coin");

// Select the flip button and reset button from the DOM
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

// Event listener for the flip button
flipBtn.addEventListener("click", () => {
    // Generate a random number (0 or 1) to simulate a coin flip
    let i = Math.floor(Math.random() * 2);

    // Reset the animation style to none
    coin.style.animation = "none";

    // Apply animation based on the random number generated
    if (i) {
        setTimeout(function () {
            coin.style.animation = "spin-heads 3s forwards";
        }, 100);
        heads++; // Increment heads count
    } else {
        setTimeout(function () {
            coin.style.animation = "spin-tails 3s forwards";
        }, 100);
        tails++; // Increment tails count
    }

    // Update statistics after 3 seconds
    setTimeout(updateStats, 3000);

    // Disable the flip button temporarily
    disableButton();
});

// Function to update the displayed statistics
function updateStats() {
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

// Function to disable the flip button temporarily
function disableButton() {
    flipBtn.disabled = true;
    setTimeout(function () {
        flipBtn.disabled = false;
    }, 3000);
}

// Event listener for the reset button
resetBtn.addEventListener("click", () => {
    // Reset the animation style to none
    coin.style.animation = "none";

    // Reset heads and tails counts
    heads = 0;
    tails = 0;

    // Update statistics
    updateStats();
})