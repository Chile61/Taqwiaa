import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

declare var BTPrinter;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loading: any;  

  networkStatus: string = 'on';  

  constructor(
    public alertController: AlertController,
    public loadingctrl: LoadingController, public toastController: ToastController,    
    private translate: TranslateService
  ) {

  }

  async presentAlert(head, msg) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle',
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingctrl.create({
      spinner: 'circles',
      duration: 5500,
      message: 'Please Wait...',
      mode: 'md'
    });
    await this.loading.present();
  }

  async autoHideLoading() {
    this.loading = await this.loadingctrl.create({
      spinner: 'circles',
      duration: 400,
      message: '',
      mode: 'md'
    });
    await this.loading.present();
  }

  async hideLoading() {
    this.loadingctrl.getTop().then(() => {
      this.loadingctrl.dismiss();
    });
  }

  getTranslationWord(word) {
    return new Promise<string>((resolve, reject) => {
      this.translate.get(word).subscribe(res => {
        console.log('====== ', res);
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  
}