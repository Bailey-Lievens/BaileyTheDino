import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        document.querySelector('.error-wrapper .error-close').addEventListener('click', function () {
            document.querySelector('.error-wrapper').classList.add('error-hidden');
        });
    }
}
