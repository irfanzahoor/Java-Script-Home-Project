// Battery ki initializatoin
initBattery();

// Battery ki initializatoin function
function initBattery() {
    // DOM se battery ki liquid, status, aur percentage ko select karna
    const batteryLiquid = document.querySelector(".Bliquid");
    const batteryStatus = document.querySelector(".Bstatus");
    const Bpercentage = document.querySelector(".Bpercentage");

    // Battery ki status aur maqdar ko get karne ke liye navigator.getBattery() ka istemal
    navigator.getBattery().then((batt) => {
        // Battery ki update function
        updateBattery = () => {
            // Battery ki level ko percentage mein convert karna
            let level = Math.floor(batt.level * 100);
            Bpercentage.innerHTML = level + "%"; // Percentage ko UI mein update karna
            batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`; // Liquid ki height ko update karna

            // Battery ki mukhtalif halat ke mutabiq UI ko update karna
            if (level == 100) {
                batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
                batteryLiquid.style.height = "103%";
            } else if (level <= 20 & !batt.charging) {
                batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`;
            } else if (batt.charging) {
                batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`;
            } else {
                batteryStatus.innerHTML = "";
            }

            // Battery level ke mutabiq gradient colors apply karna
            if (level <= 20) {
                batteryLiquid.classList.add("gradient-color-red");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            } else if (level <= 48) {
                batteryLiquid.classList.add("gradient-color-orange");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow");
            } else if (level <= 80) {
                batteryLiquid.classList.add("gradient-color-yellow");
                batteryLiquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-red");
            } else {
                batteryLiquid.classList.add("gradient-color-green");
                batteryLiquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow");
            }
        }

        // Battery ki status aur level mein tabdeeli ki event listeners lagana
        updateBattery();
        batt.addEventListener("chargingchange", () => { updateBattery() });
        batt.addEventListener("levelchange", () => { updateBattery });
    })
}