import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-change-lang',
  templateUrl: './change-lang.page.html',
  styleUrls: ['./change-lang.page.scss'],
})
export class ChangeLangPage implements OnInit {

  lang: any;

  constructor(
    public translate: TranslateService,
    public storage: Storage,
    public services: Services,
    public modalCtrl: ModalController
  ) {
    this.lang = this.services.lang;
   }

  ngOnInit() {
  }

  changeLang() {
    this.translate.use(this.lang);
    this.storage.set('lang', this.lang);
    this.services.lang = this.lang;
    this.modalCtrl.dismiss();
    setTimeout(() => {
      location.reload();
    }, 1500);    
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}
