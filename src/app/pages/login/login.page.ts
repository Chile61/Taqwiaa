import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fromMain = false;

  constructor(
    public navCtrl: NavController,
    public services: Services,
    private comService: CommonService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    activeRouter.queryParams.subscribe(data => {
      if (router.getCurrentNavigation().extras.state && router.getCurrentNavigation().extras.state.from) {
        this.fromMain = true;
      }
    })
   }

  ngOnInit() {
  }

  onSubmitLogin(form: NgForm) {
    let data = {
      email: form.value.email,
      password: form.value.password
    };

    this.comService.presentLoading();
    this.services.makeLogin(data).subscribe(login => {
      this.comService.hideLoading();
      if (login['code'] == 0) {
        console.log('in valid');
        this.comService.presentToast('Invalid Data');
      } else {        
        console.log('login info :', login);
        console.log('user id : ', login['user']);
        this.services.login(login['user']);
        this.navCtrl.navigateRoot('tabs/categories');
      }
    });
  }

  createAccount() {
    this.navCtrl.navigateForward('signup');
  }

  gotoMain() {    
    this.navCtrl.navigateRoot('tabs/categories');
  }

}
