const accordionButtons = document.querySelectorAll(".accordion-button");

accordionButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const content = button.nextElementSibling;
        playSound("click");

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});