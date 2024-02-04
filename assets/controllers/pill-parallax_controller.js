import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.element.style.transition = 'transform 0.2s ease-out';

        // Mouse location
        document.addEventListener("mousemove", (event) => {
            const speed = this.element.dataset.parallaxSpeed;

            const x = ((event.pageX - window.innerWidth / 2) * speed) / 100;
            const y = ((event.pageY - window.innerHeight / 2) * speed) / 100;

            this.element.style.transform = `translateX(${x}px) translateY(${y}px) rotate(-25deg)`;
        });

        // Mobile orientation location
        document.addEventListener("deviceorientation", (event) => {
            const speed = this.element.dataset.parallaxSpeed;

            const x = ((Math.round(event.beta) - window.innerWidth / 2) * speed) / 100;
            const y = ((Math.round(event.gamma) - window.innerHeight / 2) * speed) / 100;

            this.element.style.transform = `translateX(${x}px) translateY(${y}px) rotate(-25deg)`;
        });
    }
}