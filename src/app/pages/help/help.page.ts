import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  help_center: any;
  help_center_english: any;
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
      this.help_center = data['help_center'];
      this.help_center_english = data['help_center_english'];
    });
  }

}
