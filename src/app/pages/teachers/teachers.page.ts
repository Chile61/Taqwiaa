import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {

  teachers: any = [];
  slider: any;
  imageUrl: any;
  subject_title: any;
  teacher: any;
  language: any = 'en';

  sliderConfig = {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    loop: true
  }

  paramData: any;

  isIPad = false;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage,
    private services: Services,
    private comService: CommonService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private plt: Platform
  ) {
    this.language = this.services.lang;
    this.storage.get('lang').then(value => {
      if (value) {
        this.language = value
      }
      this.getSlider();
    });

    activeRouter.queryParams.subscribe(data => {
      if (router.getCurrentNavigation().extras.state) {
        this.paramData = router.getCurrentNavigation().extras.state.id;
      }
    })

    this.isIPad = plt.is('ipad')
  }

  ngOnInit() {
    this.imageUrl = this.services.image_url;
  }

  ionViewWillEnter() {
    this.language = this.services.lang;
    this.storage.get('lang').then(value => {
      if (value) {
        this.language = value
      }
      this.getSlider();
      this.getTeachers();
    });
  }

  getTeachers() {
    if (this.paramData) {
      let subjID = this.paramData
      this.comService.presentLoading();
      this.services.getTeachersOfSubject(subjID).subscribe(teachers => {
        this.comService.hideLoading()
        this.teachers = teachers['data'][0].teacher;
        this.subject_title = (this.language == 'en') ? teachers['data'][0].subject_title_english : teachers['data'][0].subject_title;
        console.log('teacher data with id = : ', this.teachers);
      });
    } else {
      this.comService.presentLoading();
      this.services.getTeachers().subscribe(teachers => {
        this.comService.hideLoading()
        this.teachers = teachers['data'];
        this.subject_title = (this.language == 'en') ? 'Top Teachers' : 'كل المدرسين';
        console.log('teacher data no id = : ', this.teachers);
      });
    }
  }

  singleTeacher(userId) {
    if (this.paramData) {      
      let extras: NavigationExtras = {
        queryParams: {},
        state: {
          value: { id: userId, subj: this.paramData, subjName: this.subject_title }
        }
      }
      this.navCtrl.navigateForward('certificates', extras);
    } else {
      let extras: NavigationExtras = {
        queryParams: {},
        state: {
          value: { id: userId }
        }
      }
      this.navCtrl.navigateForward('certificates', extras);
    }
  }

  getSlider() {
    this.services.getSlider().subscribe(slider => {
      this.slider = slider['data'];
    });
  }

  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '') {
      if (this.paramData) {
        let subjID = this.paramData
        this.services.getTeachersOfSubject(subjID).subscribe(teachers => {
          this.teachers = teachers['data'][0].teacher;
          this.teachers = this.teachers.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        });
      } else {
        this.services.getTeachers().subscribe(teachers => {
          this.teachers = teachers['data'];
          this.teachers = this.teachers.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          });
        });
      }
    } else {
      this.getTeachers();
    }
  }

  async showRadio2() {
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
        },
        {
          type: 'radio',
          label: ((this.language == 'en') ? 'Rating' : 'التقييم'),
          value: '2',
        },
        {
          type: 'radio',
          label: ((this.language == 'en') ? 'Job' : 'الوظيفة'),
          value: '3',
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
              this.teachers.sort(function (a, b) {
                return b.id - a.id;
              });
            } else if (data == 1) {
              this.teachers.sort(function (a, b) {
                return b.students - a.students;
              });
            } else if (data == 2) {
              this.teachers.sort(function (a, b) {
                return b.rank - a.rank;
              });
            } else if (this.language == 'ar') {
              this.teachers.sort(function (a, b) {
                return (a.job.job_name < b.job.job_name) ? -1 : (a.job.job_name > b.job.job_name) ? 1 : 0;
              });
            } else {
              this.teachers.sort(function (a, b) {
                return (a.job.job_name_english < b.job.job_name_english) ? -1 : (a.job.job_name_english > b.job.job_name_english) ? 1 : 0;
              });
            }

            console.log(data);
            console.log(this.teachers);
          }
        }
      ]
    });
    alert.present();
  }

}
