const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("userEmail").value.trim();
        const password = document.getElementById("userPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");
        const formMessage = document.getElementById("formMessage");

        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";
        formMessage.textContent = "";

        let isValid = true;

        if (name === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            isValid = false;
        } else if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        if (password === "") {
            passwordError.textContent = "Please enter a password.";
            isValid = false;
        } else if (password.length < 8) {
            passwordError.textContent =
                "Password must contain at least 8 characters.";
            isValid = false;
        }

        if (confirmPassword === "") {
            confirmError.textContent = "Please confirm your password.";
            isValid = false;
        } else if (password !== confirmPassword) {
            confirmError.textContent = "Passwords do not match.";
            isValid = false;
        }

        if (isValid) {
            formMessage.style.color = "green";
            formMessage.textContent =
                "Success! All fields have been checked.";
        } else {
            formMessage.style.color = "red";
            formMessage.textContent =
                "Please correct the errors above.";
        }
    });
}
