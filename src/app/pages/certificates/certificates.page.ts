import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.page.html',
  styleUrls: ['./certificates.page.scss'],
})
export class CertificatesPage implements OnInit {

  info: any;
  image_url: any;
  book: boolean = false;
  subjectId: any;
  isAuth: boolean = false;
  index: any = 16;
  reviews: any;
  language: any = 'en';

  paramData: any;

  months = ['January', 'Fabrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  isIPad = false;

  BannerOption = {
    initialSlide: 0,
    slidesPerView: 3,
    centeredSlides: false,
    speed: 450,
    spaceBetween: 3,    
  }

  constructor(
    public navCtrl: NavController,
    public alertController: AlertController,
    private services: Services,
    public storage: Storage,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private plt: Platform
  ) {
    this.language = this.services.lang;

    activeRouter.queryParams.subscribe(data => {
      if (router.getCurrentNavigation().extras.state) {
        this.paramData = router.getCurrentNavigation().extras.state.value;
      }
    });

    this.isIPad = plt.is('ipad')
  }

  ngOnInit() {
    this.services.authenticationState.subscribe(state => {
      if (state) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    this.image_url = this.services.image_url;

    this.storage.get('lang').then(value => {
      if (value) {
        this.language = value
      }
      this.teacherInfo(this.paramData.id);
      this.getReviews(this.paramData.id);
    });

    if (typeof this.paramData.subj != 'undefined') {
      this.book = true;
      this.subjectId = this.paramData.subj;
    }
  }

  async AlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alartConfirm',
      message: 'When you choose Yes, you will not be able to return without financial losses',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'yes',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  async successfully() {
    const alert = await this.alertController.create({
      cssClass: 'alartSuccessfully',
      message: `
        <div>
          <div class="iconS">
            <ion-icon name="md-checkmark"></ion-icon>
          </div>
          <div class="headAlart">
            <h2  class="no-margin" >
              <p text-center color="light">Successfully</p>  
            </h2>
            <p  class="no-margin" >
              <p text-center class="bar-button-md-medium">Well that was reall easy</p>
            </p>
          </div>
          <div class="bodyAlart">
            <section margin-bottom>
              <p class="bar-button-md-medium">DATE</p>
              <br>
              <p color="light">October 11,  2019</p>            
            </section>
            <section margin-bottom>
              <p class="bar-button-md-medium">START TIME</p>
              <br>
              <p color="light">03:00 PM</p>            
            </section>
            <section margin-bottom>
              <p class="bar-button-md-medium">Location</p>
              <br>
              <p color="light">Costa Coffee City Tower</p>            
            </section>
            <section margin-bottom>
              <ion-item no-padding>
                <div item-start  class="no-margin" padding-end>
                  <p class="bar-button-md-medium">Kate Mangostar</p>
                  <br>
                  <p color="light">Mathematics Teacher</p>            
                </div>
                <div item-end  class="no-margin" >
                  <img margin-top src="/assets/img/boy.jpg">
                </div>
              </ion-item>
            </section>
            <section margin-bottom>
              <p class="bar-button-md-medium">AMOUNT</p>
              <br>
              <h2>
                <p color="light">30 kd</p>            
              </h2>
            </section>
          </div>
        </div>
      `,
      buttons: ['ok']
    });
    await alert.present();
  }

  calender(userId, subjectId) {
    let extras: NavigationExtras = {
      queryParams: {},
      state: {
        value: { userId: userId, subj: subjectId, subjectTitle: this.paramData.subjName }
      }
    }
    this.navCtrl.navigateForward('calendar', extras);
  }

  teacherInfo(userID) {
    this.services.teacherInfo(userID).subscribe(teachers => {
      this.info = teachers['data'][0];
      console.log(this.info);
    });
  }

  getReviews(userID) {
    this.services.getReviews(userID).subscribe(teachers => {
      this.reviews = teachers['data'];
      console.log('reviews = : ', this.reviews);
    });
  }

  getMonth(date) {
    return this.months[new Date(date).getMonth()] + " " + new Date(date).getFullYear();
  }

  review(userId) {    
    let extras: NavigationExtras = {
      queryParams: {},
      state: {
        id: userId
      }
    }
    this.navCtrl.navigateForward('review', extras);
  }

}
