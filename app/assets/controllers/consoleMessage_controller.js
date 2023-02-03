import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    connect() {
        console.log('%c Hey there!', 'font-weight: bold; font-size: 50px;color: #f72585; text-shadow: 3px 3px 0 #b5179e , 6px 6px 0 #7209b7 , 9px 9px 0 #560bad');
        console.log('%c How are you?', 'font-weight: bold; font-size: 50px;color: #f72585; text-shadow: 3px 3px 0 #b5179e , 6px 6px 0 #7209b7 , 9px 9px 0 #560bad');
        console.log('%c Send me your ', 'font-weight: bold; font-size: 50px;color: #f72585; text-shadow: 3px 3px 0 #b5179e , 6px 6px 0 #7209b7 , 9px 9px 0 #560bad');
        console.log('%c reply at ', 'font-weight: bold; font-size: 50px;color: #f72585; text-shadow: 3px 3px 0 #b5179e , 6px 6px 0 #7209b7 , 9px 9px 0 #560bad');
        console.log('%c hello@baileylievens.be ', 'font-weight: bold; font-size: 30px;color: #f72585; text-shadow: 3px 3px 0 #b5179e , 6px 6px 0 #7209b7 , 9px 9px 0 #560bad');
    }
}
