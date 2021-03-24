import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  country: any;
  subject: any;
  language:any='en';

  constructor(
    public navCtrl: NavController,
    public services: Services,
    private comService: CommonService
  ) { }

  ngOnInit() {
    this.getCountry();
  }

  login() {
    this.navCtrl.pop();
  }

  onSubmitRegister(form: NgForm) {
    let data = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
      phone: form.value.phone,
      country_id: form.value.country_id,
      nationality_id: form.value.nationality_id,
      accountType: form.value.accountType,
      // education_level_id: form.value.education_level_id,
      // grade_id: form.value.grade_id,
      // school_area: form.value.school_area,
      // school_name: form.value.school_name,
      // relation_id: form.value.relation_id,
      subject_id: form.value.subject_id,
    };

    this.comService.presentLoading();
    this.services.makeRegister(data).subscribe(async (login) => {
      this.comService.hideLoading()
      if (login['code'] == 0) {
        this.comService.presentToast('Invalid Data');
      } else {
        console.log('result == ', login)
        await this.services.login(login['user']);
        this.navCtrl.navigateRoot('/account');
      }
    });
  }

  getCountry() {
    this.services.getCountry().subscribe(country => {
      this.country = country['data'];
    });

    this.services.getSubject().subscribe(subject => {
      this.subject = subject['data'];
    });
  }

  gotoTerms() {
    this.navCtrl.navigateForward('terms');
  }

}
