// NAVBAR SCROLL
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
});


// MENU MOBILE
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});


// TUTUP MENU SETELAH DIKLIK
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");
    });
});


// SMOOTH SCROLL
let scrollAnimationFrame = null;

function scrollToTarget(target) {
    if (scrollAnimationFrame !== null) {
        cancelAnimationFrame(scrollAnimationFrame);
    }

    const startY = window.scrollY;
    const scrollOffset = parseFloat(
        getComputedStyle(document.documentElement).scrollPaddingTop
    ) || 0;
    const targetY = Math.max(
        0,
        Math.min(
            document.documentElement.scrollHeight - window.innerHeight,
            target.getBoundingClientRect().top + startY - scrollOffset
        )
    );
    const distance = targetY - startY;

    if (Math.abs(distance) < 1) {
        return;
    }

    const duration = Math.min(850, Math.max(300, Math.abs(distance) * 0.35));
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo({
            top: startY + distance * easedProgress,
            behavior: "instant"
        });

        if (progress < 1) {
            scrollAnimationFrame = requestAnimationFrame(animateScroll);
        } else {
            scrollAnimationFrame = null;
        }
    }

    scrollAnimationFrame = requestAnimationFrame(animateScroll);
}

function cancelScrollAnimation() {
    if (scrollAnimationFrame !== null) {
        cancelAnimationFrame(scrollAnimationFrame);
        scrollAnimationFrame = null;
    }
}

window.addEventListener("wheel", cancelScrollAnimation, { passive: true });
window.addEventListener("touchstart", cancelScrollAnimation, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            event.preventDefault();
            scrollToTarget(document.documentElement);
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();
            scrollToTarget(target);
        }
    });
});


// COUNTDOWN EVENT
const eventDate = new Date("October 24, 2026 09:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    const countdownEndedMessage = document.getElementById("eventEnded");

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        countdownEndedMessage.hidden = false;
        return;
    }

    countdownEndedMessage.hidden = true;
    document.getElementById("days").textContent =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((distance / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((distance / (1000 * 60)) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((distance / 1000) % 60);
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ANIMASI ACAK PER JENIS ELEMEN
const revealGroups = [
    ".hero-content > :not(.event-info):not(.countdown):not(.countdown-panel):not(.hero-buttons), .section-heading > *, .expect-intro > *, .feedback-content > :not(.feedback-form)",
    ".event-info > *, .countdown > div, .countdown-panel > .event-ended, .hero-buttons > *",
    ".stats > *",
    ".feature",
    ".gallery img",
    ".cta > *",
    ".feedback-form > *, .feedback-form label > *",
    "footer > .footer-logo, footer > div:not(.footer-links) > p, footer > .copyright",
    ".footer-links a"
];
const revealAnimationClasses = [
    "reveal--from-left",
    "reveal--from-right",
    "reveal--from-top",
    "reveal--from-bottom"
];

revealGroups.forEach(function (selector) {
    const animationClass =
        revealAnimationClasses[Math.floor(Math.random() * revealAnimationClasses.length)];

    document.querySelectorAll(selector).forEach(function (element, index) {
        element.classList.add("reveal", animationClass);
        element.style.transitionDelay = (index % 4) * 0.12 + "s";
    });
});

const animatedElements = document.querySelectorAll(".reveal");


// DETEKSI ELEMEN YANG MASUK KE LAYAR
const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            entry.target.classList.toggle("show", entry.isIntersecting);
        });
    },
    {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
    }
);


// JALANKAN ANIMASI
animatedElements.forEach(function (element) {
    observer.observe(element);
});


// REGISTRATION DIALOG
const registrationDialog = document.getElementById("registrationDialog");
const registrationForm = document.getElementById("registrationForm");
const registrationStatus = document.getElementById("registrationStatus");

function closeRegistrationDialog() {
    if (!registrationDialog.open || registrationDialog.classList.contains("is-closing")) {
        return;
    }

    registrationDialog.classList.add("is-closing");
}

document.querySelectorAll("[data-open-registration]").forEach(function (button) {
    button.addEventListener("click", function () {
        navLinks.classList.remove("show");
        registrationDialog.classList.remove("is-closing");
        registrationDialog.showModal();
    });
});

document.querySelector("[data-close-registration]").addEventListener("click", function () {
    closeRegistrationDialog();
});

registrationDialog.addEventListener("click", function (event) {
    if (event.target === registrationDialog) {
        closeRegistrationDialog();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && registrationDialog.open) {
        event.preventDefault();
        closeRegistrationDialog();
    }
});

registrationDialog.addEventListener("animationend", function (event) {
    if (event.target === registrationDialog && registrationDialog.classList.contains("is-closing")) {
        registrationDialog.close();
        registrationDialog.classList.remove("is-closing");
    }
});

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    registrationStatus.hidden = false;
    registrationStatus.textContent =
        "Form belum terhubung ke sistem pendaftaran, jadi data belum dikirim.";
});

const feedbackForm = document.getElementById("feedbackForm");
const feedbackStatus = document.getElementById("feedbackStatus");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();
    feedbackStatus.hidden = false;
    feedbackStatus.textContent =
        "Terima kasih atas masukannya. Form ini belum terhubung ke server, jadi masukan belum terkirim.";
});