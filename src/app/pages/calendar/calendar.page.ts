import { ApplicationRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';
import { GlobalEventService } from 'src/services/events.service';
import { Services } from 'src/services/services';
import { LocationPage } from '../location/location.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  @ViewChild("daysSlide", { read: ElementRef, static: true }) daysSlide: ElementRef;

  CURRENT_DATE = new Date();
  d = new Date();

  content = 'January February March April May June July August September October November December'.split(' ');
  content1 = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
  weekDayName = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weekDaysName = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  days: any[] = [];
  dateToHighlight: any;
  month: any;
  startDay: any;
  indexDay: any;
  numDay: any;
  CurrentMonth: any;
  nextDate: any;
  nowDate: any;
  timee: any[] = ['PM', 'AM'];
  time: any = this.timee[0];
  stime: any = this.time.toLowerCase();
  image_url: any;
  selectedHour: any;
  duration: any;
  info: any;
  price: any;
  subject: any;
  subjName: any;
  location: any = '31.2453,29.9654113';
  language: any = 'en';
  iframe: any;
  maplocation: any;
  smonth: any;

  BannerOption = {
    initialSlide: 7,
    slidesPerView: 7,    
    centeredSlides: false,
    speed: 450,
    spaceBetween: 7,    
  }

  numOptions = {
    initialSlide: 0,
    slidesPerView: 6,    
    centeredSlides: false,
    speed: 450,
    spaceBetween: 1,    
  }  

  paramData: any;
  currentWeekDay: any;
  currentDate: any;  

  constructor(
    public navCtrl: NavController,
    private sanitized: DomSanitizer,
    public services: Services,
    private geolocation: Geolocation,
    public storage: Storage,
    public modalCtrl: ModalController,
    public event: GlobalEventService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private comService: CommonService,
    private applicationRef: ApplicationRef
  ) {
    this.iframe = `<iframe width="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCQz0gXRxL6CjTPgVGwkJt-oQlPxFW-AIQ&q=` + this.location + `" allowfullscreen></iframe>`;
    this.iframe = this.sanitized.bypassSecurityTrustHtml(this.iframe);

    this.event.getObservable().subscribe(data => {
      if (data.event == 'pickup') {
        this.location = data.lat + ',' + data.lng;
      }
    });

    activeRouter.queryParams.subscribe(data => {
      if (router.getCurrentNavigation().extras.state) {
        this.paramData = router.getCurrentNavigation().extras.state.value;
      }
    });

    this.language = this.services.lang;
  }

  ngOnInit() {
    this.image_url = this.services.image_url;
    setTimeout(() => {
      let year = this.d.getUTCFullYear();
      let month = this.d.getUTCMonth();
      let date = this.d.getUTCDate();
      this.CurrentMonth = (this.content[month] + ', ' + year);
      this.smonth = this.content1[month];
      this.numDay = date;
      console.log('numDay== ', this.numDay)
      this.subjName = this.paramData.subjectTitle;

      this.myCalendar();      
      this.getTeacherSubject();
    }, 1000);
  }

  ngAfterViewInit() {    
    this.currentWeekDay = new Date().getDay();
    this.currentDate = new Date().getDate();
  }

  bookNow() {
    let data = {};

    this.storage.get('auth-token').then(res => {
      if (res) {
        data = {
          selectedHour: this.selectedHour,
          duration: this.duration,
          location: this.location,
          price: this.price,
          time: this.time,
          subjectId: this.paramData.subj,
          teacherId: this.paramData.userId,
          userId: res.id,
          date: this.numDay + " " + this.CurrentMonth,
        };

        console.log('book data = : ', data);

        this.comService.presentLoading()
        this.services.makeBook(data).subscribe(login => {
          this.comService.hideLoading();
          if (login['code'] == 0) {
            this.comService.presentToast("You Don't Have enough Credit");
          } else {
            this.comService.presentToast('Book Successfully, Please check your mail for the teacher confirmation.');
            this.navCtrl.navigateRoot('tabs');
          }          
        });
      }
    });
  }

  getTeacherSubject() {
    console.log(this.paramData.subj);
    this.comService.presentLoading()
    this.services.getTeacherSubject(this.paramData.userId, this.paramData.subj).subscribe(teachers => {
      this.info = teachers['data'];
      console.log(this.info);
      this.subject = teachers['subject'];
      this.comService.hideLoading()
    });
  }

  async launchLocationPage() {
    let modal = await this.modalCtrl.create({
      component: LocationPage,      
    });
    modal.onDidDismiss().then((location) => {
      console.log('modal location == : ', location);
      if (location.role == 'pickup') {
        this.maplocation = location.data;
      }      
    });
    modal.present();
  }  

  checkhour(hour) {
    this.selectedHour = hour;
  }

  pickhour(hour) {
    this.duration = hour;
    this.price = hour * this.info.perHOur;
  }

  getCalendarStart(dayOfWeek, currentDate) {
    var date = currentDate - 1;
    var startOffset = (date % 7) - dayOfWeek;
    if (startOffset > 0) {
      startOffset -= 7;
    }
    this.startDay = Math.abs(startOffset);
    return Math.abs(startOffset);
  }
  
  renderCalendar(startDay, totalDays, currentDate) {
    
    var currentDay = startDay;
    var i = 1;

    for (; i <= totalDays; i++) {
      this.days.push(i)
      currentDay = ++currentDay % 7;
      if (currentDay === 0 && (i + 1 <= totalDays)) {
        //currentRow++;
      }
    }

    this.daysSlide.nativeElement.slideTo(this.numDay-1, 1000);

    this.applicationRef.tick();
  }

  myCalendar() {
    var month = this.d.getUTCMonth();
    var day = this.d.getUTCDay();
    var year = this.d.getUTCFullYear();
    var date = this.d.getUTCDate();
    var totalDaysOfMonth = this.daysOfMonth[month];
    
    this.indexDay = day;
    this.month = (this.content[month] + ' ' + year);

    this.nextDate = `${(month + 1)}/${date}/${year}`;

    this.nowDate = new Date(Date.now()).toLocaleString();
    this.nowDate = this.nowDate.slice(0, this.nowDate.indexOf(','));

    if (this.nowDate === this.nextDate) {
      console.log('dne')
    }

    this.dateToHighlight = 0;

    if (this.CURRENT_DATE.getUTCMonth() === month && this.CURRENT_DATE.getUTCFullYear() === year) {
      this.dateToHighlight = date;
      console.log(day)
    }

    if (month === 1) {
      if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
        totalDaysOfMonth = 29;
      }
    }
    
    this.renderCalendar(this.getCalendarStart(day, date), totalDaysOfMonth, this.dateToHighlight);
  }

  navigationHandler(dir) {
    this.days = [];
    this.d.setUTCMonth(this.d.getUTCMonth() + dir);    
    this.month = this.d.getUTCMonth() + dir;

    let date = this.d.getUTCDate();
    let year = this.d.getUTCFullYear();
    let month = this.d.getUTCMonth();
    this.CurrentMonth = (this.content[month] + ' ' + year);
    this.smonth = this.content1[month];
    this.numDay = date;    
    this.indexDay = this.d.getUTCDay();
    this.myCalendar();
  }

  checkweek(i) {
    this.indexDay = i;
  }

  checkday(day) {
    this.numDay = day;
  }

  prevMonth() {
    this.navigationHandler(-1);
  }

  nextMonth() {
    this.navigationHandler(1);
  }

  nextTime() {
    this.time = this.timee[0];
    var tt = this.time;
    this.stime = tt.toLowerCase();
  }

  PrevTime() {
    this.time = this.timee[1];
    var tt = this.time;
    this.stime = tt.toLowerCase();
  }

}
