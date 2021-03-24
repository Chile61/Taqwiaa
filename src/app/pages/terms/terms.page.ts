import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public services: Services
  ) { }

  ngOnInit() {
  }

}
