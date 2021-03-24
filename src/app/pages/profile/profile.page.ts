import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalEventService } from 'src/services/events.service';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: any;
  grade: any;
  subject: any;
  subject_count: any;
  your_subject_count: any;
  all_subject: any;
  salary: any;
  subjectRequest: any;
  imageUrl: any;
  language: any = 'en';
  imageFileName: any;

  BannerOption = {
    initialSlide: 0,
    slidesPerView: 3,    
    centeredSlides: false,
    speed: 450,
    spaceBetween: 3,    
  }

  constructor(
    public navCtrl: NavController,
    public events: GlobalEventService,
    public services: Services,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.imageUrl = this.services.image_url;    
  }

  ionViewWillEnter() {
    this.services.authenticationState.subscribe(state => {
      if (!state) {
        let extras: NavigationExtras = {
          queryParams: {},
          state: {
            from: 'main'
          }
        }
        this.navCtrl.navigateRoot('login', extras);
      }
    });

    this.language = this.services.lang;
    this.imageFileName = 'profile.png';

    this.storage.get('lang').then(value => {
      if (value) {
        this.language = value
      }
      this.getUserData();
    });
  }

  getUserData() {
    this.storage.get('auth-token').then(res => {
      if (res) {
        this.services.getUserData(res.id).subscribe(user => {

          console.log('user data == : ', user);

          this.subjectRequest = user['data'].subjectRequest;
          this.name = user['data'].name;
          this.salary = user['data'].salary;
          this.grade = (this.language == 'ar') ? user['data'].grade_name : user['data'].grade_name_english;
          this.subject = user['data'].subject;
          this.subject_count = user['data'].subject_count;
          this.your_subject_count = user['data'].your_subject_count;
          this.all_subject = user['data'].other_subject;
          this.imageFileName = (user['data'].personalImage) ? user['data'].personalImage : this.imageFileName;

          console.log(user['data']);
        });
      }
    });
  }

  teacherOfSubject(subjectId) {
    //this.router.navigate(['teacherofsubject/' + subjectId]);
    //this.navCtrl.push();
  }

  AccountPage() {
    this.navCtrl.navigateForward('account');
  }

  NotiPage() {
    this.navCtrl.navigateForward('notification');
  }

  singleSubject(subjId) {
    console.log('category : ' + subjId);
    let extras: NavigationExtras = {
      queryParams: {},
      state: {
        id: subjId
      }
    }
    this.navCtrl.navigateForward('teachers', extras);
  }

}
