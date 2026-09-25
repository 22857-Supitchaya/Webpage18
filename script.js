/* =========================================================
   MY OCEAN WORLD
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initTheme();

    initMobileMenu();

    initScrollReveal();

    initScrollProgress();

    initMouseGlow();

    initTiltCards();

    initImages();

    initAudio();

    initDepthCounter();

    initNexusButton();

    initClickEffects();

});


/* =========================================================
   LOADING SCREEN
   ========================================================= */

function initLoader() {

    const loader =
        document.getElementById("loader");

    if (!loader) {
        return;
    }


    let percent = 0;

    const percentText =
        loader.querySelector(".loader-percent");


    const interval =
        setInterval(() => {

            percent +=
                Math.floor(
                    Math.random() * 14
                ) + 5;


            if (percent >= 100) {

                percent = 100;

                clearInterval(interval);

                if (percentText) {

                    percentText.textContent =
                        "100%";

                }

                setTimeout(() => {

                    loader.classList.add("loaded");

                }, 350);

            }


            if (percentText) {

                percentText.textContent =
                    String(percent).padStart(3, "0") + "%";

            }

        }, 120);

}


/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

    const body =
        document.body;

    const toggle =
        document.getElementById("themeToggle");

    const themeText =
        document.getElementById("themeText");


    if (!toggle) {
        return;
    }


    const savedTheme =
        localStorage.getItem("myOceanTheme");


    if (savedTheme === "nexus") {

        body.dataset.theme =
            "nexus";

        updateThemeText();

    }


    toggle.addEventListener(
        "click",
        () => {

            const current =
                body.dataset.theme ||
                "abyss";


            if (current === "abyss") {

                body.dataset.theme =
                    "nexus";

            } else {

                body.dataset.theme =
                    "abyss";

            }


            localStorage.setItem(
                "myOceanTheme",
                body.dataset.theme
            );


            updateThemeText();

            createThemeBurst();

        }
    );


    function updateThemeText() {

        if (!themeText) {
            return;
        }


        if (
            body.dataset.theme ===
            "nexus"
        ) {

            themeText.textContent =
                "NEXUS";

        } else {

            themeText.textContent =
                "ABYSS";

        }

    }

}


/* =========================================================
   THEME BURST
   ========================================================= */

function createThemeBurst() {

    const burst =
        document.createElement("div");

    burst.className =
        "theme-burst";


    burst.style.position =
        "fixed";

    burst.style.inset =
        "0";

    burst.style.pointerEvents =
        "none";

    burst.style.zIndex =
        "9998";

    burst.style.background =
        "radial-gradient(circle, rgba(82,239,255,0.12), transparent 50%)";

    burst.style.opacity =
        "0";


    document.body.appendChild(
        burst
    );


    requestAnimationFrame(() => {

        burst.style.transition =
            "opacity 0.5s ease";

        burst.style.opacity =
            "1";

    });


    setTimeout(() => {

        burst.style.opacity =
            "0";

    }, 80);


    setTimeout(() => {

        burst.remove();

    }, 700);

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById(
            "menuButton"
        );

    const menu =
        document.getElementById(
            "mobileMenu"
        );


    if (!button || !menu) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle(
                "open"
            );

        }
    );


    const links =
        menu.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                menu.classList.remove(
                    "open"
                );

            }
        );

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    if (!progress) {
        return;
    }


    function update() {

        const scrollTop =
            window.scrollY;

        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            height > 0
                ? (scrollTop / height) * 100
                : 0;


        progress.style.width =
            percentage + "%";

    }


    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );


    update();

}


/* =========================================================
   MOUSE GLOW
   ========================================================= */

function initMouseGlow() {

    const glow =
        document.querySelector(
            ".mouse-glow"
        );


    if (!glow) {
        return;
    }


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            glow.style.opacity =
                "1";

        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            glow.style.opacity =
                "0";

        }
    );


    function animate() {

        currentX +=
            (mouseX - currentX) *
            0.12;

        currentY +=
            (mouseY - currentY) *
            0.12;


        glow.style.left =
            currentX + "px";

        glow.style.top =
            currentY + "px";


        requestAnimationFrame(
            animate
        );

    }


    animate();

}


/* =========================================================
   TILT CARDS
   ========================================================= */

function initTiltCards() {

    const cards =
        document.querySelectorAll(
            ".tilt-card"
        );


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - 0.5)
                    * 8;


                const rotateX =
                    ((y / rect.height) - 0.5)
                    * -8;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   IMAGE HANDLING
   ========================================================= */

