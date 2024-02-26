// Selecting DOM elements
const download = document.querySelector(".download"); // Download link
const dark = document.querySelector(".dark"); // Dark color input
const light = document.querySelector(".light"); // Light color input
const qrContainer = document.querySelector("#qr-code"); // QR code container
const qrText = document.querySelector(".qr-text"); // QR text input
const shareBtn = document.querySelector(".share-btn"); // Share button
const sizes = document.querySelector(".sizes"); // Size selection input

// Event listeners
dark.addEventListener("input", handleDarkColor); // Dark color input event
light.addEventListener("input", handleLightColor); // Light color input event
qrText.addEventListener("input", handleQRText); // QR text input event
sizes.addEventListener("change", handleSize); // Size selection input event
shareBtn.addEventListener("click", handleShare); // Share button event

// Default values
const defaultUrl = "#"; // Default URL
let colorLight = "#fff", // Light color
    colorDark = "#000", // Dark color
    text = defaultUrl, // QR text
    size = 300; // QR code size

// Event handler functions

// Dark color change handler
function handleDarkColor(e) {
    colorDark = e.target.value;
    generateQRCode();
}

// Light color change handler
function handleLightColor(e) {
    colorLight = e.target.value;
    generateQRCode();
}

// QR text change handler
function handleQRText(e) {
    const value = e.target.value;
    text = value;
    if (!value) {
        text = defaultUrl;
    }
    generateQRCode();
}

// Generate QR code
async function generateQRCode() {
    qrContainer.innerHTML = ""; // Clear previous QR code
    new QRCode("qr-code", { // Generate new QR code
        text,
        height: size,
        width: size,
        colorLight,
        colorDark,
    });
    download.href = await resolveDataUrl(); // Set download link
}

// Share QR code
async function handleShare() {
    setTimeout(async () => {
        try {
            const base64url = await resolveDataUrl(); // Get data URL
            const blob = await (await fetch(base64url)).blob(); // Convert to blob
            const file = new File([blob], "QRCode.png", { // Create file object
                type: blob.type,
            });
            await navigator.share({ // Share file
                files: [file],
                title: text,
            });
        } catch (error) {
            alert("Your browser doesn't support sharing."); // Handle sharing error
        }
    }, 100);
}

// Size change handler
function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

// Resolve data URL for QR code
function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if (img.currentSrc) { // Use currentSrc if available
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas"); // Use canvas toDataURL
            resolve(canvas.toDataURL());
        }, 50);
    });
}

// Initial QR code generation
generateQRCode();