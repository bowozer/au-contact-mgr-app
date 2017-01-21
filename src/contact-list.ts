import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';

@inject(WebAPI)
export class ContactList {
    contactList;
    selectedId = 0;

    constructor(private api: WebAPI) { }

    created() {
        this.api.getContactList().then(list => this.contactList = list);
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}