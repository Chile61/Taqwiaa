import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  user_id: any;
  rank: 0;
  rating: any;

  paramData: any;

  constructor(
    public navCtrl: NavController,
    public services: Services,
    private storage: Storage,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private comService: CommonService
  ) {
    this.storage.get('auth-token').then(res => {
      this.user_id = res.id;
    });

    activeRouter.queryParams.subscribe(data => {
      if (router.getCurrentNavigation().extras.state) {
        this.paramData = router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  ngOnInit() {
  }

  ratings(x: any) {
    for (var i = x; i > 0; i--) {
      document.getElementById('rank-' + i).classList.add("checked");
    }

    for (var j = x; j < 6; j++) {
      let d = (j == 5) ? 5 : (j + 1);
      if (j != 5) {
        document.getElementById('rank-' + d).classList.remove("checked");
      }
    }

    this.rank = x;
    console.log(this.rank);
  }

  onSubmitReview(form: NgForm) {
    let data = {
      rtitle: form.value.rtitle,
      rtext: form.value.rtext,
      teacher_id: this.paramData,
      rank: (typeof this.rank != 'undefined') ? this.rank : 0,
      user_id: this.user_id
    };

    this.comService.presentLoading()
    this.services.review(data).subscribe(login => {
      this.comService.hideLoading()
      if (login['code'] != 1) {
        console.log('in valid');
        this.comService.presentToast('Invalid Data');
      } else {
        this.comService.presentToast('Review Done!!!');
        this.navCtrl.navigateRoot('tabs');
      }      
    });
  }

  TabsPage() {
    this.navCtrl.pop();
  }

}
