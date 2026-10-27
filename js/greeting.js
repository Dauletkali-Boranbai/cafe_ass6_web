/* greeting.js - greeting that depends on the time of day and on the visitor's name. */

const greetingText = document.getElementById("greetingText");
const greetingForm = document.getElementById("greetingForm");
const greetingName = document.getElementById("greetingName");

// Returns "morning", "afternoon", "evening" or "night"
function getDayPart(hour) {
    if (hour >= 5 && hour < 12) {
        return "morning";
    }
    if (hour >= 12 && hour < 18) {
        return "afternoon";
    }
    if (hour >= 18 && hour < 23) {
        return "evening";
    }
    return "night";
}

// switch statement: different message for each part of the day
function buildGreeting(dayPart, name) {
    const who = name ? ", " + name : "";

    switch (dayPart) {
        case "morning":
            return "Good morning" + who + "! Start your day with a fresh coffee.";
        case "afternoon":
            return "Good afternoon" + who + "! Time for a tasty lunch.";
        case "evening":
            return "Good evening" + who + "! Try our BOZA with dinner.";
        default:
            return "Hello" + who + "! We are open until midnight.";
    }
}

function showGreeting(name) {
    const dayPart = getDayPart(new Date().getHours());
    greetingText.textContent = buildGreeting(dayPart, name);

    // restart the fade-in animation
    greetingText.classList.remove("fade-in");
    void greetingText.offsetWidth; // forces the browser to notice the change
    greetingText.classList.add("fade-in");
}

if (greetingText && greetingForm) {
    let savedName = "";
    try {
        savedName = localStorage.getItem("sattiName") || "";
    } catch (error) {
        savedName = "";
    }

    greetingName.value = savedName;
    showGreeting(savedName);

    greetingForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = greetingName.value.trim();

        try {
            localStorage.setItem("sattiName", name);
        } catch (error) {
            /* ignore */
        }

        showGreeting(name);
        playSound("success");
    });
}
