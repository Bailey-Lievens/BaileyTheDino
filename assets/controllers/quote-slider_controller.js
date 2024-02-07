import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.lastPageX = 0;
        this.velocity = 0;
        this.timestamp = 0;
        this.frame = null;

        this.element.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.element.classList.add('dragging');
            this.startX = e.pageX - this.element.offsetLeft;
            this.scrollLeft = this.element.scrollLeft;
            this.timestamp = Date.now();
            this.velocity = 1;
        });

        this.element.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.element.offsetLeft;
            const drag = x - this.startX;
            this.frame = this.scrollLeft - drag;
            this.element.scrollLeft = this.frame;
            this.velocity = (this.frame - this.lastPageX) / (Date.now() - this.timestamp);
            this.lastPageX = this.frame;
            this.timestamp = Date.now();
        });

        this.element.addEventListener('mouseup', () => this.stopDrag());
        this.element.addEventListener('mouseleave', () => this.isDragging && this.stopDrag());
    }

    stopDrag() {
        this.isDragging = false;
        this.element.classList.remove('dragging');
        const friction = .992;
        requestAnimationFrame(() => this.glide(friction));
    }

    glide(friction) {
        if (!friction || Math.abs(this.velocity) < 0.5) return;
        requestAnimationFrame(() => this.glide(friction));
        this.element.scrollLeft += this.velocity;
        this.velocity *= friction;
    }
}