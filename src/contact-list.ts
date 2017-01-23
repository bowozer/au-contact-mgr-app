import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactUpdated, ContactViewed } from './messages';

@inject(WebAPI, EventAggregator)
export class ContactList {
    contactList;
    selectedId = 0;

    constructor(private api: WebAPI, private eventAggr: EventAggregator) {
        eventAggr.subscribe(ContactViewed, msg => this.select(msg.contact));
        eventAggr.subscribe(ContactUpdated, msg => {
            let id = msg.contact.id;
            let found = this.contactList.find(contact => contact.id == id);
            Object.assign(found, msg.contact);
        });
    }

    created() {
        this.api.getContactList().then(list => this.contactList = list);
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}