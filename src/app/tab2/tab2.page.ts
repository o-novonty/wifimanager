import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listData = [];
  txt = "";

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
    private dataService: DataService
  ) {
    this.loadData();
  }

async loadData(){
  
  this.listData = await this.dataService.getData();
}

async addData(){
  await this.dataService.addData(this.txt);
  this.loadData();
}

  save(){
    console.log("SSID: " + this.ssidVal + " enable: " + this.enVal + " hideSSID: " + this.hideSSIDVal + " mód: " + this.mod + 
    " channel: " + this.channel + " channel-width: " + this.channelwidth + " country: " + this.country);
    this.apiService.setWiFi(this.ssidVal, this.enVal, this.hideSSIDVal, this.mod, this.channel, this.channelwidth, this.country);
    
    if(this.ssidVal != ""){
      this.txt = "SSID: " + this.ssidVal;
      this.addData();
    }
    
  }

}