function initImages() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(img => {

        img.addEventListener(
            "load",
            () => {

                img.classList.add(
                    "loaded"
                );


                const parent =
                    img.parentElement;


                if (!parent) {
                    return;
                }


                const placeholder =
                    parent.querySelector(
                        ".photo-placeholder"
                    );


                const fallback =
                    parent.querySelector(
                        ".image-fallback"
                    );


                if (placeholder) {

                    placeholder.classList.add(
                        "hidden"
                    );

                }


                if (fallback) {

                    fallback.classList.add(
                        "hidden"
                    );

                }

            }
        );


        img.addEventListener(
            "error",
            () => {

                img.classList.remove(
                    "loaded"
                );

            }
        );


        if (img.complete) {

            if (
                img.naturalWidth > 0
            ) {

                img.dispatchEvent(
                    new Event("load")
                );

            }

        }

    });

}


/* =========================================================
   AUDIO
   ========================================================= */

function initAudio() {

    const audio =
        document.getElementById(
            "oceanAudio"
        );

    const button =
        document.getElementById(
            "audioToggle"
        );

    const player =
        document.getElementById(
            "audioPlayer"
        );


    if (!audio || !button) {
        return;
    }


    button.addEventListener(
        "click",
        async () => {

            try {

                if (
                    audio.paused
                ) {

                    await audio.play();

                    button.textContent =
                        "❚❚";

                    if (player) {

                        player.classList.add(
                            "playing"
                        );

                    }

                } else {

                    audio.pause();

                    button.textContent =
                        "▶";

                    if (player) {

                        player.classList.remove(
                            "playing"
                        );

                    }

                }

            } catch (error) {

                console.log(
                    "Audio could not start.",
                    error
                );

            }

        }
    );


    audio.addEventListener(
        "ended",
        () => {

            button.textContent =
                "▶";

            if (player) {

                player.classList.remove(
                    "playing"
                );

            }

        }
    );

}


/* =========================================================
   DEPTH COUNTER
   ========================================================= */

function initDepthCounter() {

    const counter =
        document.getElementById(
            "depthNumber"
        );


    if (!counter) {
        return;
    }


    let currentDepth = 0;

    function updateDepth() {

        const maxScroll =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (maxScroll <= 0) {
            return;
        }


        const progress =
            window.scrollY /
            maxScroll;


        const target =
            Math.floor(
                progress * 1200
            );


        currentDepth +=
            (target - currentDepth)
            * 0.12;


        counter.textContent =
            String(
                Math.floor(currentDepth)
            ).padStart(3, "0");

    }


    window.addEventListener(
        "scroll",
        updateDepth,
        { passive: true }
    );


    function animate() {

        updateDepth();

        requestAnimationFrame(
            animate
        );

    }


    animate();

}


/* =========================================================
   NEXUS BUTTON
   ========================================================= */

function initNexusButton() {

    const button =
        document.getElementById(
            "nexusButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            document.body.dataset.theme =
                "nexus";


            localStorage.setItem(
                "myOceanTheme",
                "nexus"
            );


            const themeText =
                document.getElementById(
                    "themeText"
                );


            if (themeText) {

                themeText.textContent =
                    "NEXUS";

            }


            createNexusParticles();

        }
    );

}


/* =========================================================
   NEXUS PARTICLES
   ========================================================= */

function createNexusParticles() {

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.style.position =
            "fixed";

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";

        particle.style.width =
            "3px";

        particle.style.height =
            "3px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            "#8f7aff";

        particle.style.boxShadow =
            "0 0 12px #8f7aff";

        particle.style.pointerEvents =
            "none";

        particle.style.zIndex =
            "9997";


        const angle =
            Math.random() *
            Math.PI * 2;


        const distance =
            150 +
            Math.random() * 500;


        const x =
            Math.cos(angle) *
            distance;


        const y =
            Math.sin(angle) *
            distance;


        document.body.appendChild(
            particle
        );


        particle.animate(
            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    900 +
                    Math.random() * 700,

                easing:
                    "cubic-bezier(.16,1,.3,1)"
            }
        ).onfinish =
            () => {

                particle.remove();

            };

    }

}


/* =========================================================
   CLICK RIPPLE
   ========================================================= */

function initClickEffects() {

    document.addEventListener(
        "click",
        event => {

            const ripple =
                document.createElement(
                    "span"
                );


            ripple.style.position =
                "fixed";

            ripple.style.left =
                event.clientX + "px";

            ripple.style.top =
                event.clientY + "px";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.border =
                "1px solid var(--cyan)";

            ripple.style.pointerEvents =
                "none";

            ripple.style.zIndex =
                "9999";

            ripple.style.transform =
                "translate(-50%, -50%)";

            ripple.style.boxShadow =
                "0 0 20px var(--cyan)";


            document.body.appendChild(
                ripple
            );


            ripple.animate(
                [
                    {
                        width: "10px",
                        height: "10px",
                        opacity: 0.8
                    },
                    {
                        width: "100px",
                        height: "100px",
                        opacity: 0
                    }
                ],
                {
                    duration: 600,
                    easing:
                        "cubic-bezier(.16,1,.3,1)"
                }
            ).onfinish =
                () => {

                    ripple.remove();

                };

        }
    );

}
