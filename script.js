/* =========================================================
   MY OCEAN WORLD
   INTERACTION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const loadingScreen =
        document.querySelector(".loading-screen");

    setTimeout(() => {

        if (loadingScreen) {

            loadingScreen.classList.add("loaded");

        }

    }, 900);


    /* =====================================================
       MOUSE GLOW
    ===================================================== */

    const mouseGlow =
        document.querySelector(".mouse-glow");

    if (mouseGlow) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let glowX = mouseX;
        let glowY = mouseY;


        window.addEventListener("mousemove", (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateGlow() {

            glowX +=
                (mouseX - glowX) * 0.12;

            glowY +=
                (mouseY - glowY) * 0.12;

            mouseGlow.style.left =
                glowX + "px";

            mouseGlow.style.top =
                glowY + "px";

            requestAnimationFrame(
                animateGlow
            );

        }

        animateGlow();

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenu =
        document.querySelector("#mobileMenu");

    const navLinks =
        document.querySelector(".nav-links");


    if (mobileMenu && navLinks) {

        mobileMenu.addEventListener(
            "click",
            () => {

                navLinks.classList.toggle(
                    "open"
                );

            }
        );


        document
            .querySelectorAll(".nav-links a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "open"
                        );

                    }
                );

            });

    }


    /* =====================================================
       THEME SYSTEM
    ===================================================== */

    const themeButton =
        document.querySelector("#themeToggle");

    const themeText =
        document.querySelector("#themeText");

    const body =
        document.body;


    let savedTheme =
        localStorage.getItem(
            "myOceanTheme"
        );


    if (!savedTheme) {

        savedTheme = "abyss";

    }


    body.dataset.theme =
        savedTheme;


    updateThemeText();


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            () => {

                if (
                    body.dataset.theme ===
                    "abyss"
                ) {

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

    }


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


    /* =====================================================
       THEME BURST
    ===================================================== */

    function createThemeBurst() {

        const burst =
            document.createElement(
                "div"
            );

        burst.style.position =
            "fixed";

        burst.style.inset =
            "0";

        burst.style.pointerEvents =
            "none";

        burst.style.zIndex =
            "9998";

        burst.style.background =
            "radial-gradient(circle, rgba(77,234,255,0.22), transparent 55%)";

        burst.style.opacity =
            "0";

        burst.style.transition =
            "opacity 0.6s ease";

        document.body.appendChild(
            burst
        );


        requestAnimationFrame(() => {

            burst.style.opacity =
                "1";

        });


        setTimeout(() => {

            burst.style.opacity =
                "0";

        }, 100);


        setTimeout(() => {

            burst.remove();

        }, 800);

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.querySelector(
            ".scroll-progress"
        );


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        let percentage = 0;


        if (documentHeight > 0) {

            percentage =
                (scrollTop /
                    documentHeight) *
                100;

        }


        if (progress) {

            progress.style.width =
                percentage + "%";

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    updateScrollProgress();


    /* =====================================================
       PARALLAX CREATURES
    ===================================================== */

    const creatures =
        document.querySelectorAll(
            ".fish, .jellyfish, .squid, .whale-shadow"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scrollY =
                window.scrollY;


            creatures.forEach(
                (creature, index) => {

                    const speed =
                        0.02 +
                        index * 0.006;

                    creature.style.translate =
                        `0 ${scrollY * speed}px`;

                }
            );

        },
        { passive: true }
    );


    /* =====================================================
       TILT CARDS
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".tilt-card"
        );


    tiltCards.forEach((card) => {


        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 800
                ) {

                    return;

                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -4;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    4;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

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


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const profileImage =
        document.querySelector(
            ".profile-photo"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "load",
            () => {

                const frame =
                    profileImage.closest(
                        ".profile-frame"
                    );

                if (frame) {

                    frame.classList.add(
                        "has-image"
                    );

                }

            }
        );


        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

            }
        );

    }


    /* =====================================================
       HOBBY IMAGE FALLBACK
    ===================================================== */

    const hobbyImages =
        document.querySelectorAll(
            ".hobby-image img"
        );


    hobbyImages.forEach(
        (image) => {

            image.addEventListener(
                "load",
                () => {

                    const container =
                        image.closest(
                            ".hobby-image"
                        );

                    if (container) {

                        container.classList.add(
                            "has-image"
                        );

                    }

                }
            );


            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";

                }
            );

        }
    );


    /* =====================================================
       AUDIO PLAYER
    ===================================================== */

    const audio =
        document.querySelector(
            "#oceanAudio"
        );

    const audioButton =
        document.querySelector(
            "#audioToggle"
        );

    const audioDock =
        document.querySelector(
            ".audio-dock"
        );


    if (
        audio &&
        audioButton
    ) {


        audioButton.addEventListener(
            "click",
            async () => {

                try {

                    if (
                        audio.paused
                    ) {

                        await audio.play();

                        audioButton.textContent =
                            "Ⅱ";

                        if (audioDock) {

                            audioDock.classList.add(
                                "playing"
                            );

                        }

                    } else {

                        audio.pause();

                        audioButton.textContent =
                            "▶";

                        if (audioDock) {

                            audioDock.classList.remove(
                                "playing"
                            );

                        }

                    }

                } catch (error) {

                    console.log(
                        "Audio could not start:",
                        error
                    );

                }

            }
        );

    }


    /* =====================================================
       CLICK RIPPLE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

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

            ripple.style.border =
                "1px solid var(--accent)";

            ripple.style.borderRadius =
                "50%";

            ripple.style.pointerEvents =
                "none";

            ripple.style.zIndex =
                "9997";

            ripple.style.transform =
                "translate(-50%, -50%)";

            ripple.style.boxShadow =
                "0 0 20px var(--accent)";

            ripple.style.transition =
                "all 0.7s ease";


            document.body.appendChild(
                ripple
            );


            requestAnimationFrame(() => {

                ripple.style.width =
                    "100px";

                ripple.style.height =
                    "100px";

                ripple.style.opacity =
                    "0";

            });


            setTimeout(() => {

                ripple.remove();

            }, 750);

        }
    );


    /* =====================================================
       HOVER SOUND-LIKE EFFECT
       VISUAL ONLY
    ===================================================== */

    const interactive =
        document.querySelectorAll(
            "a, button, .hobby-card, .data-card"
        );


    interactive.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    element.style.setProperty(
                        "--hover-light",
                        "1"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.removeProperty(
                        "--hover-light"
                    );

                }
            );

        }
    );


    /* =====================================================
       RANDOM MICRO PARTICLES
    ===================================================== */

    function createParticle() {

        const particle =
            document.createElement(
                "span"
            );


        particle.style.position =
            "fixed";

        particle.style.width =
            "2px";

        particle.style.height =
            "2px";

        particle.style.borderRadius =
            "50%";

        particle.style.background =
            "var(--accent)";

        particle.style.boxShadow =
            "0 0 8px var(--accent)";

        particle.style.pointerEvents =
            "none";

        particle.style.opacity =
            "0.35";

        particle.style.left =
            Math.random() * 100 +
            "vw";

        particle.style.top =
            Math.random() * 100 +
            "vh";

        particle.style.zIndex =
            "-1";

        particle.style.transition =
            "transform 6s linear, opacity 6s linear";


        document.body.appendChild(
            particle
        );


        requestAnimationFrame(() => {

            particle.style.transform =
                `translate(
                    ${(Math.random() - 0.5) * 120}px,
                    ${-100 - Math.random() * 150}px
                )`;

            particle.style.opacity =
                "0";

        });


        setTimeout(() => {

            particle.remove();

        }, 6000);

    }


    setInterval(
        createParticle,
        900
    );


});
