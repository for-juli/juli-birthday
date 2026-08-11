/* =========================
   PASSCODE
========================= */

/*
   YOUR SECRET CODE

   Change this if you want.
   Current code: 071223
*/

const SECRET_CODE = "071223";


function unlock() {

    const input = document.getElementById("secret-code");
    const error = document.getElementById("lock-error");
    const lockScreen = document.getElementById("lock-screen");
    const mainContent = document.getElementById("main-content");

    if (!input || !lockScreen || !mainContent) {
        return;
    }

    const code = input.value.trim();


    /* =========================
       CORRECT CODE
    ========================= */

    if (code === SECRET_CODE) {

        error.textContent = "";

        /*
           Prevent the website itself
           from scrolling.
        */

        document.body.style.overflow = "hidden";


        /*
           Fade out lock screen.
        */

        lockScreen.style.transition = "opacity 0.5s ease";
        lockScreen.style.opacity = "0";


        setTimeout(() => {

            lockScreen.style.display = "none";

            mainContent.classList.remove("hidden");

            showPage(0);

        }, 500);

    }


    /* =========================
       WRONG CODE
    ========================= */

    else {

        error.textContent = "wrong code, try again ♡";

        input.value = "";

        input.focus();


        /*
           iPhone-like shake
        */

        input.animate(
            [
                {
                    transform: "translateX(0)"
                },
                {
                    transform: "translateX(-7px)"
                },
                {
                    transform: "translateX(7px)"
                },
                {
                    transform: "translateX(-5px)"
                },
                {
                    transform: "translateX(5px)"
                },
                {
                    transform: "translateX(0)"
                }
            ],
            {
                duration: 300,
                easing: "ease-in-out"
            }
        );

    }

}


/* =========================
   PAGES
========================= */

const pages = document.querySelectorAll(".page");

let currentPage = 0;


/*
   Show exactly ONE page.

   IMPORTANT:
   There is NO scrollTo() here.

   The page simply changes.
*/

function showPage(index) {

    if (index < 0 || index >= pages.length) {
        return;
    }


    pages.forEach((page, i) => {

        page.classList.remove("active");

        page.setAttribute("aria-hidden", "true");

    });


    const selectedPage = pages[index];

    selectedPage.classList.add("active");

    selectedPage.setAttribute("aria-hidden", "false");


    currentPage = index;


    /*
       Always put the page itself
       at the top without scrolling
       the whole website.
    */

    selectedPage.scrollTop = 0;

}


/* =========================
   INITIAL PAGE
========================= */

pages.forEach((page, index) => {

    if (index === 0) {

        page.classList.add("active");

        page.setAttribute("aria-hidden", "false");

    } else {

        page.classList.remove("active");

        page.setAttribute("aria-hidden", "true");

    }

});


/* =========================
   NEXT BUTTONS
========================= */

document.querySelectorAll(".next-button").forEach((button) => {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        /*
           Stop any weird browser scrolling
           when button is pressed.
        */

        event.stopPropagation();


        /*
           Stop currently playing music
           when moving to another page.
        */

        if (currentAudio) {

            currentAudio.pause();

            currentAudio.currentTime = 0;

            if (currentButton) {
                currentButton.textContent = "▶";
            }

            currentAudio = null;
            currentButton = null;

        }


        /*
           Go to next PAGE,
           not next scroll position.
        */

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


    /*
       If another song is playing,
       stop it first.
    */

    if (
        currentAudio &&
        currentAudio !== audio
    ) {

        currentAudio.pause();

        currentAudio.currentTime = 0;

        if (currentButton) {
            currentButton.textContent = "▶";
        }

    }


    /* =========================
       PLAY
    ========================= */

    if (audio.paused) {

        audio.play()
            .then(() => {

                button.textContent = "❚❚";

                currentAudio = audio;

                currentButton = button;

            })
            .catch(() => {

                button.textContent = "▶";

            });

    }


    /* =========================
       PAUSE
    ========================= */

    else {

        audio.pause();

        button.textContent = "▶";

        currentAudio = null;

        currentButton = null;

    }


    /*
       Reset button when song ends.
    */

    audio.onended = function () {

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

    if (!answer) {
        return;
    }


    answer.innerHTML = `
        thank you, juli. ♡
        <br>
        i'll do my best to make this time different.
    `;


    /*
       Give her a moment to see
       the message before ending.
    */

    setTimeout(() => {

        showEnding();

    }, 2200);

}


/* =========================
   NEED TIME
========================= */

function thinkAboutIt() {

    const answer = document.getElementById("answer");

    if (!answer) {
        return;
    }


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

    /*
       Stop music.
    */

    if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime = 0;

        if (currentButton) {
            currentButton.textContent = "▶";
        }

        currentAudio = null;

        currentButton = null;

    }


    /*
       Hide every normal page.
    */

    pages.forEach((page) => {

        page.classList.remove("active");

        page.setAttribute("aria-hidden", "true");

    });


    /*
       Show ending.
    */

    const ending = document.getElementById("ending");

    if (!ending) {
        return;
    }

    ending.classList.remove("hidden");


    /*
       NO scrollIntoView().
       Ending simply replaces the page.
    */

    ending.scrollTop = 0;

}


/* =========================
   ENTER KEY
========================= */

document.addEventListener("keydown", function (event) {

    const input = document.getElementById("secret-code");


    if (
        event.key === "Enter" &&
        document.activeElement === input
    ) {

        event.preventDefault();

        unlock();

    }

});


/* =========================
   PREVENT PAGE SCROLLING
========================= */

/*
   This makes the experience behave
   like separate screens instead of
   one long webpage.
*/

document.addEventListener("wheel", function (event) {

    /*
       Only prevent scrolling when
       the main story is open.
    */

    const mainContent = document.getElementById("main-content");

    if (
        mainContent &&
        !mainContent.classList.contains("hidden")
    ) {

        event.preventDefault();

    }

}, {
    passive: false
});


/*
   Prevent touch swipe from changing
   the story page accidentally.

   The only way to continue is
   pressing the button.
*/

let touchStartY = 0;


document.addEventListener("touchstart", function (event) {

    if (event.touches.length === 1) {

        touchStartY = event.touches[0].clientY;

    }

}, {
    passive: true
});


document.addEventListener("touchmove", function (event) {

    const mainContent = document.getElementById("main-content");

    if (
        mainContent &&
        !mainContent.classList.contains("hidden")
    ) {

        event.preventDefault();

    }

}, {
    passive: false
});


document.addEventListener("touchend", function () {

    touchStartY = 0;

}, {
    passive: true
});
