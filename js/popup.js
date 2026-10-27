const openPopup = document.getElementById("openPopup");
const closePopup = document.getElementById("closePopup");
const subscribePopup = document.getElementById("subscribePopup");
const subscribeForm = document.getElementById("subscribeForm");
const subscribeMessage = document.getElementById("subscribeMessage");

openPopup.addEventListener("click", function() {
    subscribePopup.style.display = "flex";
    playSound("click");
});

closePopup.addEventListener("click", function() {
    subscribePopup.style.display = "none";
});

subscribePopup.addEventListener("click", function(event) {
    if (event.target === subscribePopup) {
        subscribePopup.style.display = "none";
    }
});

subscribeForm.addEventListener("submit", function(event) {
    event.preventDefault();

    subscribeMessage.textContent = "Thank you for subscribing!";
    playSound("success");
    subscribeForm.reset();
});