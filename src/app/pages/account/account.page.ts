import { ApplicationRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Services } from 'src/services/services';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  relation: any;
  grade: any;
  education: any;
  name: any;
  phone: any;
  userId: any;
  education_level_id: any;
  grade_id: any;
  school_area: any;
  school_name: any;
  relation_id: any;
  language: any = 'en';
  imageFileName: any;
  account: any;

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public services: Services,
    public loading: LoadingController,
    private camera: Camera,
    private comService: CommonService,
    private applicationRef: ApplicationRef
  ) {
    this.language = this.services.lang;
    this.imageFileName = 'assets/img/profile.png';
  }

  ngOnInit() {    
    this.getEducation();
    this.getGrade();
    this.getRelation();
    setTimeout(() => {
      this.setUserData();
    }, 2700);
  }

  onSubmitEdit(form: NgForm) {
    let data = {
      name: form.value.name,
      phone: form.value.phone,
      education_level_id: form.value.education_level_id,
      grade_id: form.value.grade_id,
      school_area: form.value.school_area,
      school_name: form.value.school_name,
      relation_id: form.value.relation_id,
      personalImage: this.imageFileName,
      id: this.userId
    };

    this.comService.presentLoading();
    this.services.makeEdit(data).subscribe(edit => {
      this.comService.hideLoading();
      if (edit['code'] == 0) {
        this.comService.presentToast('Invalid Data');
      } else {
        this.services.login(edit['user']);
        this.navCtrl.navigateRoot('tabs');
      }      
    });
  }

  getRelation() {
    this.comService.presentLoading();
    this.services.getRelation().subscribe(relation => {
      this.comService.hideLoading();
      this.relation = relation['data'];
    });
  }

  getGrade() {
    this.services.getGrade().subscribe(grade => {
      this.grade = grade['data'];
    });
  }

  getEducation() {
    this.services.getEducation().subscribe(education => {
      this.education = education['data'];
    });
  }

  setUserData() {
    this.storage.get('auth-token').then(res => {
      if (res) {
        console.log(res);
        this.name = res.name;
        this.phone = res.phone;
        this.userId = res.id;
        this.education_level_id = res.education_level_id;
        this.grade_id = res.grade_id;
        this.school_area = res.school_area;
        this.school_name = res.school_name;
        this.relation_id = res.relation_id;
        if (res.personalImage) this.imageFileName = this.services.image_url + (res.personalImage);
        this.applicationRef.tick();
      }
    });
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('original : ' + base64Image);
      this.imageFileName = base64Image;
    }, (err) => {

    });
  }

}
