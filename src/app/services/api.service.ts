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

//import 'rxjs/add/ob';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';
import { on } from 'events';
import { stringify } from 'querystring';
import { ToastController } from '@ionic/angular';

export interface SysIn {
  model: string;
  revision: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  dataReceived: string = "";
  handlerMessage = '';
  roleMessage = '';

  constructor(private http: HttpClient,
    private toastController: ToastController,) { }


    async getData(){
      const url = '/system/routerboard?.proplist=model,revision';
      const options = {
        method: 'GET',
      url: environment.api.baseUrl + url,
      headers: {
        'Authorization': environment.api.credent,
        'Content-Type': 'application/json'
      }
      };
      const response: HttpResponse = await Http.get(options);
      // TODO: opravit ověření přihlašovaích údajů
      /*const response: HttpResponse = await Http.get(options);
      return response.status*/
    
    }

  /**
   * Nastavení Wi-Fi
   * 
   * @param ssid
   * @param on
   * @param hideSSID
   */
  setWiFi(ssid: string, on: boolean, hideSSID: boolean, mod: string, channel: string, channelwidth: string, country: string) {
    const url = '/interface/wireless/wlan1';
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
      Http.patch(options);
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
      console.log("Posílám")
      Http.patch(options);
    }

  }

  /**
   * Nastavení zabezpečení
   * 
   */
  setSettings(wpahVal: string, wpa2hVal: string, wpaVal: boolean, wpa2Val: boolean, aesVal: boolean, tkipVal: boolean) {
    const url = '/interface/wireless/security-profiles/profile1';

    if (wpa2Val && wpaVal) {
      const data1 = {
        method: 'PATCH',
        url: environment.api.baseUrl + url,
        headers: {
          'Authorization': environment.api.credent,
          'Content-Type': 'application/json'
        },
        data: {
          "authentication-types": "wpa2-psk,wpa-psk",
          "wpa-pre-shared-key": wpahVal,
          "wpa2-pre-shared-key": wpa2hVal
        }
      }
      Http.patch(data1);
    }
    else {
      if (wpaVal) {
        const data1 = {
          method: 'PATCH',
          url: environment.api.baseUrl + url,
          headers: {
            'Authorization': environment.api.credent,
            'Content-Type': 'application/json'
          },
          data: {
            "authentication-types": "wpa-psk",
            "wpa-pre-shared-key": wpahVal
          }
        }
        Http.patch(data1);
      }
      if (wpa2Val) {
        const data1 = {
          method: 'PATCH',
          url: environment.api.baseUrl + url,
          headers: {
            'Authorization': environment.api.credent,
            'Content-Type': 'application/json'
          },
          data: {
            "authentication-types": "wpa2-psk",
            "wpa2-pre-shared-key": wpa2hVal
          }
        }
        Http.patch(data1);
      }
    }

    if (aesVal && tkipVal) {
      const data2 = {
        method: 'PATCH',
        url: environment.api.baseUrl + url,
        headers: {
          'Authorization': environment.api.credent,
          'Content-Type': 'application/json'
        },
        data: {
          "group-ciphers": "aes-ccm,tkip",
          "unicast-ciphers": "aes-ccm,tkip"
        }
      }
      Http.patch(data2);
    }
    else {
      if (aesVal) {
        const data2 = {
          method: 'PATCH',
          url: environment.api.baseUrl + url,
          headers: {
            'Authorization': environment.api.credent,
            'Content-Type': 'application/json'
          },
          data: {
            "group-ciphers": "aes-ccm",
            "unicast-ciphers": "aes-ccm"
          }
        }
        Http.patch(data2);
      }
      if (tkipVal) {
        const data2 = {
          method: 'PATCH',
          url: environment.api.baseUrl + url,
          headers: {
            'Authorization': environment.api.credent,
            'Content-Type': 'application/json'
          },
          data: {
            "group-ciphers": "tkip",
            "unicast-ciphers": "tkip"
          }
        }
        Http.patch(data2);
      }
    }
  }
}