import { Router, RouterConfiguration } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';

@inject(WebAPI)
export class App {
  message = 'Hello World!';
  router: Router;

  constructor(public api: WebAPI) { }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Contacts';

    config.map([
      { route: '', moduleId: 'no-selection', title: 'Select' },
      { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts', title: 'contacts' }
    ]);

    this.router = router;
  }
}
