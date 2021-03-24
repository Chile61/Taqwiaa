import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  slider: any;
  subject: any;
  orgSubject: any;
  imageUrl: any;
  language: any = 'en';

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    loop: true
  }

  BannerOption = {
    initialSlide: 0,
    slidesPerView: 3,    
    centeredSlides: false,
    speed: 450,
    spaceBetween: 3,
  }

  isIPad = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    private services: Services,
    private comService: CommonService,
    private plt: Platform
  ) {
    this.language = this.services.lang;
    this.storage.get('lang').then(value => {
      if (value) {
        this.language = value
      }
      this.getSlider();
    });

    this.isIPad = plt.is('ipad')
  }

  ngOnInit() {
    this.imageUrl = this.services.image_url;    
  }

  getSlider() {
    this.services.getSlider().subscribe(slider => {      
      this.slider = slider['data'];
    });
    this.comService.presentLoading();
    this.services.getCategorySubject().subscribe(subject => {
      console.log('categpries data === ', JSON.stringify(subject));
      this.comService.hideLoading();
      this.subject = subject['data'];
    }, error => {
      console.log('categpries error === ', JSON.stringify(error));
    });
  }

  singleSubject(subjId) {
    console.log('category : ' + subjId);
    let extras: NavigationExtras = {
      queryParams: {},
      state: {
        id: subjId
      }
    }
    this.navCtrl.navigateForward("teachers", extras);
  }

  getItems(ev: any) {    
    const val = ev.target.value;
    
    if (val && val.trim() != '') {
      this.services.getCategorySubject().subscribe(subject => {
        this.subject = subject['data'];

        if (this.language == 'en') {
          this.subject = this.subject.filter((item) => {
            item.subject = item.subject.filter((i) => {
              return (i.subject_title_english.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            return item;
          });
        } else {
          this.subject = this.subject.filter((item) => {
            item.subject = item.subject.filter((i) => {
              return (i.subject_title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            return item;
          });
        }
      });
    } else {
      this.services.getCategorySubject().subscribe(subject => {
        this.subject = subject['data'];
      });
    }
  }

  async showRadio() {
    let alert = await this.alertCtrl.create({
      header: this.language == 'en' ? 'Filters' : 'مرشحات',
      inputs: [
        {
          type: 'radio',
          label: ((this.language == 'en') ? 'Latest' : 'الاحدث'),
          value: '0',
          checked: true
        },
        {
          type: 'radio',
          label: ((this.language == 'en') ? 'Most Recommended' : 'الاكثر طلبا'),
          value: '1'
        }
      ],
      buttons: [
        {
          text: (this.language == 'en') ? 'Cancel' : 'الغاء',
          role: 'cancel'
        },
        {
          text: ((this.language == 'en') ? 'OK' : 'تم'),
          handler: data => {
            if (data == 0) {
              this.subject = this.subject.filter((item) => {
                item.subject.sort(function (a, b) {
                  return b.subject_id - a.subject_id;
                });

                return item;
              });
            } else {
              this.subject = this.subject.filter((item) => {
                item.subject.sort(function (a, b) {
                  return b.lecture_count - a.lecture_count;
                });

                return item;
              });
            }
          }
        }
      ]
    });    
    alert.present();
  }

}
