/* =========================
   PASSCODE
========================= */

const CORRECT_CODE = "071223";

let enteredCode = "";


function unlock() {

    const input = document.getElementById("secret-code");
    const error = document.getElementById("lock-error");

    enteredCode = input.value;

    if (enteredCode === CORRECT_CODE) {

        document.getElementById("lock-screen").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("lock-screen").style.display = "none";
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 500);

    } else {

        error.textContent = "wrong code, try again ♡";

        input.value = "";

        input.style.animation = "shake .35s";

        setTimeout(() => {
            input.style.animation = "";
        }, 400);
    }
}


/* =========================
   OPEN STORY
========================= */

function openStory() {

    const story = document.getElementById("story");

    if (story) {
        story.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================
   NEXT PAGE
========================= */

function nextPage() {

    const sections = Array.from(
        document.querySelectorAll("body > section:not(#lock-screen)")
    );

    const currentPosition = window.scrollY + window.innerHeight / 2;

    let currentIndex = 0;

    sections.forEach((section, index) => {

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (
            currentPosition >= top &&
            currentPosition <= bottom
        ) {
            currentIndex = index;
        }

    });

    const next = sections[currentIndex + 1];

    if (next) {

        next.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =========================
   MUSIC
========================= */

let currentSong = null;
let currentButton = null;


function toggleMusic(id, button) {

    const song = document.getElementById(id);

    if (!song) return;


    if (currentSong && currentSong !== song) {

        currentSong.pause();
        currentSong.currentTime = 0;

        if (currentButton) {
            currentButton.textContent = "▶";
        }

    }


    if (song.paused) {

        song.play();

        button.textContent = "❚❚";

        currentSong = song;
        currentButton = button;

    } else {

        song.pause();

        button.textContent = "▶";

    }


    song.onended = function () {

        button.textContent = "▶";

        currentSong = null;
        currentButton = null;

    };

}


/* =========================
   FINAL QUESTION
========================= */

function sayYes() {

    const answer = document.getElementById("answer");

    answer.innerHTML = `
        <p>
            you really said yes? 😭💗
        </p>

        <p>
            then i promise i'll do my best this time. 🌷
        </p>

        <p>
            thank you for giving me another chance.
        </p>
    `;

    createHearts();
}


function thinkAboutIt() {

    const answer = document.getElementById("answer");

    answer.innerHTML = `
        <p>
            that's okay. take all the time you need. 🎀
        </p>

        <p>
            no pressure. i just wanted you to know
            how i truly feel.
        </p>
    `;

}


/* =========================
   FLOATING HEARTS
========================= */

function createHearts() {

    for (let i = 0; i < 12; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "💗";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-30px";
        heart.style.fontSize =
            (16 + Math.random() * 20) + "px";
        heart.style.zIndex = "10000";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        const duration =
            2500 + Math.random() * 2000;

        heart.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(-110vh) rotate(${Math.random() * 180 - 90}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-out"
            }
        );

        setTimeout(() => {
            heart.remove();
        }, duration);

    }

}


/* =========================
   SHAKE ANIMATION
========================= */

const style = document.createElement("style");

style.innerHTML = `
@keyframes shake {
    0%, 100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-8px);
    }

    50% {
        transform: translateX(8px);
    }

    75% {
        transform: translateX(-5px);
    }
}
`;

document.head.appendChild(style);


/* =========================
   PREVENT MUSIC OVERLAP
========================= */

document.addEventListener("visibilitychange", () => {

    if (document.hidden && currentSong) {

        currentSong.pause();

        if (currentButton) {
            currentButton.textContent = "▶";
        }

    }

});
