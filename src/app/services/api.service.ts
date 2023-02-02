import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SystemInfo } from '../models/systemInfo.model';
import '@capacitor-community/http';
import { isPlatform } from '@ionic/angular';
import { from } from 'rxjs';
import { map } from 'rxjs';
import { Http } from '@capacitor-community/http';
import { HttpOptions, HttpResponse } from '@capacitor/core';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { on } from 'events';
import { stringify } from 'querystring';
import { ToastController } from '@ionic/angular';
import { stat } from 'fs';

export interface SysIn {
  model: string;
  revision: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //dataReceived: string = "";
  //handlerMessage = '';
  //roleMessage = '';

  constructor(private http: HttpClient,
    private toastController: ToastController
  ) { }

  /**
   * Ověření přihlašovacích údajů
   * 
   * 
   */
  async getData() {
    let stat: number;
    const url = '/system/routerboard?.proplist=model,revision';
    const options = {
      method: 'GET',
      url: environment.api.baseUrl + url,
      headers: {
        'Authorization': environment.api.credent,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response: HttpResponse = await Http.get(options);
      stat = response.status.valueOf();
      return stat;
    }
    catch (UnknownHostException) {
      return 60;
    }
  }

  /**
   * Nastavení Wi-Fi
   * 
   * 
   */
  async setWiFi(ssid: string, on: boolean, hideSSID: boolean, mod: string, channel: string, channelwidth: string, country: string) {
    const url = '/interface/wireless/wlan1';
    let stat: number;
    if (ssid == "") {
      const options = {
        method: 'PATCH',
        url: environment.api.baseUrl + url,
        headers: {
          'Authorization': environment.api.credent,
          'Content-Type': 'application/json'
        },
        data: {
          'disabled': !on
        }
      };
      try {
        const response: HttpResponse = await Http.patch(options);
        stat = response.status.valueOf();
        return stat;
      }
      catch (UnknownHostException) {
        return 60;
      }

    }
    else {
      const options = {
        method: 'PATCH',
        url: environment.api.baseUrl + url,
        headers: {
          'Authorization': environment.api.credent,
          'Content-Type': 'application/json'
        },
        data: {
          'band': mod,
          'channel-width': channelwidth,
          'country': country,
          'frequency': channel,
          'ssid': ssid,
          'disabled': !on,
          'hide-ssid': hideSSID
        }
      };
      try {
        const response: HttpResponse = await Http.patch(options);
        stat = response.status.valueOf();
        return stat;
      }
      catch (UnknownHostException) {
        return 60;
      }
    }
  }

  /**
   * Nastavení zabezpečení
   * 
   * 
   */
  async setSettings(wpahVal: string, wpa2hVal: string, wpaVal: boolean, wpa2Val: boolean, aesVal: boolean, tkipVal: boolean) {
    const url = '/interface/wireless/security-profiles/profile1';
    let zabezpeceni = "";
    let sifrovani = "";
    let stat: number;

    if (wpa2Val && wpaVal) {  zabezpeceni = "wpa2-psk,wpa-psk"  }
    else {
      if (wpaVal) { zabezpeceni = "wpa-psk";  }
      if (wpa2Val) {  zabezpeceni = "wpa2-psk"; }
    }

    if (aesVal && tkipVal) {  sifrovani = "aes-ccm,tkip"; }
    else {
      if (aesVal) { sifrovani = "aes-ccm";  }
      if (tkipVal) {  sifrovani = "tkip"; }
    }

    const options = {
      method: 'PATCH',
      url: environment.api.baseUrl + url,
      headers: {
        'Authorization': environment.api.credent,
        'Content-Type': 'application/json'
      },
      data: {
        "authentication-types": zabezpeceni,
        "wpa-pre-shared-key": wpahVal,
        "wpa2-pre-shared-key": wpa2hVal,
        "group-ciphers": sifrovani,
        "unicast-ciphers": sifrovani
      }
    }
    try {
      const response: HttpResponse = await Http.patch(options);
      stat = response.status.valueOf();
      return stat;
    }
    catch (UnknownHostException) {
      return 60;
    }
  }

}