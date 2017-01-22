import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { areEqual } from './utility';

interface Contact {
    firstName: string;
    lastName: string;
    email: string;
}

@inject(WebAPI)
export class ContactDetail {
    routeConfig;
    contact: Contact;
    oriContact: Contact;

    constructor(private api: WebAPI) { }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;

        return this.api.getContactDetails(params.id).then(contact => {
            this.contact = <Contact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.oriContact = JSON.parse(JSON.stringify(this.contact));
        });
    }

    // this is a readonly property
    get canSave() {
        return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
    }

    save() {
        this.api.saveContact(this.contact).then(contact => {
            this.contact = <Contact>contact;
            this.routeConfig.navModel.setTitle(this.contact.firstName);
            this.oriContact = JSON.parse(JSON.stringify(this.contact));
        });
    }

    canDeactivate() {
        if (!areEqual(this.oriContact, this.contact)) {
            return confirm('You have unsaved changes. Are you sure you wish to leave?');
        }

        return true;
    }
}   