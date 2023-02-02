import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  handlerMessage = '';
  roleMessage = '';
  listData = [];

  txt = "";
  wpahVal = "";
  wpa2hVal = "";
  wpaVal = true;
  wpa2Val = true;
  aesVal = true;
  tkipVal = false;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private dataService: DataService
  ) { this.loadData(); }


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
    let stat = this.apiService.setSettings(this.wpahVal, this.wpa2hVal, this.wpaVal, this.wpa2Val, this.aesVal, this.tkipVal);

    //Zobrazení informace o stavu uložení - pro WLAN (mobilní telefon)
    let zprava = "Nastavení dokončeno!";
    this.txt = "WPA2: " + this.wpa2hVal;
    this.addData();

    //Zobrazení informace o stavu uložení - pro LAN
    /*
    let zprava = "Chyba při komunikaci s routerem!";
    if (await stat == 200) {
      zprava = "Nastavení dokončeno!";

      // Uložení hesla Wi-Fi do paměti
      this.txt = "WPA2: " + this.wpa2hVal;
      this.addData();
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
