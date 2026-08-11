/* =========================
   PASSCODE
========================= */

/*
   CHANGE THIS TO WHATEVER
   6-DIGIT CODE YOU WANT.
*/

const SECRET_CODE = "071223";


function unlock() {

    const input = document.getElementById("secret-code");
    const error = document.getElementById("lock-error");
    const lockScreen = document.getElementById("lock-screen");
    const mainContent = document.getElementById("main-content");

    const code = input.value;

    if (code === SECRET_CODE) {

        error.textContent = "";

        lockScreen.style.opacity = "0";

        setTimeout(() => {

            lockScreen.style.display = "none";
            mainContent.classList.remove("hidden");

            showPage(0);

        }, 500);

    } else {

        error.textContent = "wrong code, try again ♡";

        input.value = "";

        input.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-7px)" },
                { transform: "translateX(7px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 250
            }
        );
    }
}


/* =========================
   PAGES
========================= */

const pages = document.querySelectorAll(".page");

let currentPage = 0;


function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }

    pages.forEach((page) => {
        page.classList.remove("active");
    });

    pages[index].classList.add("active");

    currentPage = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   NEXT BUTTONS
========================= */

document.querySelectorAll(".next-button").forEach((button) => {

    button.addEventListener("click", () => {

        if (currentPage < pages.length - 1) {

            showPage(currentPage + 1);

        } else {

            showEnding();

        }

    });

});


/* =========================
   MUSIC
========================= */

let currentAudio = null;
let currentButton = null;


function toggleMusic(id, button) {

    const audio = document.getElementById(id);

    if (!audio) {
        return;
    }


    if (currentAudio && currentAudio !== audio) {

        currentAudio.pause();
        currentAudio.currentTime = 0;

        if (currentButton) {
            currentButton.textContent = "▶";
        }

    }


    if (audio.paused) {

        audio.play().then(() => {

            button.textContent = "❚❚";

            currentAudio = audio;
            currentButton = button;

        }).catch(() => {

            button.textContent = "▶";

        });

    } else {

        audio.pause();

        button.textContent = "▶";

        currentAudio = null;
        currentButton = null;

    }


    audio.onended = () => {

        button.textContent = "▶";

        if (currentAudio === audio) {
            currentAudio = null;
            currentButton = null;
        }

    };

}


/* =========================
   YES
========================= */

function sayYes() {

    const answer = document.getElementById("answer");

    answer.innerHTML = `
        thank you, juli. ♡
        <br>
        i'll do my best to make this time different.
    `;

    setTimeout(() => {
        showEnding();
    }, 2200);

}


/* =========================
   NEED TIME
========================= */

function thinkAboutIt() {

    const answer = document.getElementById("answer");

    answer.innerHTML = `
        take all the time you need. 🎀
        <br>
        i’ll respect whatever you decide.
    `;

}


/* =========================
   ENDING
========================= */

function showEnding() {

    document.querySelectorAll(".page").forEach((page) => {
        page.classList.remove("active");
    });

    const ending = document.getElementById("ending");

    ending.classList.remove("hidden");

    ending.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   ENTER KEY
========================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        document.activeElement === document.getElementById("secret-code")
    ) {

        unlock();

    }

});
