import { Component, OnInit } from '@angular/core';
import { Services } from 'src/services/services';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(
    public services: Services
  ) { }

  ngOnInit() {
  }

}
