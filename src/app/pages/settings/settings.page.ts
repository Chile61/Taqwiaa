import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Services } from 'src/services/services';
import { ChangeLangPage } from '../change-lang/change-lang.page';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  slider: any;
  imageUrl: any;
  language: any = 'en';
  isAuth: boolean = false;

  pages: Array<Object> = [
    { title: 'Become a Teacher', icon: 'browsers', component: 'teachers' },
    { title: 'Packages', icon: 'cash', component: 'packages' },
    { title: 'Contact Us', icon: 'person', component: 'contact' },
    { title: 'About Us', icon: 'information-circle', component: 'aboutus' },
    { title: 'Privacy Policy', icon: 'checkmark', component: 'terms' },
    { title: 'Help Center', icon: 'help-buoy', component: 'contact' },
    { title: 'Welcome', icon: 'help-buoy', component: 'home' },
    { title: 'Calendar', icon: 'help-buoy', component: 'calendar' },
    { title: 'Review', icon: 'help-buoy', component: 'reviews' },
    { title: 'Advertise', icon: 'megaphone', component: 'contact' }
  ];

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    loop: true
  }

  constructor(
    public navCtrl: NavController,
    public translate: TranslateService,
    public services: Services,
    public storage: Storage,
    private modalCtrl: ModalController,
    private iab: InAppBrowser,
    private spinnerDialog: SpinnerDialog
  ) {
    this.language = this.services.lang;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.services.authenticationState.subscribe(state => {
      if (state) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
    this.imageUrl = this.services.image_url;

    this.getSlider();
  }

  getSlider() {
    this.services.getSlider().subscribe(slider => {
      console.log(slider);
      this.slider = slider['data'];
    });
  }

  logout() {
    this.services.logout();
    this.navCtrl.navigateRoot('tabs/categories')
  }

  LoginPage() {
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

  navigate(component) {
    this.navCtrl.navigateForward(component);
  }

  becomeTeacher() {
    let option: InAppBrowserOptions = {
      beforeload: 'yes',
      clearcache: 'no',
      cleardata: 'no',
      clearsessioncache: 'no',
      fullscreen: 'yes',
      hardwareback: 'yes',
      hidespinner: 'no',
      location: 'yes',
      usewkwebview: 'yes',
      hideurlbar: 'yes',
      hidenavigationbuttons: 'yes',
      toolbar: 'no',
      footer: 'no',
      presentationstyle: 'fullscreen'
    }

    const browser = this.iab.create('http://taqwiaa.com/register', '_blank', option);

    browser.on('loadstart').subscribe(res => {
      this.spinnerDialog.show('', "Please wait for a while", true, { overlayOpacity: 1.00 });
      browser.show();      
    });

    browser.on('beforeload').subscribe(res => {
      this.spinnerDialog.show('', "Please wait for a while", true, { overlayOpacity: 1.00 });
      browser.show();
    });
    browser.on('loadstop').subscribe(res => {      
      this.spinnerDialog.hide();
    });

    browser.on('exit').subscribe(res => {     
      this.spinnerDialog.hide();
    });
  }

}
