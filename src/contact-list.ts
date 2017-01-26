import { WebAPI } from './web-api';
import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ContactUpdated, ContactViewed } from './messages';
import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';

@inject(WebAPI, EventAggregator, HttpClient)
export class ContactList {
    contactList;
    selectedId = 0;

    constructor(private api: WebAPI, private eventAggr: EventAggregator, private httpClient: HttpClient) {
        eventAggr.subscribe(ContactViewed, msg => this.select(msg.contact));
        eventAggr.subscribe(ContactUpdated, msg => {
            let id = msg.contact.id;
            let found = this.contactList.find(contact => contact.id == id);
            Object.assign(found, msg.contact);
        });
    }

    created() {
        this.httpClient.fetch('http://localhost:5000/api/contact/')
            .then(response => response.json())
            .then(data => {
                this.contactList = data;
            });
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}