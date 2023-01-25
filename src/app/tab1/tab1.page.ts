import { Component } from '@angular/core';
import { ApiService, SysIn } from '../services/api.service';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  addrVal = "";
  unameVal = "";
  passVal = "";
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {
        
  }

  async login(){
    let userlog = this.unameVal + ":" + this.passVal;
    let cred = btoa(userlog);
    environment.api.credent = "Basic " + cred;
    let url = "https://" + this.addrVal + "/rest";
    environment.api.baseUrl = url;
    console.log("Base64: " + environment.api.credent + " url: " + environment.api.baseUrl);

    // TODO: opravit ověření přihlašovaích údajů
    /*
    let stat = this.apiService.getData();
    if(stat == 200){
      const toast = await this.toastController.create({
        message: 'Úspěšné přihlášení!',
        duration: 3000,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => { this.handlerMessage = 'Dismiss clicked'; }
          }
        ]
      });
      await toast.present();
      const { role } = await toast.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
    }
    else{
      const toast = await this.toastController.create({
        message: 'Neúspěšné přihlášení!',
        duration: 3000,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => { this.handlerMessage = 'Dismiss clicked'; }
          }
        ]
      });
      await toast.present();
      const { role } = await toast.onDidDismiss();
      this.roleMessage = `Dismissed with role: ${role}`;
    }
*/

  }

}
