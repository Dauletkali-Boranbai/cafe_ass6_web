/* contact.js - reservation form sent with fetch (no page reload),
   "Are we open now?" button and reset button. */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const timeBtn = document.getElementById("timeBtn");
const timeResult = document.getElementById("timeResult");

const OPEN_HOUR = 10;   // cafe works from 10:00 ...
const CLOSE_HOUR = 24;  // ... until midnight

function showStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = "form-status " + type;
}

/* Callback style: sendReservation() does the request and then calls
   onSuccess(result) or onError(error) - the functions passed by the caller. */
function sendReservation(data, onSuccess, onError) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Server answered " + response.status);
            }
            return response.json();
        })
        .then(onSuccess)
        .catch(onError);
}

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // collect all fields into a plain object
        const data = Object.fromEntries(new FormData(contactForm).entries());

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        showStatus("Sending your request...", "info");

        sendReservation(
            data,
            function onSuccess(result) {
                showStatus(
                    "Thank you, " + data.name + "! Your request for " + data["visit-time"] +
                    " was sent (request #" + result.id + "). We will call you soon.",
                    "success"
                );
                contactForm.reset();
                playSound("success");
                submitBtn.disabled = false;
                submitBtn.textContent = "Book a Table";
            },
            function onError(error) {
                showStatus("Sorry, the request failed (" + error.message + "). Please try again.", "error");
                playSound("error");
                submitBtn.disabled = false;
                submitBtn.textContent = "Book a Table";
            }
        );
    });

    // Reset button clears every input with querySelectorAll + forEach
    resetBtn.addEventListener("click", function () {
        contactForm.querySelectorAll("input, textarea").forEach(function (field) {
            field.value = "";
        });
        showStatus("The form was cleared.", "info");
        playSound("click");
    });
}

/* Shows the current time and tells if the cafe is open (cafe time = Astana). */
if (timeBtn) {
    timeBtn.addEventListener("click", function () {
        const now = new Date();
        const yourTime = now.toLocaleTimeString();

        const astanaHour = Number(
            new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Almaty" }).format(now)
        );
        const astanaTime = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Almaty" });
        const isOpen = astanaHour >= OPEN_HOUR && astanaHour < CLOSE_HOUR;

        timeResult.textContent =
            "Your time: " + yourTime + " | Astana time: " + astanaTime + " — " +
            (isOpen ? "we are open now!" : "we are closed now (open 10:00–24:00).");
        timeResult.className = "time-result " + (isOpen ? "open" : "closed");
        playSound("click");
    });
}
