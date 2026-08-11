/* =========================================
   PASSCODE
========================================= */

const SECRET_CODE = "071223";

let enteredCode = "";

function unlock() {
    const input = document.getElementById("secret-code");
    const error = document.getElementById("lock-error");

    if (!input) return;

    if (input.value === SECRET_CODE) {

        document.getElementById("lock-screen").style.display = "none";

        document.body.classList.add("story-open");

        startPages();

    } else {

        if (error) {
            error.textContent = "wrong code ♡ try again";
        }

        input.value = "";

    }
}


/* =========================================
   OPEN SURPRISE
========================================= */

function openStory() {

    document.body.classList.add("story-open");

    const hero = document.querySelector(".hero");

    if (hero) {
        hero.classList.remove("page-active");
    }

    startPages();
}


/* =========================================
   PAGE SYSTEM
========================================= */

let pages = [];
let currentPage = 0;

function startPages() {

    /*
       These are the actual story pages.

       Hero is excluded because it is the opening.
       Lock screen is excluded too.
    */

    pages = Array.from(
        document.querySelectorAll(
            "main > section, body > section:not(.hero)"
        )
    ).filter(page => {

        return (
            !page.classList.contains("hero") &&
            page.id !== "ending"
        );

    });

    /*
       Hide everything first.
    */

    pages.forEach(page => {

        page.classList.remove("page-active");

        const oldButton =
            page.querySelector(".page-next-button");

        if (oldButton) {
            oldButton.remove();
        }

    });

    currentPage = 0;

    showPage(currentPage);
}


/* =========================================
   SHOW ONE PAGE
========================================= */

function showPage(index) {

    if (!pages.length) return;

    pages.forEach(page => {
        page.classList.remove("page-active");
    });

    const page = pages[index];

    if (!page) return;

    page.classList.add("page-active");

    /*
       Don't add a next button to the final
       question page.
    */

    const isFinalQuestion =
        page.classList.contains("question-section") ||
        page.classList.contains("final-letter");

    if (!isFinalQuestion && index < pages.length - 1) {

        addNextButton(page);

    }

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


/* =========================================
   NEXT BUTTON
========================================= */

function addNextButton(page) {

    const button = document.createElement("button");

    button.className = "page-next-button";

    button.innerHTML = "continue 🌷";

    button.addEventListener("click", function () {

        /*
           Stop music from continuing when
           changing pages.
        */

        document.querySelectorAll("audio, video").forEach(media => {

            try {
                media.pause();
            } catch (e) {}

        });

        currentPage++;

        showPage(currentPage);

    });

    page.appendChild(button);
}


/* =========================================
   MUSIC
========================================= */

function toggleMusic(id, button) {

    const music = document.getElementById(id);

    if (!music) return;

    /*
       Stop all other songs.
    */

    document.querySelectorAll("audio, video").forEach(media => {

        if (media !== music) {
            try {
                media.pause();
            } catch (e) {}
        }

    });

    if (music.paused) {

        music.play();

        if (button) {
            button.innerHTML = "❚❚";
        }

    } else {

        music.pause();

        if (button) {
            button.innerHTML = "▶";
        }

    }

}


/* =========================================
   FINAL ANSWERS
========================================= */

function sayYes() {

    const answer =
        document.getElementById("answer");

    if (!answer) return;

    answer.innerHTML = `
        <div class="answer-message">
            <h3>you said yes ♡</h3>
            <p>
                thank you, juli. i'll do my best to make
                this second chance worth it. 🌷
            </p>
        </div>
    `;

}


function thinkAboutIt() {

    const answer =
        document.getElementById("answer");

    if (!answer) return;

    answer.innerHTML = `
        <div class="answer-message">
            <h3>take your time ♡</h3>
            <p>
                you don't have to rush your answer.
                i'll understand. 🌷
            </p>
        </div>
    `;

}
