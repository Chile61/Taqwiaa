import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {

  about: any;
  about_english: any;
  language: any = 'en';

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public services: Services
  ) {
    this.language = this.services.lang;
  }

  ngOnInit() {
    this.getSetting();
  }

  getSetting() {
    this.services.getSetting().subscribe(data => {
      this.about = data['about_us'];
      this.about_english = data['about_us_english'];
    });
  }

}
