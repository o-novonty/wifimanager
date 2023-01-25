import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
  ) {}

  save(){
    this.apiService.setWiFi(this.ssidVal, this.enVal, this.hideSSIDVal, this.mod, this.channel, this.channelwidth, this.country);
  }

}
