const changeBackground = document.getElementById("changeBackground");

function updateTheme() {
    if (localStorage.getItem("sattiTheme") === "dark") {
        document.body.classList.add("dark-theme");
        changeBackground.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark-theme");
        changeBackground.textContent = "Dark Mode";
    }
}

if (changeBackground) {
    updateTheme();

    changeBackground.addEventListener("click", function() {
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("sattiTheme", "standard");
        } else {
            localStorage.setItem("sattiTheme", "dark");
        }

        updateTheme();
    });
}