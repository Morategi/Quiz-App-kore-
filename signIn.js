document.addEventListener("DOMContentLoaded", function () {
    let signupBtn = document.getElementById("signupBtn");
    let signinBtn = document.getElementById("signinBtn");
    let title = document.getElementById("title");
    let nameField = document.getElementById("nameField");
    let emailField = document.querySelector(".input-field input[type='email']");
    let passwordField = document.querySelector(".input-field input[type='password']");


    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    
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

    // Generate a password before the user signs up
    const generatedPassword = generatePassword();
    passwordField.value = generatedPassword;

    // Redirect to game if the user is already signed in
    if (localStorage.getItem("username")) {
        window.location.href = "/game.html";
    }

    // Switch to Sign-In view
    signinBtn.onclick = function () {
        nameField.style.maxHeight = "0"; // Hide name field during sign-in
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");

        // Allow user to enter their password when signing in
        passwordField.removeAttribute("readonly");
        passwordField.value = password;  
    };

    // Switch to Sign-Up view
    signupBtn.onclick = function () {
        nameField.style.maxHeight = "60px"; // Show name field during sign-up
        title.innerHTML = "Sign Up";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");

        // Generate and display a password only when the user signs up
        passwordField.value = "";
        passwordField.setAttribute("readonly", "true"); // Make it readonly until signup
    };

    // Handle Sign-Up (Store User and Redirect)
    signupBtn.addEventListener("click", function () {
        const username = nameField.querySelector("input").value.trim();
        const email = emailField.value.trim();

        if (!username || !email) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        

        // Check if user already exists
        if (localStorage.getItem("email") === email) {
            alert("You already have an account. Please sign in.");
            return;
        }

        // Generate and store a password
        const generatedPassword = generatePassword();
        passwordField.value = generatedPassword;

        // Store user details
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("password", generatedPassword);

        alert(`✅ Welcome, ${username}! Your password is: ${generatedPassword}. Please save it.`);
        window.location.href = "/game.html"; // Redirect to game after sign-up
    });

    // Handle Sign-In (Allow user to log in with stored password)
    signinBtn.addEventListener("click", function () {
        const email = emailField.value.trim();
        const password = passwordField.value.trim();

        console.log('Email entered:', email);
        console.log('Password entered:', generatePassword);

        if (email === "" || password === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Retrieve stored credentials
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        console.log('Stored Email:', storedEmail);
        console.log('Stored Password:', storedPassword);


        // Check if credentials match
        if (storedEmail !== email || storedPassword !== password) {
            alert("Invalid email or password. Please try again.");
            return;
        }

        alert("✅ You have successfully signed in.");
        window.location.href = "/game.html"; // Redirect to game after sign-in
        startGame();
    });
});
// document.addEventListener("DOMContentLoaded", function () {
//     let signupBtn = document.getElementById("signupBtn");
//     let signinBtn = document.getElementById("signinBtn");
//     let title = document.getElementById("title");
//     let nameField = document.getElementById("nameField");
//     let emailField = document.querySelector(".input-field input[type='email']");
//     let passwordField = document.querySelector(".input-field input[type='password']");

//     // Redirect to game if user is already signed in
//     if (localStorage.getItem("username")) {
//         window.location.href = "/game.html";
//     }

//     // Switch to Sign-In view
//     signinBtn.onclick = function () {
//         nameField.style.maxHeight = "0";
//         title.innerHTML = "Sign In";
//         signupBtn.classList.add("disable");
//         signinBtn.classList.remove("disable");
//     };

//     // Switch to Sign-Up view
//     signupBtn.onclick = function () {
//         nameField.style.maxHeight = "60px";
//         title.innerHTML = "Sign Up";
//         signupBtn.classList.remove("disable");
//         signinBtn.classList.add("disable");
//     };

//     // Handle Sign Up (Store User and Redirect)
//     signupBtn.addEventListener("click", function () {
//         const username = nameField.querySelector("input").value.trim();
//         const email = emailField.value.trim();
//         const password = passwordField.value.trim();

//         if (!username || !email || !password) {
//             alert("Please fill in all fields.");
//             return;
//         }

//         localStorage.setItem("username", username);
//         localStorage.setItem("email", email);
//         localStorage.setItem("password", password);

//         alert(`Welcome, ${username}! You have successfully signed up.`);
//         window.location.href = "/game.html"; // Redirect to game after sign-up
//     });

// });