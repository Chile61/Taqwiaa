import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Services } from 'src/services/services';
import { ChangeLangPage } from '../pages/change-lang/change-lang.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isAuth: boolean = false;

  constructor(
    public navCtrl: NavController, public services: Services,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.services.authenticationState.subscribe(state => {
      if (state) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    if (this.isAuth == true) {
      // this.navCtrl.navigateRoot('tabs/categories');
    }
  }

  ngAfterViewInit() {
    if (this.isAuth == true) {
      // this.navCtrl.navigateRoot('tabs/categories');
    }
  }

  goToHome() {
    this.navCtrl.navigateRoot('tabs/categories');
  }

  goToLogin() {
    this.navCtrl.navigateForward('login');
  }

  async changeLang() {
    var modal = await this.modalCtrl.create({
      component: ChangeLangPage,
      backdropDismiss: true,
      cssClass: 'lang_modal'
    });
    modal.onDidDismiss().then(data => {
      if (data.role == 'change-lang') {

      }
    });
    modal.present();
  }

}
