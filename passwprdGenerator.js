document.addEventListener("DOMContentLoaded", function () {
    let generatePasswordBtn = document.getElementById("generatePasswordBtn");
    let passwordField = document.getElementById("password");

    // Function to generate a strong password
    function generatePassword(length = 12) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // Handle password generation
    generatePasswordBtn.addEventListener("click", function () {
        const newPassword = generatePassword(); // You can change the length if needed
        passwordField.value = newPassword; // Display the generated password in the input field
    });
});