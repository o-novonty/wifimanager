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

  constructor(
    private apiService: ApiService,
    private toastController: ToastController,
    private dataService: DataService
  ) { this.loadData();}

  wpahVal = "";
  wpa2hVal = "";
  wpaVal = true;
  wpa2Val = true;
  aesVal = true;
  tkipVal = false;

  async loadData(){
  
    this.listData = await this.dataService.getData();
  }
  
  async addData(){
    await this.dataService.addData(this.txt);
    this.loadData();
  }

  async save() {
    // Volat servisku
    this.apiService.setSettings(this.wpahVal, this.wpa2hVal, this.wpaVal, this.wpa2Val, this.aesVal, this.tkipVal);
    this.txt = "WPA2: " + this.wpa2hVal;
    this.addData();

    const toast = await this.toastController.create({
      message: 'Nastavení dokončeno!',
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
