/* =========================
   SECRET LOCK
========================= */

const SECRET_CODE = "071223";


function unlock() {

    const input =
        document.getElementById("secret-code");

    const lockScreen =
        document.getElementById("lock-screen");

    const error =
        document.getElementById("lock-error");

    if (!input || !lockScreen) return;


    if (input.value === SECRET_CODE) {

        error.innerHTML =
            "welcome, juli ♡";

        createHearts(15);

        setTimeout(() => {

            lockScreen.classList.add("unlocked");

            document.body.style.overflow = "auto";

        }, 500);

    } else {

        error.innerHTML =
            "hmm, that’s not it ♡ try again";

        input.value = "";

        input.animate(
            [
                {
                    transform: "translateX(0)"
                },
                {
                    transform: "translateX(-6px)"
                },
                {
                    transform: "translateX(6px)"
                },
                {
                    transform: "translateX(-4px)"
                },
                {
                    transform: "translateX(0)"
                }
            ],
            {
                duration: 300
            }
        );
    }
}


/* =========================
   OPEN THE STORY
========================= */

function openStory() {

    const story =
        document.getElementById("story");

    if (story) {

        story.scrollIntoView({
            behavior: "smooth"
        });

    }

    createHearts(8);
}


/* =========================
   MUSIC PLAYER
========================= */

let currentSong = null;

let currentButton = null;


function toggleMusic(songId, button) {

    const song =
        document.getElementById(songId);

    if (!song) return;


    if (
        currentSong === song &&
        !song.paused
    ) {

        song.pause();

        button.innerHTML = "▶";

        currentSong = null;

        currentButton = null;

        return;
    }


    if (currentSong) {

        currentSong.pause();

        currentSong.currentTime = 0;

        if (currentButton) {

            currentButton.innerHTML = "▶";

        }
    }


    song.play()
        .then(() => {

            button.innerHTML = "❚❚";

            currentSong = song;

            currentButton = button;

        })
        .catch(() => {

            button.innerHTML = "▶";

            alert(
                "tap the play button again to start the song ♡"
            );

        });


    song.onended = function () {

        button.innerHTML = "▶";

        if (currentSong === song) {

            currentSong = null;

            currentButton = null;

        }

        createHearts(5);
    };
}


/* =========================
   YES
========================= */

function sayYes() {

    const answer =
        document.getElementById("answer");

    if (!answer) return;


    answer.innerHTML = `
        okay, you actually have no idea how happy
        that made me. ♡

        <br><br>

        i promise i’ll take this chance seriously.

        <br><br>

        welcome back to my favorite chapter. 🎀♡
    `;


    createHearts(25);


    setTimeout(() => {

        answer.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);
}


/* =========================
   NEED TIME
========================= */

function thinkAboutIt() {

    const answer =
        document.getElementById("answer");

    if (!answer) return;


    answer.innerHTML = `
        that’s okay. ♡

        <br><br>

        take all the time you need.
        i’m not asking you to answer just because
        i made this.

        <br><br>

        i just wanted you to know how i feel.
        🎀
    `;


    createHearts(8);
}


/* =========================
   FLOATING HEART
========================= */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        15 + Math.random() * 20 + "px";


    heart.style.animationDuration =
        3 + Math.random() * 3 + "s";


    document.body.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, 6000);
}


/* =========================
   CREATE HEARTS
========================= */

function createHearts(amount = 5) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(() => {

            createHeart();

        }, i * 150);

    }
}


/* =========================
   RANDOM HEARTS
========================= */

setInterval(() => {

    if (Math.random() > 0.65) {

        createHeart();

    }

}, 3500);


/* =========================
   STOP MUSIC WHEN LEAVING
========================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden &&
            currentSong
        ) {

            currentSong.pause();

            if (currentButton) {

                currentButton.innerHTML = "▶";

            }
        }

    }
);


/* =========================
   PAGE LOAD
========================= */

window.addEventListener(
    "load",
    function () {

        document.body.style.overflow =
            "hidden";

        console.log(
            "for juli ♡ everything is ready."
        );

    }
);
