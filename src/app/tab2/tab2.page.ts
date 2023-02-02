import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listData = [];
  txt = "";
  handlerMessage = '';
  roleMessage = '';

  ssidVal = "";
  enVal = true;
  hideSSIDVal = false;
  mod = "";
  channel = "";
  channelwidth = "";
  country = "";

  constructor(
    private apiService: ApiService,
    private navCtr: NavController,
    private toastController: ToastController,
    private dataService: DataService
  ) {
    this.loadData();
  }

  //Pro práci s úložištěm
  async loadData() {
    this.listData = await this.dataService.getData();
  }
  async addData() {
    await this.dataService.addData(this.txt);
    this.loadData();
  }

  //Akce tlačítka uložení
  async save() {
    //Odeslání dat API
    let stat = this.apiService.setWiFi(this.ssidVal, this.enVal, this.hideSSIDVal, this.mod, this.channel, this.channelwidth, this.country);

    //Zobrazení informace o stavu uložení - pro WLAN (mobilní telefon)
    let zprava = "Uloženo!";
    if (this.ssidVal != "") {
      this.txt = "SSID: " + this.ssidVal;
      this.addData();
    }
    //Zobrazení informace o stavu uložení - pro LAN
    /*
    let zprava = "Chyba při komunikaci s routerem.";
    if (await stat == 200) {
      zprava = "Úspěšně uloženo!";

      // Uložení SSID Wi-Fi do paměti
      if (this.ssidVal != "") {
        this.txt = "SSID: " + this.ssidVal;
        this.addData();
      }
    }
    if (await stat == 401) {
      zprava = "Nesprávné přihlašovací údaje!";
    }
    */

    const toast = await this.toastController.create({
      message: zprava,
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

}
