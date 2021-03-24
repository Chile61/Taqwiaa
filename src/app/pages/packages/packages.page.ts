import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {

  isAuth: boolean = false;
  packages: any;
  language: any = 'en';
  userId: any;
  selectSection: any;

  constructor(
    public navCtrl: NavController,
    public services: Services,
    public loading: LoadingController,
    public storage: Storage,
    private comService: CommonService
  ) {
    this.language = this.services.lang;
  }

  ngOnInit() {
    this.getPackages();
    this.services.authenticationState.subscribe(state => {
      if (state) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    this.storage.get('auth-token').then(res => {
      if (res) {
        this.userId = res.id;
      }
    });
  }

  onSubmitpackage(form: NgForm) {
    let data = {
      pakageId: form.value.pakageId,
      userId: this.userId
    }

    this.comService.presentLoading();
    this.services.buy(data).subscribe(buy => {
      this.comService.hideLoading()
      if (buy['code'] == 1) {
        this.comService.presentToast('Hour Add To Your Balance successfuly');
        this.navCtrl.navigateRoot('tabs');
      }      
    });
  }

  getPackages() {
    this.services.getPackages().subscribe(packages => {
      this.packages = packages['data'];
    });
  }

  LoginPage() {
    this.navCtrl.navigateForward('login');
  }

  getSelectSection(index) {
    this.selectSection = index;
    console.log('select section =====  ', this.selectSection);
  }

}
