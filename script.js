/* =========================================================
   OMKAR SOLAT — AI/ML PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
       ===================================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.querySelector(".back-to-top");
    const revealElements = document.querySelectorAll(".reveal");


    /* =====================================================
       02. MOBILE NAVIGATION
       ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const isOpen = navMenu.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu after clicking a link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =====================================================
       03. NAVBAR ON SCROLL
       ===================================================== */

    const handleNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    handleNavbar();

    window.addEventListener(
        "scroll",
        handleNavbar,
        { passive: true }
    );


    /* =====================================================
       04. SMOOTH SCROLL
       ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       05. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    const updateActiveNav = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    updateActiveNav();

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =====================================================
       06. SCROLL REVEAL ANIMATION
       ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /* =====================================================
       07. BACK TO TOP
       ===================================================== */

    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 700) {

            backToTop.style.opacity = "1";

            backToTop.style.visibility =
                "visible";

            backToTop.style.pointerEvents =
                "auto";

        } else {

            backToTop.style.opacity = "0";

            backToTop.style.visibility =
                "hidden";

            backToTop.style.pointerEvents =
                "none";

        }

    };


    if (backToTop) {

        /* Initial state */

        backToTop.style.opacity = "0";

        backToTop.style.visibility =
            "hidden";

        backToTop.style.pointerEvents =
            "none";


        backToTop.style.transition =
            "opacity 0.3s ease, " +
            "visibility 0.3s ease, " +
            "transform 0.3s ease";


        backToTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    handleBackToTop();

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );


    /* =====================================================
       08. PROJECT CARD TILT EFFECT
       ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    /* Only enable the effect on
       devices that actually support hover */

    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;


    if (supportsHover) {

        projectCards.forEach(card => {

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

                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;

                    const rotateX =
                        ((y - centerY) /
                        centerY) * -2.5;

                    const rotateY =
                        ((x - centerX) /
                        centerX) * 2.5;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

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


    /* =====================================================
       09. HERO AI CORE INTERACTION
       ===================================================== */

    const aiCore =
        document.querySelector(".ai-core");

    const aiOrbit =
        document.querySelector(".ai-orbit");


    if (
        aiCore &&
        aiOrbit &&
        supportsHover
    ) {

        aiOrbit.addEventListener(
            "mousemove",
            event => {

                const rect =
                    aiOrbit.getBoundingClientRect();

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

                const moveX =
                    ((x - centerX) /
                    centerX) * 8;

                const moveY =
                    ((y - centerY) /
                    centerY) * 8;


                aiCore.style.transform =
                    `translate(
                        ${moveX}px,
                        ${moveY}px
                    )`;

            }
        );


        aiOrbit.addEventListener(
            "mouseleave",
            () => {

                aiCore.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       10. DYNAMIC CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       11. ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }

            if (
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       12. IMAGE LOADING
       ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.35";

            }
        );

    });


    /* =====================================================
       13. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "%c Omkar Solat — AI/ML Portfolio ",
        "background:#070a12;" +
        "color:#5ee7ff;" +
        "font-size:16px;" +
        "font-weight:bold;" +
        "padding:10px;"
    );

    console.log(
        "Portfolio initialized successfully."
    );

});