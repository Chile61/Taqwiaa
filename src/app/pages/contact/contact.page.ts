import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    public services: Services,
    private comService: CommonService
  ) { }

  ngOnInit() {
  }

  onSubmitContact(form: NgForm) {
    let data = {
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
    };

    this.comService.presentLoading()
    this.services.makeContact(data).subscribe(login => {
      this.comService.hideLoading();
      if (login['code'] == 0) {
        console.log('in valid');
        this.comService.presentToast('Invalid Data');
      } else {
        this.navCtrl.navigateRoot('tabs');
      }      
    });
  }

}
