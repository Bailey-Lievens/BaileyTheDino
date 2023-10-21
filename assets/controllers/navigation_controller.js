import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.hamburgerWrapper = this.element.querySelector(".hamburger-wrapper");
        this.hamburger1 = this.element.querySelector(".hamburger-1");
        this.hamburger2 = this.element.querySelector(".hamburger-2");
        this.navigationLinks = this.element.querySelector(".mobile-navigation-links");
        this.menuOpen = false;

        this.hamburgerWrapper.addEventListener("click", this.hamburgerClick.bind(this));
    }

    hamburgerClick() {
        if (this.menuOpen) {
            this.hamburger1.style.transform = "rotate(0deg)";
            this.hamburger2.style.transform = "rotate(0deg)";
            this.navigationLinks.style.right = "-250px";
            this.menuOpen = false;
        } else {
            this.hamburger1.style.transform = "rotate(45deg)";
            this.hamburger2.style.transform = "rotate(-45deg)";
            this.navigationLinks.style.right = "-70px";
            this.hamburger1.style.display = "relative"
            this.hamburger1.style.top = "1px"
            this.menuOpen = true;
        }
    }
}
