import { Aurelia } from 'aurelia-framework'
import environment from './environment';
import 'whatwg-fetch';
import { HttpClient } from 'aurelia-fetch-client';

//Configure Bluebird Promises.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  // Notice this aurelia.container. This will enable configuring httpClient only once (here)
  // while other component can just inject the HttpClient object (DI)
  let httpClient = aurelia.container.get(HttpClient);
  httpClient.configure(config => {
    config
      .useStandardConfiguration()
      .withDefaults({
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
  });
  aurelia.start().then(() => aurelia.setRoot());
}
