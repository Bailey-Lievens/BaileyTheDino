import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        this.folder = this.element.querySelector('.folder-info');

        this.folder.addEventListener("click", this.toggleOpenState.bind(this));
    }

    toggleOpenState() {
        let postWrapper = this.folder.parentElement.querySelector('.posts-wrapper');
        let mapClosedIcon = this.folder.querySelector('.folder-closed');
        let mapOpenIcon = this.folder.querySelector('.folder-open');

        if (postWrapper.style.display === 'flex') {
            mapClosedIcon.style.display = 'block';
            mapOpenIcon.style.display = 'none';
            postWrapper.style.display = 'none';
            return;
        }

        mapClosedIcon.style.display = 'none';
        mapOpenIcon.style.display = 'block';
        postWrapper.style.display = 'flex';
    }
}
