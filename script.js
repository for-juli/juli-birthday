/* =========================
   PASSCODE
========================= */

/*
   CHANGE THIS IF YOU WANT
   A DIFFERENT 6-DIGIT CODE.
*/
const SECRET_CODE = "071223";

let enteredCode = "";

const lockScreen = document.getElementById("lock-screen");
const mainSite = document.getElementById("main-site");
const lockError = document.getElementById("lock-error");


function pressKey(number) {

    if (enteredCode.length >= 6) {
        return;
    }

    enteredCode += number;

    updateDots();

    if (enteredCode.length === 6) {
        setTimeout(checkCode, 180);
    }
}


function deleteKey() {

    enteredCode = enteredCode.slice(0, -1);

    updateDots();

    lockError.textContent = "";
}


function updateDots() {

    for (let i = 1; i <= 6; i++) {

        const dot = document.getElementById("dot" + i);

        if (i <= enteredCode.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }

    }
}


function checkCode() {

    if (enteredCode === SECRET_CODE) {

        lockScreen.style.opacity = "0";
        lockScreen.style.transition = "opacity .7s ease";

        setTimeout(() => {

            lockScreen.style.display = "none";

            mainSite.classList.remove("hidden");

            showPage(0);

        }, 700);

    } else {

        lockError.textContent = "wrong code ♡ try again";

        enteredCode = "";

        updateDots();

        const card = document.querySelector(".lock-card");

        card.classList.add("shake");

        setTimeout(() => {
            card.classList.remove("shake");
        }, 450);

    }
}


/* =========================
   PAGE NAVIGATION
========================= */

const pages = document.querySelectorAll(".page");

let currentPage = 0;


function showPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= pages.length) {
        index = pages.length - 1;
    }

    pages.forEach((page, i) => {

        page.classList.toggle("active", i === index);

    });

    currentPage = index;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* EVERY NEXT BUTTON */

document.querySelectorAll(".next-button").forEach(button => {

    button.addEventListener("click", () => {

        if (currentPage < pages.length - 1) {
            showPage(currentPage + 1);
        }

    });

});


/* =========================
   MUSIC
========================= */

let currentlyPlaying = null;


function toggleMusic(id, button) {

    const audio = document.getElementById(id);

    if (!audio) {
        return;
    }


    if (currentlyPlaying && currentlyPlaying !== audio) {

        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;

        const oldButton =
            document.querySelector(
                `.play-button[data-playing="true"]`
            );

        if (oldButton) {
            oldButton.textContent = "▶";
            oldButton.dataset.playing = "false";
        }

    }


    if (audio.paused) {

        audio.play();

        button.textContent = "❚❚";
        button.dataset.playing = "true";

        currentlyPlaying = audio;

    } else {

        audio.pause();

        button.textContent = "▶";
        button.dataset.playing = "false";

        currentlyPlaying = null;

    }


    audio.onended = () => {

        button.textContent = "▶";
        button.dataset.playing = "false";

        currentlyPlaying = null;

    };

}


/* =========================
   ANSWER
========================= */

function sayYes() {

    const answer = document.getElementById("answer");

    answer.innerHTML = `
        <p>
            you have no idea how happy that makes me. 🌷
        </p>

        <p>
            thank you for giving me another chance.
            this time, i'll do my best to do things properly.
        </p>

        <button class="next-button" onclick="goToEnding()">
            continue ♡
        </button>
    `;

}


function thinkAboutIt() {

    const answer = document.getElementById("answer");

    answer.innerHTML = `
        <p>
            take all the time you need. 🌷
        </p>

        <p>
            you don't have to answer just because i asked.
            whatever your answer is, i'll respect it.
        </p>

        <button class="next-button" onclick="goToEnding()">
            continue ♡
        </button>
    `;

}


function goToEnding() {

    showPage(pages.length - 1);

}


/* =========================
   SHAKE ANIMATION
========================= */

const shakeStyle = document.createElement("style");

shakeStyle.textContent = `
    .shake {
        animation: shake .4s ease;
    }

    @keyframes shake {
        0%, 100% {
            transform: translateX(0);
        }

        20% {
            transform: translateX(-10px);
        }

        40% {
            transform: translateX(10px);
        }

        60% {
            transform: translateX(-7px);
        }

        80% {
            transform: translateX(7px);
        }
    }
`;

document.head.appendChild(shakeStyle);
