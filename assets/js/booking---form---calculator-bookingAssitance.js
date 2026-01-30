// 1. Toggle Sections & Update Live Status
function toggleService() {
    const type = document.getElementById("service-type").value;
    const logPanel = document.getElementById("logistics-panel");
    const autoPanel = document.getElementById("autos-panel");
    const statusText = document.getElementById("status-text");

    // Reset visibility
    logPanel.classList.add("d-none");
    autoPanel.classList.add("d-none");

    if (type === "logistics") {
        logPanel.classList.remove("d-none");
        statusText.innerText = "Calculating Shipping Route...";
    } else if (type === "autos") {
        autoPanel.classList.remove("d-none");
        statusText.innerText = "Checking Dealer Inventory...";
    }
}

// 2. Validation & Sending
function validateAndSend() {
    const type = document.getElementById("service-type").value;
    const errorBox = document.getElementById("error-msg");
    let isValid = true;
    let message = "";
    const phone = "2349034277995"; // Your Client's Number

    // Hide error initially
    errorBox.classList.add("d-none");

    if (!type) {
        isValid = false;
    } else if (type === "logistics") {
        // Logistics Validation
        const from = document.getElementById("log-from").value;
        const to = document.getElementById("log-to").value;
        const weight = document.querySelector('input[name="weight"]:checked').value;
        const express = document.getElementById("express-delivery").checked ? "YES (Priority)" : "Standard";

        if (!from || !to) isValid = false;
        
        message = `*NEW WAYBILL REQUEST*%0A---------------------------%0A📍 *From:* ${from}%0A🏁 *To:* ${to}%0A⚖️ *Size:* ${weight}%0A🚀 *Express:* ${express}%0A---------------------------%0APlease provide a shipping quote.`;

    } else if (type === "autos") {
        // Autos Validation
        const action = document.getElementById("auto-action").value;
        const model = document.getElementById("auto-model").value;
        const price = document.getElementById("auto-price").value;

        if (!model || !price) isValid = false;

        message = `*AUTO ${action.toUpperCase()} INQUIRY*%0A---------------------------%0A🚘 *Vehicle:* ${model}%0A💰 *Budget/Price:* ₦${price}%0A🔄 *Action:* ${action}%0A---------------------------%0AI am interested in this deal.`;
    }

    // Final Check
    if (isValid) {
        // Add a "Sending..." effect
        document.getElementById("status-text").innerText = "Redirecting to WhatsApp...";
        setTimeout(() => {
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
        }, 1000);
    } else {
        // Show Error
        errorBox.classList.remove("d-none");
        
        // Shake animation for visual feedback
        const card = document.querySelector(".card");
        card.classList.add("animate__animated", "animate__shakeX");
        setTimeout(() => {
            card.classList.remove("animate__animated", "animate__shakeX");
        }, 1000);
    }
}

// Wait for the page to load, then connect the buttons
document.addEventListener("DOMContentLoaded", function() {
    
    // Connect the Dropdown
    const serviceSelect = document.getElementById("service-type");
    if (serviceSelect) {
        serviceSelect.addEventListener("change", toggleService);
    }

    // Connect the Submit Button
    // We need to give the button an ID first to find it easily
    const submitBtn = document.querySelector("button[type='button'].btn-primary"); 
    if (submitBtn) {
        submitBtn.addEventListener("click", validateAndSend);
    }
});