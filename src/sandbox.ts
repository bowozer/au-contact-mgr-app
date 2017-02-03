import { inject, View } from 'aurelia-framework';
import 'whatwg-fetch';
import { HttpClient, json } from 'aurelia-fetch-client';
import * as $ from 'jquery';
import { TokenModel } from './model/token-model';

@inject(HttpClient)
export class Sandbox {
  clientCredClaimList;

  constructor(private httpClient: HttpClient) { }

  created(owningView: View, myView: View) {

  }

  clientCredentialsLogin() {
    let cred = {
      grant_type: 'client_credentials',
      client_id: 'contact-mgr-client',
      client_secret: 'contact-mgr-secret'
    };

    this.httpClient
      .fetch('/connect/token', {
        method: 'post',
        body: $.param(cred),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem('client_credentials_token', JSON.stringify(data));
      });
  }

  clientCredentialsLogout() {
    sessionStorage.removeItem('client_credentials_token');
    this.clientCredClaimList = [];
  }

  getClientCredIdentityApi() {
    let credToken = sessionStorage.getItem('client_credentials_token');
    let token: TokenModel = JSON.parse(credToken) as TokenModel;

    if (token) {
      // only send the api request if logged in. To avoid error console.
      this.httpClient
        .fetch('/identity', {
          headers: {
            'Authorization': token.token_type + ' ' + token.access_token
          }
        })
        .then(response => response.json())
        .then(data => {
          this.clientCredClaimList = data;
        });
    }
  }
}
