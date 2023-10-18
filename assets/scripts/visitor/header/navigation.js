let hamburgerWrapper = document.querySelector(".hamburger-wrapper");
let hamburger1 = document.querySelector(".hamburger-1");
let hamburger2 = document.querySelector(".hamburger-2");
let navigationLinks = document.querySelector(".mobile-navigation-links");
let menuOpen = false;

if (hamburgerWrapper) {
    hamburgerWrapper.addEventListener("click", hamburgerClick);
}

function hamburgerClick() {
    if (menuOpen) {
        hamburger1.style.transform = "rotate(0deg)";
        hamburger2.style.transform = "rotate(0deg)";
        navigationLinks.style.right = "-250px";
        menuOpen = false;
    } else {
        hamburger1.style.transform = "rotate(45deg)";
        hamburger2.style.transform = "rotate(-45deg)";
        navigationLinks.style.right = "-70px";
        hamburger1.style.display = "relative"
        hamburger1.style.top = "1px"
        menuOpen = true;
    }
}