/* =====================================================
   BIRTHDAY WEBSITE - SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const opening = document.getElementById("opening");
const main = document.getElementById("main");

const openButton = document.getElementById("openButton");
const countdown = document.getElementById("countdown");

const music = document.getElementById("music");

const envelope = document.getElementById("envelope");
const envelopeText = document.getElementById("envelopeText");
const letter = document.getElementById("letter");

const wishCake = document.getElementById("wishCake");
const wishMessage = document.getElementById("wishMessage");

const finalSurprise = document.getElementById("finalSurprise");
const revealButton = document.getElementById("revealButton");

const videoSection = document.getElementById("videoSection");
const birthdayVideo = document.getElementById("birthdayVideo");

const particles = document.getElementById("particles");


/* =====================================================
   START SURPRISE
   Tombol OPEN
===================================================== */

let surpriseStarted = false;

function startSurprise() {

    // Mencegah tombol diklik berkali-kali
    if (surpriseStarted) {
        return;
    }

    surpriseStarted = true;

    if (openButton) {
        openButton.disabled = true;
        openButton.style.pointerEvents = "none";
        openButton.style.opacity = "0.6";
    }

    let number = 3;

    if (countdown) {
        countdown.textContent = number;
    }

    const timer = setInterval(() => {

        number--;

        if (number > 0) {

            if (countdown) {
                countdown.textContent = number;
            }

        } else {

            clearInterval(timer);

            if (countdown) {
                countdown.textContent = "♡";
            }

            setTimeout(() => {

                // Hilangkan opening
                if (opening) {
                    opening.style.opacity = "0";
                    opening.style.transform = "scale(1.03)";
                    opening.style.transition =
                        "opacity 0.8s ease, transform 0.8s ease";
                }

                setTimeout(() => {

                    if (opening) {
                        opening.style.display = "none";
                    }

                    // Tampilkan halaman utama
                    if (main) {
                        main.classList.remove("hidden");
                        main.style.display = "block";
                        main.style.opacity = "0";

                        requestAnimationFrame(() => {
                            main.style.transition = "opacity 1s ease";
                            main.style.opacity = "1";
                        });
                    }

                    // Putar musik
                    playMusic();

                    // Scroll ke atas
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 800);

            }, 500);
        }

    }, 900);
}


/* =====================================================
   MUSIC
===================================================== */

function playMusic() {

    if (!music) {
        return;
    }

    music.volume = 0.55;

    const playPromise = music.play();

    if (playPromise !== undefined) {

        playPromise.catch(() => {

            // Browser bisa memblokir autoplay.
            // User tetap bisa memulai audio setelah interaksi.

            console.log("Music autoplay diblokir browser.");

        });

    }
}


/* =====================================================
   OPEN LETTER
===================================================== */

let letterOpened = false;

function openLetter() {

    if (letterOpened) {
        return;
    }

    letterOpened = true;

    if (envelope) {

        envelope.style.transform = "translateY(-8px)";

        const flap = envelope.querySelector(".flap");

        if (flap) {

            flap.style.transform = "rotateX(180deg)";
            flap.style.zIndex = "1";

        }

        const paper = envelope.querySelector(".paper");

        if (paper) {

            paper.style.transform = "translateY(-45px)";
            paper.style.zIndex = "5";

        }

    }

    if (envelopeText) {

        envelopeText.textContent = "OPENED ♡";
        envelopeText.style.color = "#e9a0ba";

    }

    setTimeout(() => {

        if (letter) {

            letter.classList.remove("hidden");

            letter.style.display = "block";
            letter.style.opacity = "0";
            letter.style.transform = "translateY(25px)";

            requestAnimationFrame(() => {

                letter.style.transition =
                    "opacity 0.8s ease, transform 0.8s ease";

                letter.style.opacity = "1";
                letter.style.transform = "translateY(0)";

            });

        }

    }, 650);
}


/* =====================================================
   MAKE A WISH
===================================================== */

let wishMade = false;

function makeWish() {

    if (wishMade) {
        return;
    }

    wishMade = true;

    // Matikan api lilin
    const flames = document.querySelectorAll(".flame");

    flames.forEach((flame) => {

        flame.style.transition = "opacity 0.5s ease";
        flame.style.opacity = "0";

    });


    // Pesan wish
    if (wishMessage) {

        wishMessage.textContent =
            "Semoga semua hal baik yang kamu semogakan hari ini, perlahan menemukan jalannya untuk menjadi nyata. ✦";

        wishMessage.style.opacity = "0";
        wishMessage.style.transform = "translateY(15px)";

        requestAnimationFrame(() => {

            wishMessage.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            wishMessage.style.opacity = "1";
            wishMessage.style.transform = "translateY(0)";

        });

    }


    // Efek confetti
    createConfetti();


    // Tampilkan surprise setelah beberapa detik
    setTimeout(() => {

        showFinalSurprise();

    }, 3500);
}


/* =====================================================
   SHOW FINAL SURPRISE
===================================================== */

function showFinalSurprise() {

    if (!finalSurprise) {
        return;
    }

    finalSurprise.classList.remove("hidden");

    finalSurprise.style.display = "flex";
    finalSurprise.style.opacity = "0";
    finalSurprise.style.transform = "translateY(25px)";

    requestAnimationFrame(() => {

        finalSurprise.style.transition =
            "opacity 1s ease, transform 1s ease";

        finalSurprise.style.opacity = "1";
        finalSurprise.style.transform = "translateY(0)";

    });


    setTimeout(() => {

        finalSurprise.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 300);

}


/* =====================================================
   REVEAL VIDEO
===================================================== */

let videoRevealed = false;

function revealVideo() {

    if (videoRevealed) {
        return;
    }

    videoRevealed = true;


    // STOP MUSIC
    stopMusic();


    // Sembunyikan final surprise
    if (finalSurprise) {

        finalSurprise.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        finalSurprise.style.opacity = "0";
        finalSurprise.style.transform = "translateY(-20px)";

        setTimeout(() => {

            finalSurprise.style.display = "none";

        }, 600);

    }


    // Tampilkan video
    setTimeout(() => {

        if (videoSection) {

            videoSection.classList.remove("hidden");

            videoSection.style.display = "block";
            videoSection.style.opacity = "0";
            videoSection.style.transform = "translateY(25px)";

            requestAnimationFrame(() => {

                videoSection.style.transition =
                    "opacity 1s ease, transform 1s ease";

                videoSection.style.opacity = "1";
                videoSection.style.transform = "translateY(0)";

            });

        }


        // Scroll ke video
        setTimeout(() => {

            if (videoSection) {

                videoSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }, 300);

    }, 650);

}


/* =====================================================
   STOP MUSIC
===================================================== */

function stopMusic() {

    if (!music) {
        return;
    }

    music.pause();

    // Reset posisi musik
    music.currentTime = 0;
}


/* =====================================================
   VIDEO PLAY
   Musik langsung berhenti ketika video dimainkan
===================================================== */

if (birthdayVideo) {

    birthdayVideo.addEventListener("play", () => {

        stopMusic();

    });


    birthdayVideo.addEventListener("playing", () => {

        stopMusic();

    });

}


/* =====================================================
   VIDEO PAUSE
   Musik TIDAK dinyalakan lagi.
===================================================== */

if (birthdayVideo) {

    birthdayVideo.addEventListener("pause", () => {

        // Sengaja kosong.
        // Musik tetap berhenti.
        stopMusic();

    });

}


/* =====================================================
   PARTICLES
===================================================== */

function createParticle() {

    if (!particles) {
        return;
    }

    const particle = document.createElement("span");

    particle.textContent = Math.random() > 0.5 ? "✦" : "·";

    particle.style.position = "fixed";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = "105vh";

    particle.style.fontSize =
        Math.floor(Math.random() * 9 + 5) + "px";

    particle.style.color =
        Math.random() > 0.5
            ? "rgba(242, 165, 193, 0.8)"
            : "rgba(255, 255, 255, 0.65)";

    particle.style.pointerEvents = "none";
    particle.style.zIndex = "3";

    particle.style.transition =
        "transform 5s linear, opacity 5s linear";

    particles.appendChild(particle);


    requestAnimationFrame(() => {

        const moveX =
            (Math.random() - 0.5) * 180;

        particle.style.transform =
            `translate(${moveX}px, -${window.innerHeight + 150}px) rotate(360deg)`;

        particle.style.opacity = "0";

    });


    setTimeout(() => {

        particle.remove();

    }, 5200);
}


// Jalankan particle secara berkala
setInterval(() => {

    createParticle();

}, 650);


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const confettiCount = 55;

    for (let i = 0; i < confettiCount; i++) {

        const piece = document.createElement("div");

        piece.style.position = "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-15px";

        piece.style.width =
            Math.random() * 6 + 4 + "px";

        piece.style.height =
            Math.random() * 12 + 6 + "px";

        piece.style.background =
            getConfettiColor();

        piece.style.borderRadius = "2px";

        piece.style.zIndex = "9999";

        piece.style.pointerEvents = "none";

        const duration =
            Math.random() * 2.5 + 2.5;

        const rotate =
            Math.random() * 900 - 450;

        const moveX =
            Math.random() * 250 - 125;


        piece.animate(
            [
                {
                    transform:
                        "translate(0, 0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${moveX}px, 105vh) rotate(${rotate}deg)`,
                    opacity: 0.2
                }
            ],
            {
                duration: duration * 1000,
                easing: "cubic-bezier(.2,.7,.3,1)",
                fill: "forwards"
            }
        );


        document.body.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, duration * 1000 + 300);

    }
}


/* =====================================================
   CONFETTI COLOR
===================================================== */

function getConfettiColor() {

    const colors = [
        "#e99ab7",
        "#f5c7d8",
        "#ffffff",
        "#c97d9d",
        "#b878a0",
        "#f1a5bf"
    ];

    return colors[
        Math.floor(Math.random() * colors.length)
    ];
}


/* =====================================================
   EXTRA CLICK EFFECT
===================================================== */

document.addEventListener("click", (event) => {

    // Jangan bikin efek pada video
    if (event.target.closest("video")) {
        return;
    }

    createClickSpark(
        event.clientX,
        event.clientY
    );

});


function createClickSpark(x, y) {

    const spark = document.createElement("span");

    spark.textContent = "✦";

    spark.style.position = "fixed";
    spark.style.left = x + "px";
    spark.style.top = y + "px";

    spark.style.transform = "translate(-50%, -50%)";

    spark.style.color = "#f1a6c0";

    spark.style.fontSize = "13px";

    spark.style.zIndex = "10000";

    spark.style.pointerEvents = "none";

    spark.style.textShadow =
        "0 0 12px rgba(241,166,192,.8)";


    document.body.appendChild(spark);


    spark.animate(
        [
            {
                opacity: 1,
                transform: "translate(-50%, -50%) scale(0.5)"
            },

            {
                opacity: 0,
                transform:
                    "translate(-50%, -85px) scale(1.6)"
            }
        ],
        {
            duration: 700,
            easing: "ease-out",
            fill: "forwards"
        }
    );


    setTimeout(() => {

        spark.remove();

    }, 750);

}


/* =====================================================
   INITIAL STATE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Main disembunyikan saat pertama kali masuk
    if (main) {
        main.classList.add("hidden");
        main.style.display = "none";
    }

    // Final surprise disembunyikan
    if (finalSurprise) {
        finalSurprise.classList.add("hidden");
        finalSurprise.style.display = "none";
    }

    // Video disembunyikan
    if (videoSection) {
        videoSection.classList.add("hidden");
        videoSection.style.display = "none";
    }

    // Letter disembunyikan
    if (letter) {
        letter.classList.add("hidden");
        letter.style.display = "none";
    }

    // Music jangan langsung dimainkan
    if (music) {
        music.pause();
        music.currentTime = 0;
    }

    console.log("Birthday website siap ❤️");

});