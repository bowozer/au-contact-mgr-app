import Spinner = require('spinjs');

export class NoSelection {
    message = "Please select a Contact.";

    attached() {
        let target = document.getElementById('spinCont');
        let spinner = new Spinner({}).spin(target);
    }
}