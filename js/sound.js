/* sound.js - sound effects shared by all pages.
   Each sound is one Audio object; before replaying we rewind it,
   so the same sound never overlaps with itself. */

const sounds = {
    click: new Audio("sounds/click.wav"),
    star: new Audio("sounds/star.wav"),
    add: new Audio("sounds/add.wav"),
    success: new Audio("sounds/success.wav"),
    error: new Audio("sounds/error.wav")
};

let soundEnabled = true;
try {
    soundEnabled = localStorage.getItem("sattiSound") !== "off";
} catch (error) {
    soundEnabled = true; // storage can be blocked, sound stays on
}

function playSound(name) {
    const sound = sounds[name];
    if (!soundEnabled || !sound) {
        return;
    }
    // stop every other sound so effects do not pile up
    Object.values(sounds).forEach(function (other) {
        other.pause();
        other.currentTime = 0;
    });
    sound.play().catch(function () {
        /* browser may block audio before first interaction - ignore */
    });
}

// Sound on/off button is created here, so no HTML edits are needed on each page
function createSoundToggle() {
    const nav = document.querySelector(".nav-menu");
    if (!nav) {
        return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.id = "soundToggle";
    button.className = "theme-toggle";

    function updateLabel() {
        button.textContent = soundEnabled ? "Sound: On" : "Sound: Off";
        button.setAttribute("aria-pressed", String(soundEnabled));
    }

    button.addEventListener("click", function () {
        soundEnabled = !soundEnabled;
        try {
            localStorage.setItem("sattiSound", soundEnabled ? "on" : "off");
        } catch (error) {
            /* ignore */
        }
        updateLabel();
        playSound("click");
    });

    updateLabel();
    nav.appendChild(button);
}

createSoundToggle();

// Click sound for the Day/Night theme button
const themeButton = document.getElementById("changeBackground");
if (themeButton) {
    themeButton.addEventListener("click", function () {
        playSound("click");
    });
}
