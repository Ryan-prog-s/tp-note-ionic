import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  networkStatus: any;
  networkListener: PluginListenerHandle;

  constructor(public toastCtrl: ToastController) { }

  ngOnInit() {
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus = status;
      console.log('Network status changed', status);
    });
  }

  async openToast() {
      this.getNetWorkStatus();
      const toast = await this.toastCtrl.create({
        message: this.networkStatus.connectionType,
        duration: 5000
      });
      toast.present();
  }

  async getNetWorkStatus() {
    this.networkStatus = await Network.getStatus();
    console.log(this.networkStatus);
  }
}
