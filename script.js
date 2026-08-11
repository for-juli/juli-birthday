// =========================
// PASSCODE / UNLOCK
// =========================

const SECRET_CODE = "071223";

function unlock() {
    const input = document.getElementById("secret-code");
    const error = document.getElementById("lock-error");
    const lockScreen = document.getElementById("lock-screen");
    const mainContent = document.getElementById("main-content");

    if (input.value === SECRET_CODE) {
        lockScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");

        error.textContent = "";

        // Start from the first page
        showPage(0);
    } else {
        error.textContent = "wrong code 🥺 try again 🌷";
        input.value = "";
        input.focus();
    }
}


// =========================
// PAGE SYSTEM
// =========================

let currentPage = 0;

const pages = document.querySelectorAll(".page");

function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }

    pages.forEach((page, i) => {

        page.classList.remove("active");

        if (i === index) {
            page.classList.add("active");
        }

    });

    currentPage = index;

    // Stop all music when changing page
    stopAllMusic();

    // Scroll back to top of the current page
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


// =========================
// NEXT BUTTONS
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const nextButtons = document.querySelectorAll(".next-button");

    nextButtons.forEach(button => {

        button.addEventListener("click", () => {

            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }

        });

    });

});


// =========================
// MUSIC SYSTEM
// =========================

let currentlyPlaying = null;

function toggleMusic(songId, button) {

    const song = document.getElementById(songId);

    if (!song) {
        return;
    }

    // If this song is already playing
    if (!song.paused) {

        song.pause();

        button.textContent = "▶";

        currentlyPlaying = null;

        return;
    }


    // Stop any other music
    stopAllMusic();


    // Play selected song
    song.play()
        .then(() => {

            button.textContent = "❚❚";

            currentlyPlaying = songId;

        })
        .catch(error => {

            console.log("Music could not be played:", error);

        });
}


// =========================
// STOP ALL MUSIC
// =========================

function stopAllMusic() {

    const songs = document.querySelectorAll("audio");

    songs.forEach(song => {

        song.pause();
        song.currentTime = 0;

    });


    const playButtons = document.querySelectorAll(".play-button");

    playButtons.forEach(button => {

        button.textContent = "▶";

    });


    currentlyPlaying = null;
}


// =========================
// WHEN SONG ENDS
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const songs = document.querySelectorAll("audio");

    songs.forEach(song => {

        song.addEventListener("ended", () => {

            const button = song
                .closest(".music-page")
                ?.querySelector(".play-button");

            if (button) {
                button.textContent = "▶";
            }

            currentlyPlaying = null;

        });

    });

});


// =========================
// YES BUTTON
// =========================

function sayYes() {

    const answer = document.getElementById("answer");

    if (!answer) {
        return;
    }

    answer.innerHTML = `
        <div class="answer-message">
            <div class="answer-heart">💗</div>

            <h3>you said yes 🥹🩷</h3>

            <p>
                thank you for giving me another chance.
                i promise i'll do my best this time. 🌷
            </p>

            <p>
                let's make this chapter of our story
                something worth remembering. 🩷
            </p>

            <p class="answer-signature">
                yours truly,<br>
                miguel 🩷
            </p>
        </div>
    `;

    createHearts();

    // Disable buttons after answering
    const buttons = document.querySelectorAll(
        ".answer-buttons button"
    );

    buttons.forEach(button => {
        button.disabled = true;
    });
}


// =========================
// I NEED TIME BUTTON
// =========================

function thinkAboutIt() {

    const answer = document.getElementById("answer");

    if (!answer) {
        return;
    }

    answer.innerHTML = `
        <div class="answer-message">

            <div class="answer-heart">🌷</div>

            <h3>take your time, juli 🩷</h3>

            <p>
                you don't have to answer immediately.
                i'll respect whatever you decide.
            </p>

            <p>
                i just wanted you to know how i truly feel
                and how much you still mean to me.
            </p>

            <p>
                no pressure. take all the time you need. 🎀
            </p>

            <p class="answer-signature">
                yours truly,<br>
                miguel 🩷
            </p>

        </div>
    `;
}


// =========================
// LITTLE FLOATING HEARTS
// =========================

function createHearts() {

    for (let i = 0; i < 15; i++) {

        const heart = document.createElement("div");

        heart.className = "floating-heart";

        heart.textContent = "🩷";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.animationDelay =
            Math.random() * 2 + "s";

        heart.style.fontSize =
            (15 + Math.random() * 20) + "px";

        document.body.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 5000);

    }
}


// =========================
// INITIAL STATE
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // Make sure only the first page is active
    pages.forEach((page, index) => {

        if (index === 0) {
            page.classList.add("active");
        } else {
            page.classList.remove("active");
        }

    });

    currentPage = 0;


    // Make sure main content starts hidden
    const mainContent =
        document.getElementById("main-content");

    if (mainContent) {
        mainContent.classList.add("hidden");
    }


    // Keep lock screen visible
    const lockScreen =
        document.getElementById("lock-screen");

    if (lockScreen) {
        lockScreen.classList.remove("hidden");
    }

});
