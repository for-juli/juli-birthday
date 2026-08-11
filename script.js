/* =========================
   OPEN THE STORY
========================= */

function openStory() {
    const story = document.getElementById("story");

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

    const song = document.getElementById(songId);

    if (!song) return;


    // If clicking the song that is already playing
    if (currentSong === song && !song.paused) {

        song.pause();

        button.innerHTML = "▶";

        currentSong = null;
        currentButton = null;

        return;
    }


    // Stop another song first
    if (currentSong) {

        currentSong.pause();

        currentSong.currentTime = 0;

        if (currentButton) {
            currentButton.innerHTML = "▶";
        }
    }


    // Play selected song
    song.play()
        .then(() => {

            button.innerHTML = "❚❚";

            currentSong = song;
            currentButton = button;

        })
        .catch(() => {

            button.innerHTML = "▶";

            alert(
                "Tap the play button again to start the song ♡"
            );
        });


    // When the song ends
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
   YES ANSWER
========================= */

function sayYes() {

    const answer = document.getElementById("answer");

    if (!answer) return;

    answer.innerHTML = `
        okay, you actually have no idea how happy
        that made me. ♡
        <br><br>
        i promise i’ll take this chance seriously.
        <br><br>
        welcome back to my favorite chapter. ♡
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
   THINK ABOUT IT
========================= */

function thinkAboutIt() {

    const answer = document.getElementById("answer");

    if (!answer) return;

    answer.innerHTML = `
        that’s okay.
        <br><br>
        take all the time you need.
        i’m not asking you to answer just because
        i made this.
        <br><br>
        i just wanted you to know how i feel. ♡
    `;

    createHearts(8);
}


/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

    const heart = document.createElement("div");

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


function createHearts(amount = 5) {

    for (let i = 0; i < amount; i++) {

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
   STOP MUSIC WHEN
   LEAVING THE PAGE
========================= */

document.addEventListener(
    "visibilitychange",
    function () {

        if (document.hidden && currentSong) {

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

        console.log(
            "for juli ♡ everything is ready."
        );

    }
);
