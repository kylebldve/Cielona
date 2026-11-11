/**
 * ============================================================================
 * CIELONA RENTALS — LUXURY BOUTIQUE MASTER JAVASCRIPT
 *
 * Handles:
 *  1. Interactive Mouse-Controlled & Touch-Controlled Double-Door 3D Opening
 *  2. Sequential Letter-by-Letter Logo Reveal (C -> I -> E -> L -> O -> N -> A) with Pastel-Blue Stars
 *  3. Fail-Safe Skip Intro Functionality
 *  4. Minimalist Hero Dress Slideshow Surrounded by HD framee.jpg & Pastel-Blue Stars
 *  5. 7-Piece Collection Category Filtering (Top and Skirt Set Integrated)
 *  6. Model View Architecture with "MODEL VIEW — TO BE UPDATED" Fallback
 *  7. Expanded Studio Detail Modal with Large Display View
 *  8. Instagram Concierge & One-Click Inquiry Form Builder
 *  9. Sticky Navigation & Keyboard Accessibility (ESC Key)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* ------------------------------------------------------------------------
       1. DOM ELEMENT REFERENCES
       ------------------------------------------------------------------------ */
    // Reference Double-Door & Preloader Intro Elements
    const doorIntro = document.getElementById("doorIntro");
    const brandIntro = document.getElementById("brandIntro");
    const mainWebsite = document.getElementById("mainWebsite");
    const openDoorsBtn = document.getElementById("openDoors");
    const skipBrandBtn = document.getElementById("skipBrand");
    const doorLeft = document.getElementById("doorLeft");
    const doorRight = document.getElementById("doorRight");
    const doorRadialGlow = document.getElementById("doorRadialGlow");
    const doorLightSeam = document.getElementById("doorLightSeam");
    const doorSheenLeft = document.getElementById("doorSheenLeft");
    const doorSheenRight = document.getElementById("doorSheenRight");
    const welcomeHanger = document.getElementById("welcomeHanger");
    const doorDragZone = document.getElementById("doorDragZone");
    const doorHoldSubtext = document.getElementById("doorHoldSubtext");
    const preloaderCanvas = document.getElementById("preloaderCanvas");
    const preloaderVideo = document.getElementById("preloaderVideo");

    // Back to Top Elements
    const footerBackToTopBtn = document.getElementById("footerBackToTop");
    const backToTopFloatBtn = document.getElementById("backToTopBtn");

    // Header & Navigation
    const navbar = document.getElementById("navbar");
    const mobileToggle = document.getElementById("mobileToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerClose = document.getElementById("drawerClose");
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    const navLinks = document.querySelectorAll(".nav-link");
    const drawerLinks = document.querySelectorAll(".drawer-link");

    // Collection Filter & Cards
    const filterTabs = document.querySelectorAll(".filter-tab");
    const dressCards = document.querySelectorAll(".dress-card");

    // Expanded Luxury Dress Modal Elements
    const dressModal = document.getElementById("dressModal");
    const modalOverlay = document.getElementById("modalOverlay");
    const closeModalBtn = document.getElementById("closeModal");
    const modalImageFrame = document.getElementById("modalImageFrame");
    const modalDressImage = document.getElementById("modalDressImage");
    const modalModelPlaceholder = document.getElementById("modalModelPlaceholder");
    const modalDressBtn = document.getElementById("modalDressBtn");
    const modalModelBtn = document.getElementById("modalModelBtn");
    const modalDressName = document.getElementById("modalDressName");
    const modalDressSize = document.getElementById("modalDressSize");
    const modalDressDescription = document.getElementById("modalDressDescription");
    const modalDressPrice = document.getElementById("modalDressPrice");
    const modalDressDeposit = document.getElementById("modalDressDeposit");
    const inquireButton = document.getElementById("inquireButton");
    const modalCopyBtn = document.getElementById("modalCopyBtn");
    const modalCopyNotice = document.getElementById("modalCopyNotice");

    // Quick Inquiry Form Elements
    const quickInquiryForm = document.getElementById("quickInquiryForm");
    const clientNameInput = document.getElementById("clientName");
    const dressSelect = document.getElementById("dressSelect");
    const eventDateInput = document.getElementById("eventDate");
    const clientCityInput = document.getElementById("clientCity");
    const copyInquiryBtn = document.getElementById("copyInquiryBtn");
    const inquiryCopyFeedback = document.getElementById("inquiryCopyFeedback");


    /* ------------------------------------------------------------------------
       2. MASTER COLLECTION & MODEL VIEW CONFIGURATION
       === MANUAL EDITING: PRODUCT DATA & COLLECTION CATEGORIES (C & D) ===
       ------------------------------------------------------------------------
       HOW TO MANUALLY EDIT DRESS DATA, IMAGES, PRICES & CATEGORIES:
       - `name`: Display name of the dress (e.g., "Anastasia", "Roséra").
       - `category`: Filter key that must match `data-filter` on the filter buttons
         and `data-category` on the `<article class="dress-card">` in index.html:
           * "gown"     -> LONG DRESS & GOWNS
           * "romantic" -> MINI DRESS & COCKTAILS
           * "set"      -> TOP & SKIRT
       - `categoryLabel`: Human-readable category name for reference.
       - `size`: Size range string displayed in the modal (e.g., "XS – SMALL").
       - `price`: 3-day rental rate in PHP (number only, e.g., 650).
       - `deposit`: Refundable security deposit in PHP (number only, e.g., 500).
       - `description`: Full editorial description shown in the product modal.
       - `dressImage`: Relative path to the garment cutout image (e.g., "images/amber.png").
       - `modelImage`: Relative path to the Model View photograph (e.g., "images/amberM.png"),
         or `null` if no model photo is available yet (shows the placeholder notice).
       ------------------------------------------------------------------------ */
    const dressesCatalog = {
        /* === MANUAL EDITING: ANASTASIA (LONG DRESS & GOWNS) === */
        anastasia: {
            name: "Anastasia",
            category: "gown",
            categoryLabel: "Long Dress & Gowns",
            heroEditorial: "SIGNATURE COUTURE",
            size: "XS – SMALL",
            price: 650,
            deposit: 500,
            description: "Corseted bodice with a soft draped skirt. A romantic burgundy silhouette crafted to accentuate posture and grace.",
            dressImage: "images/anastasia.png",
            modelImage: null
        },
        /* === MANUAL EDITING: ROSÉRA — ASSIGNED TO MINI DRESS & COCKTAILS ("romantic") === */
        rosera: {
            name: "Roséra",
            category: "romantic",
            categoryLabel: "Mini Dress & Cocktails",
            heroEditorial: "BLOOMING PETALS",
            size: "SMALL – MEDIUM",
            price: 650,
            deposit: 500,
            description: "An alluring crimson halter neck top and skirt set blossoming with handcrafted 3D rose petals and a fluttery silhouette.",
            dressImage: "images/rosera.png",
            modelImage: null
        },
        /* === MANUAL EDITING: VIVIENNE (LONG DRESS & GOWNS — HAS MODEL VIEW PHOTO) === */
        vivienne: {
            name: "Vivienne",
            category: "gown",
            categoryLabel: "Long Dress & Gowns",
            heroEditorial: "VINTAGE DRAMA",
            size: "SMALL",
            price: 650,
            deposit: 500,
            description: "Dramatic jet-black silhouette featuring a regal boned corset and voluminous bubble hem skirt.",
            dressImage: "images/vivienne.png",
            modelImage: "images/vivienneM.jpg"
        },
        /* === MANUAL EDITING: AMBER (MINI DRESS & COCKTAILS — HAS MODEL VIEW PHOTO) === */
        amber: {
            name: "Amber",
            category: "romantic",
            categoryLabel: "Mini Dress & Cocktails",
            heroEditorial: "FLORAL ATELIER",
            size: "XS – SMALL",
            price: 550,
            deposit: 500,
            description: "Ethereal baby-blue botanical floral gown with a delicately boned lace bodice and fluttering tie-strap ribbons.",
            dressImage: "images/amber.png",
            modelImage: "images/amberM.png"
        },
        /* === MANUAL EDITING: SOLENNE (LONG DRESS & GOWNS — HAS MODEL VIEW PHOTO) === */
        solenne: {
            name: "Solenne",
            category: "gown",
            categoryLabel: "Long Dress & Gowns",
            heroEditorial: "EVENING GLAMOUR",
            size: "SMALL – MEDIUM",
            price: 700,
            deposit: 500,
            description: "Sensual midnight black backless mermaid gown crafted from fluid satin, featuring delicate criss-cross straps.",
            dressImage: "images/solenne.png",
            modelImage: "images/solenneM.jpg"
        },
        /* === MANUAL EDITING: LIEZEL (MINI DRESS & COCKTAILS) === */
        liezel: {
            name: "Liezel",
            category: "romantic",
            categoryLabel: "Mini Dress & Cocktails",
            heroEditorial: "COCKTAIL ATELIER",
            size: "SMALL – MEDIUM",
            price: 500,
            deposit: 500,
            description: "Romantic blush rose silhouette with sheer off-the-shoulder draped lace sleeves and a gentle A-line skirt.",
            dressImage: "images/liezel.png",
            modelImage: null
        },
        /* === MANUAL EDITING: SELENE — ONLY DRESS ASSIGNED TO TOP & SKIRT ("set") === */
        selene: {
            name: "Selene",
            category: "set",
            categoryLabel: "Top & Skirt",
            heroEditorial: "IVORY SCULPTURE",
            size: "MEDIUM",
            price: 550,
            deposit: 500,
            description: "Sculptural ivory 2-piece top and skirt set featuring a boned corset bodice and a fairytale skirt adorned with blooming rosettes.",
            dressImage: "images/selene.png",
            modelImage: null
        }
    };


    /* ------------------------------------------------------------------------
       3. EXACT REFERENCE DOUBLE-DOOR OPENING & LOGO PRELOADER
       Replicated 1:1 from the reference video:
       - Horizontal drag / pull interaction on `#doorDragZone` with velocity threshold
       - "Open the door" click activation on `#openDoors` with 620ms cubic-bezier slide
       - Dynamic swing animation on hanging Welcome sign (`#welcomeHanger`)
       - Warm interior radial glow expansion & sheen reflections
       - Seamless transition into the reference logo preloader (`#brandIntro`)
       - 1280x720 canvas rendering with white-background keyer (`Gd`)
       - Fallback support for local file:// execution & skip intro button
       ------------------------------------------------------------------------ */
    let doorsOpened = false;
    let doorsCompleting = false;
    let revealTriggered = false;
    let siteRevealed = false;
    let doorTimer = null;
    let preloaderRafId = null;
    let preloaderTimeout = null;

    // Interaction State
    let currentDoorProgress = 0; // 0..1
    let isDragging = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let dragLastTime = 0;
    let dragVelocityX = 0;

    /* MANUAL EDITING: DOOR OPENING TIMING & VELOCITY SENSITIVITY
       - `DOOR_SLIDE_DURATION_MS`: Duration for automatic door opening slide (ms).
       - `DOOR_RELEASE_THRESHOLD`: Drag progress (0..1) required to automatically finish opening.
       - `DOOR_VELOCITY_THRESHOLD`: Quick flick velocity (px/sec) that triggers completion even below 0.45 progress. */
    const DOOR_SLIDE_DURATION_MS = 620;
    const DOOR_RELEASE_THRESHOLD = 0.45;
    const DOOR_VELOCITY_THRESHOLD = 420;

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock page scroll while entrance doors are active
    document.body.classList.add("locked");

    /**
     * Updates left & right door translations and environmental effects
     * based on progress (0.0 to 1.0).
     */
    function updateDoorVisuals(p) {
        const clamped = Math.max(0, Math.min(1, p));
        currentDoorProgress = clamped;

        // Slide doors horizontally outward
        if (doorLeft) {
            doorLeft.style.transform = `translateX(${(-clamped * 100).toFixed(2)}%)`;
        }
        if (doorRight) {
            doorRight.style.transform = `translateX(${(clamped * 100).toFixed(2)}%)`;
        }

        // Expanding warm interior glow
        if (doorRadialGlow) {
            const glowOpacity = 0.35 + clamped * 0.65;
            const glowScale = 0.9 + clamped * 0.35;
            doorRadialGlow.style.opacity = glowOpacity.toFixed(3);
            doorRadialGlow.style.transform = `scale(${glowScale.toFixed(3)})`;
        }

        // Center light seam
        if (doorLightSeam) {
            const seamOpacity = clamped > 0.02 && clamped < 0.95 ? (1 - clamped * 0.8) : 0;
            doorLightSeam.style.opacity = seamOpacity.toFixed(3);
        }

        // Specular sheen reflections
        if (doorSheenLeft) {
            doorSheenLeft.style.opacity = (clamped * 0.55).toFixed(3);
        }
        if (doorSheenRight) {
            doorSheenRight.style.opacity = (clamped * 0.55).toFixed(3);
        }
    }

    /**
     * Smoothly tweens door progress between start and end values using cubic-bezier easing.
     */
    function tweenDoorProgress(fromVal, toVal, durationMs, easingFn, onComplete) {
        const startTime = performance.now();

        function step(now) {
            const elapsed = Math.max(0, now - startTime);
            const linearT = Math.min(1, elapsed / durationMs);
            const easedT = easingFn ? easingFn(linearT) : linearT;
            const val = fromVal + (toVal - fromVal) * easedT;
            updateDoorVisuals(val);

            if (linearT < 1) {
                requestAnimationFrame(step);
            } else {
                updateDoorVisuals(toVal);
                if (typeof onComplete === "function") {
                    onComplete();
                }
            }
        }

        requestAnimationFrame(step);
    }

    // Reference cubic-bezier(0.77, 0, 0.175, 1) approximation
    function easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    // Spring cubic-bezier(0.22, 1, 0.36, 1)
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    /**
     * Activates the door opening sequence (from button click or completed drag).
     */
    function openDoors(duration = DOOR_SLIDE_DURATION_MS) {
        if (doorsOpened || doorsCompleting || siteRevealed) return;
        doorsCompleting = true;
        isDragging = false;

        if (doorIntro) {
            doorIntro.classList.remove("dragging", "spring-closing");
            doorIntro.classList.add("auto-sliding");
        }

        // Welcome sign swing animation
        if (welcomeHanger) {
            welcomeHanger.classList.add("opening");
        }

        if (prefersReducedMotion) {
            updateDoorVisuals(1);
            onDoorsFullyOpen();
            return;
        }

        tweenDoorProgress(currentDoorProgress, 1, duration, easeInOutQuart, onDoorsFullyOpen);
    }

    function onDoorsFullyOpen() {
        doorsOpened = true;
        doorsCompleting = false;

        // At 720ms after start, fade out door intro and trigger the logo preloader
        doorTimer = setTimeout(() => {
            if (doorIntro) {
                doorIntro.classList.add("entered");
            }
            startBrandPreloader();
        }, 120);
    }

    /**
     * Interactive horizontal drag / pull handling
     */
    function onDragStart(e) {
        if (doorsOpened || doorsCompleting || siteRevealed) return;
        if (e && typeof e.button === "number" && e.button !== 0) return;

        isDragging = true;
        dragStartX = e.clientX;
        dragLastX = e.clientX;
        dragLastTime = performance.now();
        dragVelocityX = 0;

        if (doorIntro) {
            doorIntro.classList.add("dragging");
            doorIntro.classList.remove("auto-sliding", "spring-closing");
        }

        if (doorDragZone && doorDragZone.setPointerCapture && e.pointerId) {
            try { doorDragZone.setPointerCapture(e.pointerId); } catch (_) {}
        }
    }

    function onDragMove(e) {
        if (!isDragging || doorsOpened || doorsCompleting || siteRevealed) return;

        const deltaX = Math.abs(e.clientX - dragStartX);
        const threshold = Math.max(160, Math.min(window.innerWidth * 0.32, 320));
        const progress = Math.min(Math.max(deltaX / threshold, 0), 1);

        const now = performance.now();
        const dt = (now - dragLastTime) / 1000;
        if (dt > 0.005) {
            dragVelocityX = (e.clientX - dragLastX) / dt;
            dragLastX = e.clientX;
            dragLastTime = now;
        }

        updateDoorVisuals(progress);
    }

    function onDragEnd() {
        if (!isDragging || doorsOpened || doorsCompleting || siteRevealed) return;
        isDragging = false;

        if (doorIntro) {
            doorIntro.classList.remove("dragging");
        }

        // If pulled past threshold (45%) or flicked with high velocity
        if (currentDoorProgress >= DOOR_RELEASE_THRESHOLD || Math.abs(dragVelocityX) >= DOOR_VELOCITY_THRESHOLD) {
            openDoors(420);
        } else {
            // Spring back to closed
            if (doorIntro) {
                doorIntro.classList.add("spring-closing");
            }
            tweenDoorProgress(currentDoorProgress, 0, 360, easeOutCubic, () => {
                if (doorIntro) {
                    doorIntro.classList.remove("spring-closing");
                }
            });
        }
    }

    if (doorDragZone) {
        doorDragZone.addEventListener("pointerdown", onDragStart);
        doorDragZone.addEventListener("pointermove", onDragMove);
        doorDragZone.addEventListener("pointerup", onDragEnd);
        doorDragZone.addEventListener("pointercancel", onDragEnd);
    }

    if (openDoorsBtn) {
        openDoorsBtn.addEventListener("click", () => openDoors(DOOR_SLIDE_DURATION_MS));
        openDoorsBtn.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDoors(DOOR_SLIDE_DURATION_MS);
            }
        });
    }

    /* ------------------------------------------------------------------------
       4. REFERENCE CIELONA LOGO PRELOADER CANVAS & VIDEO KEYER
       - Plays `assets/preloader.webm` / `assets/preloader.mp4`
       - Keys out the white background in real-time onto the cream background
       - Has automatic fallback for local file:// environments
       - Smoothly fades out and reveals `#mainWebsite`
       ------------------------------------------------------------------------ */
    /**
     * White-keying shader from reference code (`Gd`)
     */
    function applyWhiteKey(ctx, width, height) {
        try {
            const frame = ctx.getImageData(0, 0, width, height);
            const data = frame.data;
            const len = data.length;
            for (let i = 0; i < len; i += 4) {
                const r = data[i], g = data[i + 1], b = data[i + 2];
                const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                if (brightness > 245) {
                    data[i + 3] = 0;
                } else if (brightness > 200) {
                    data[i + 3] = Math.round(((245 - brightness) / 45) * 255);
                }
            }
            ctx.putImageData(frame, 0, 0);
        } catch (_) {
            // If getImageData throws (e.g. cross-origin/local file:), fallback to direct video
            if (preloaderVideo) {
                preloaderVideo.classList.add("direct-video-fallback");
            }
            if (preloaderCanvas) {
                preloaderCanvas.style.display = "none";
            }
        }
    }

    function startBrandPreloader() {
        if (revealTriggered || siteRevealed) return;
        revealTriggered = true;

        if (doorIntro) {
            doorIntro.style.display = "none";
        }

        if (brandIntro) {
            brandIntro.classList.add("show");
            brandIntro.setAttribute("aria-hidden", "false");
            requestAnimationFrame(() => {
                brandIntro.classList.add("animating");
            });
        }

        let ctx = null;
        if (preloaderCanvas && preloaderCanvas.getContext) {
            ctx = preloaderCanvas.getContext("2d", { willReadFrequently: true });
        }

        function renderPreloaderFrame() {
            if (!preloaderVideo || siteRevealed) return;

            if (!preloaderVideo.paused && !preloaderVideo.ended) {
                if (ctx) {
                    ctx.clearRect(0, 0, 1280, 720);
                    ctx.drawImage(preloaderVideo, 0, 0, 1280, 720);
                    applyWhiteKey(ctx, 1280, 720);
                }
            }

            if (!preloaderVideo.ended && !siteRevealed) {
                preloaderRafId = requestAnimationFrame(renderPreloaderFrame);
            }
        }

        if (preloaderVideo) {
            preloaderVideo.currentTime = 0;
            preloaderVideo.muted = true;
            preloaderVideo.playsInline = true;

            const playPromise = preloaderVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    preloaderRafId = requestAnimationFrame(renderPreloaderFrame);
                }).catch(() => {
                    // Autoplay prevented; fallback gracefully
                    if (preloaderVideo) {
                        preloaderVideo.classList.add("direct-video-fallback");
                    }
                });
            }

            preloaderVideo.onended = () => {
                finishBrandIntro();
            };
        }

        // Safety fallback timer if video metadata takes too long (~4.5s)
        preloaderTimeout = setTimeout(() => {
            finishBrandIntro();
        }, 4600);
    }

    function finishBrandIntro() {
        if (siteRevealed) return;

        if (preloaderRafId) {
            cancelAnimationFrame(preloaderRafId);
            preloaderRafId = null;
        }
        if (preloaderTimeout) {
            clearTimeout(preloaderTimeout);
            preloaderTimeout = null;
        }

        if (brandIntro) {
            brandIntro.classList.add("finishing");
        }

        setTimeout(() => {
            showWebsite();
        }, 550);
    }

    function skipDoorIntro() {
        if (siteRevealed) return;
        doorsOpened = true;
        doorsCompleting = false;
        revealTriggered = true;

        if (doorTimer) { clearTimeout(doorTimer); doorTimer = null; }
        if (preloaderRafId) { cancelAnimationFrame(preloaderRafId); preloaderRafId = null; }
        if (preloaderTimeout) { clearTimeout(preloaderTimeout); preloaderTimeout = null; }

        if (doorIntro) {
            doorIntro.classList.add("hidden");
            doorIntro.style.display = "none";
        }
        if (brandIntro) {
            brandIntro.classList.remove("show", "animating", "finishing");
            brandIntro.style.display = "none";
        }

        showWebsite();
    }

    function showWebsite() {
        if (siteRevealed) return;
        siteRevealed = true;
        doorsCompleting = false;
        isDragging = false;

        if (doorTimer) { clearTimeout(doorTimer); doorTimer = null; }
        if (preloaderRafId) { cancelAnimationFrame(preloaderRafId); preloaderRafId = null; }
        if (preloaderTimeout) { clearTimeout(preloaderTimeout); preloaderTimeout = null; }

        if (doorIntro) {
            doorIntro.style.display = "none";
        }
        if (brandIntro) {
            brandIntro.classList.remove("show", "animating");
            brandIntro.setAttribute("aria-hidden", "true");
            brandIntro.style.display = "none";
        }

        if (mainWebsite) {
            mainWebsite.classList.add("visible");
            mainWebsite.setAttribute("aria-hidden", "false");
        }

        document.body.classList.remove("locked");
        startHeroAutoplay();
    }

    if (skipBrandBtn) {
        skipBrandBtn.addEventListener("click", skipDoorIntro);
    }


    /* ------------------------------------------------------------------------
       5. STICKY NAVBAR SCROLL SPY & BACK TO TOP VISIBILITY
       ------------------------------------------------------------------------ */
    function scrollToTopSmooth() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    if (footerBackToTopBtn) {
        footerBackToTopBtn.addEventListener("click", scrollToTopSmooth);
    }
    if (backToTopFloatBtn) {
        backToTopFloatBtn.addEventListener("click", scrollToTopSmooth);
    }

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        if (backToTopFloatBtn) {
            if (window.scrollY > 380) {
                backToTopFloatBtn.classList.add("visible");
            } else {
                backToTopFloatBtn.classList.remove("visible");
            }
        }

        updateActiveNavLink();
    }, { passive: true });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }


    /* ------------------------------------------------------------------------
       6. MOBILE NAVIGATION DRAWER
       ------------------------------------------------------------------------ */
    function toggleMobileDrawer(open) {
        const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains("active");

        if (isOpen) {
            mobileDrawer.classList.add("active");
            drawerBackdrop.classList.add("active");
            mobileToggle.classList.add("open");
            mobileToggle.setAttribute("aria-expanded", "true");
            mobileDrawer.setAttribute("aria-hidden", "false");
            document.body.classList.add("locked");
        } else {
            mobileDrawer.classList.remove("active");
            drawerBackdrop.classList.remove("active");
            mobileToggle.classList.remove("open");
            mobileToggle.setAttribute("aria-expanded", "false");
            mobileDrawer.setAttribute("aria-hidden", "true");
            if (siteRevealed && !dressModal.classList.contains("active")) {
                document.body.classList.remove("locked");
            }
        }
    }

    if (mobileToggle) mobileToggle.addEventListener("click", () => toggleMobileDrawer());
    if (drawerClose) drawerClose.addEventListener("click", () => toggleMobileDrawer(false));
    if (drawerBackdrop) drawerBackdrop.addEventListener("click", () => toggleMobileDrawer(false));

    drawerLinks.forEach(link => {
        link.addEventListener("click", () => toggleMobileDrawer(false));
    });


    /* ------------------------------------------------------------------------
       7. MINIMALIST HERO DRESS SLIDESHOW (SURROUNDED BY HD FRAMEE.JPG)
       ------------------------------------------------------------------------ */
    const heroDressesList = [
        { id: "anastasia", name: "Anastasia", editorial: "SIGNATURE COUTURE", image: "images/anastasia.png" },
        { id: "rosera", name: "Roséra", editorial: "BLOOMING PETALS", image: "images/rosera.png" },
        { id: "vivienne", name: "Vivienne", editorial: "VINTAGE DRAMA", image: "images/vivienne.png" },
        { id: "amber", name: "Amber", editorial: "FLORAL ATELIER", image: "images/amber.png" },
        { id: "solenne", name: "Solenne", editorial: "EVENING GLAMOUR", image: "images/solenne.png" },
        { id: "liezel", name: "Liezel", editorial: "COCKTAIL ATELIER", image: "images/liezel.png" },
        { id: "selene", name: "Selene", editorial: "IVORY SCULPTURE", image: "images/selene.png" }
    ];

    let currentHeroIndex = 0;
    let heroSlideInterval = null;
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll("#heroSlidePagination .page-dot");
    const heroCategory = document.getElementById("heroSlideCategory");
    const heroName = document.getElementById("heroSlideName");
    const heroPrevBtn = document.getElementById("heroSlidePrev");
    const heroNextBtn = document.getElementById("heroSlideNext");
    const heroSlideshowEl = document.getElementById("heroSlideshow");

    function updateHeroSlide(index) {
        if (!heroSlides || heroSlides.length === 0) return;
        currentHeroIndex = (index + heroDressesList.length) % heroDressesList.length;
        const item = heroDressesList[currentHeroIndex];

        heroSlides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentHeroIndex);
        });

        heroDots.forEach((dot, i) => {
            const isActive = (i === currentHeroIndex);
            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        if (heroCategory) heroCategory.textContent = item.editorial;
        if (heroName) heroName.textContent = item.name;
    }

    function nextHeroSlide() {
        updateHeroSlide(currentHeroIndex + 1);
    }

    function prevHeroSlide() {
        updateHeroSlide(currentHeroIndex - 1);
    }

    function startHeroAutoplay() {
        if (heroSlideInterval) clearInterval(heroSlideInterval);
        heroSlideInterval = setInterval(nextHeroSlide, 4200);
    }

    function stopHeroAutoplay() {
        if (heroSlideInterval) clearInterval(heroSlideInterval);
    }

    if (heroPrevBtn) {
        heroPrevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            prevHeroSlide();
            startHeroAutoplay();
        });
    }

    if (heroNextBtn) {
        heroNextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            nextHeroSlide();
            startHeroAutoplay();
        });
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", (e) => {
            e.stopPropagation();
            updateHeroSlide(index);
            startHeroAutoplay();
        });
    });

    if (heroSlideshowEl) {
        heroSlideshowEl.addEventListener("mouseenter", stopHeroAutoplay);
        heroSlideshowEl.addEventListener("mouseleave", startHeroAutoplay);

        heroSlideshowEl.addEventListener("click", (e) => {
            if (e.target.closest(".slide-nav-btn") || e.target.closest(".page-dot")) return;
            const currentItem = heroDressesList[currentHeroIndex];
            const targetCard = Array.from(dressCards).find(card => card.dataset.id === currentItem.id || card.dataset.name === currentItem.name);
            if (targetCard) {
                openDressModal(targetCard);
            }
        });
    }

    updateHeroSlide(0);


    /* ------------------------------------------------------------------------
       8. COLLECTION CATEGORY FILTER TABS
       === MANUAL EDITING: COLLECTION FILTER LOGIC (C. COLLECTION CATEGORIES) ===
       - Matches the `data-filter` attribute of `.filter-tab` buttons ("all", "gown",
         "romantic", "set") against the `data-category` attribute of each `.dress-card`.
       ------------------------------------------------------------------------ */
    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");

            const filterValue = tab.getAttribute("data-filter");

            dressCards.forEach(card => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    card.classList.remove("hidden-by-filter");
                    card.style.opacity = "0";
                    card.style.transform = "translateY(12px)";
                    setTimeout(() => {
                        card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, 40);
                } else {
                    card.classList.add("hidden-by-filter");
                }
            });
        });
    });


    /* ------------------------------------------------------------------------
       9. CARD-LEVEL VIEW TOGGLE SWITCHER
       ------------------------------------------------------------------------ */
    document.querySelectorAll(".card-photo-toggle .photo-toggle-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".dress-card");
            if (!card) return;

            const targetView = btn.dataset.targetView;
            const dressId = card.dataset.id;
            const catalogItem = dressesCatalog[dressId];
            const cardImg = card.querySelector(".primary-card-img");
            const toggleButtons = card.querySelectorAll(".photo-toggle-btn");

            toggleButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (targetView === "model") {
                if (catalogItem && catalogItem.modelImage) {
                    if (cardImg) {
                        cardImg.src = catalogItem.modelImage;
                        cardImg.alt = `${catalogItem.name} on Model`;
                    }
                } else {
                    openDressModal(card, "model");
                }
            } else {
                if (catalogItem && catalogItem.dressImage) {
                    if (cardImg) {
                        cardImg.src = catalogItem.dressImage;
                        cardImg.alt = `${catalogItem.name} Dress`;
                    }
                }
            }
        });
    });


    /* ------------------------------------------------------------------------
       10. EXPANDED LUXURY DRESS DETAILS MODAL
       === MANUAL EDITING: PRODUCT MODAL FRAME & MODEL VIEW TOGGLE (A & D) ===
       - When `view === "model"` and `activeModalDress.modelImage` exists:
         Adds `.model-view-active` to `#modalImageFrame` and `.is-model-photo`
         to `#modalDressImage` so the model photo fills the inner opening of
         `images/frame.png` (configured via CSS variables in style.css).
       - When `view === "garment"` (Atelier Garment):
         Removes `.model-view-active` and `.is-model-photo` so the cutout dress
         is centered inside the frame with `object-fit: contain`.
       ------------------------------------------------------------------------ */
    let activeModalDress = null;
    let activeModalView = "garment";

    function setModalView(view) {
        if (!activeModalDress) return;
        activeModalView = view;

        if (view === "model") {
            modalDressBtn.classList.remove("active");
            modalModelBtn.classList.add("active");

            if (activeModalDress.modelImage) {
                if (modalImageFrame) modalImageFrame.classList.add("model-view-active");
                modalDressImage.classList.add("is-model-photo");
                modalDressImage.src = activeModalDress.modelImage;
                modalDressImage.alt = `${activeModalDress.name} on Model — Cielona Rentals`;
                modalDressImage.style.display = "block";
                modalModelPlaceholder.style.display = "none";
            } else {
                if (modalImageFrame) modalImageFrame.classList.remove("model-view-active");
                modalDressImage.classList.remove("is-model-photo");
                modalDressImage.style.display = "none";
                modalModelPlaceholder.style.display = "flex";
            }
        } else {
            modalModelBtn.classList.remove("active");
            modalDressBtn.classList.add("active");
            if (modalImageFrame) modalImageFrame.classList.remove("model-view-active");
            modalDressImage.classList.remove("is-model-photo");
            modalDressImage.src = activeModalDress.dressImage;
            modalDressImage.alt = `${activeModalDress.name} Dress — Cielona Rentals`;
            modalDressImage.style.display = "block";
            modalModelPlaceholder.style.display = "none";
        }
    }

    if (modalDressBtn) modalDressBtn.addEventListener("click", () => setModalView("garment"));
    if (modalModelBtn) modalModelBtn.addEventListener("click", () => setModalView("model"));

    function openDressModal(card, initialView = "garment") {
        const dressId = card.dataset.id;
        const catalogItem = dressesCatalog[dressId] || {
            name: card.dataset.name || "Cielona Silhouette",
            category: card.dataset.category || "gown",
            size: card.dataset.size || "Standard",
            price: Number(card.dataset.price) || 650,
            deposit: Number(card.dataset.deposit) || 500,
            description: card.dataset.description || "Curated formal silhouette.",
            dressImage: card.dataset.dressImage || "images/amber.png",
            modelImage: card.dataset.modelImage || null
        };

        activeModalDress = catalogItem;

        modalDressName.textContent = catalogItem.name;
        modalDressSize.textContent = catalogItem.size.toUpperCase();
        modalDressDescription.textContent = catalogItem.description;
        modalDressPrice.textContent = Number(catalogItem.price).toLocaleString("en-PH");
        modalDressDeposit.textContent = `₱${Number(catalogItem.deposit).toLocaleString("en-PH")} PHP`;

        if (modalCopyNotice) modalCopyNotice.textContent = "";

        if (dressSelect) {
            for (let option of dressSelect.options) {
                if (option.value.includes(catalogItem.name)) {
                    dressSelect.value = option.value;
                    break;
                }
            }
        }

        setModalView(initialView);

        dressModal.classList.add("active");
        dressModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("locked");

        if (closeModalBtn) closeModalBtn.focus();
    }

    function closeDressModal() {
        dressModal.classList.remove("active");
        dressModal.setAttribute("aria-hidden", "true");
        if (siteRevealed && !mobileDrawer.classList.contains("active")) {
            document.body.classList.remove("locked");
        }
    }

    dressCards.forEach(card => {
        card.addEventListener("click", (e) => {
            if (e.target.closest(".card-photo-toggle")) return;
            openDressModal(card);
        });

        card.setAttribute("tabindex", "0");
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openDressModal(card);
            }
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeDressModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeDressModal);

    if (modalCopyBtn) {
        modalCopyBtn.addEventListener("click", async () => {
            if (!activeModalDress) return;

            const textToCopy = `Hi Cielona Rentals! ✨ I would love to inquire about renting the ${activeModalDress.name} piece (Size: ${activeModalDress.size}, Rate: ₱${activeModalDress.price} / 3 days). Is this available for my event date? Thank you!`;

            try {
                await navigator.clipboard.writeText(textToCopy);
                modalCopyNotice.textContent = "✓ Inquiry details copied! Ready to paste into Instagram DM.";
                setTimeout(() => {
                    modalCopyNotice.textContent = "";
                }, 4000);
            } catch (err) {
                window.prompt("Copy this inquiry message:", textToCopy);
            }
        });
    }


    /* ------------------------------------------------------------------------
       11. QUICK INQUIRY BUILDER (CONTACT SECTION)
       ------------------------------------------------------------------------ */
    if (copyInquiryBtn) {
        copyInquiryBtn.addEventListener("click", async () => {
            const name = clientNameInput ? clientNameInput.value.trim() || "A Client" : "A Client";
            const dress = dressSelect ? dressSelect.value || "Curated Formal Piece" : "Curated Formal Piece";
            const date = eventDateInput && eventDateInput.value ? eventDateInput.value : "Flexible / To Discuss";
            const city = clientCityInput ? clientCityInput.value.trim() || "Laguna / Nearby Area" : "Laguna / Nearby Area";

            const inquiryMessage =
`Hello Cielona Rentals! ✨
I would like to inquire about reserving a gown:
• Name: ${name}
• Selected Dress: ${dress}
• Target Date: ${date}
• Location: ${city}

Could you please confirm availability and fitting arrangements? Thank you!`;

            try {
                await navigator.clipboard.writeText(inquiryMessage);
                inquiryCopyFeedback.textContent = "✓ Inquiry text copied to clipboard! Ready to send via Instagram.";
                copyInquiryBtn.style.background = "#eef7f0";
                setTimeout(() => {
                    inquiryCopyFeedback.textContent = "";
                    copyInquiryBtn.style.background = "";
                }, 4500);
            } catch (err) {
                window.prompt("Copy your inquiry message:", inquiryMessage);
            }
        });
    }


    /* ------------------------------------------------------------------------
       12. SMOOTH SCROLLING FOR ALL INTERNAL ANCHORS
       ------------------------------------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function(event) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* ------------------------------------------------------------------------
       13. GLOBAL KEYBOARD ACCESSIBILITY (ESC KEY)
       ------------------------------------------------------------------------ */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (dressModal.classList.contains("active")) {
                closeDressModal();
            }
            if (mobileDrawer.classList.contains("active")) {
                toggleMobileDrawer(false);
            }
        }
    });

});