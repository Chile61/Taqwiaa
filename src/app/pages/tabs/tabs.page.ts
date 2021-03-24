import { ApplicationRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  teachersIcon = ''
  normalTeacherIcon = 'assets/icon/building.png';
  selectedTeacherIcon = 'assets/icon/building-active.png';

  profileIcon = '';
  normalProfileIcon = 'assets/icon/person.png';
  selectedProfileIcon = 'assets/icon/person-active.png';

  groupIcon = '';
  normalGroupsIcon = 'assets/icon/baby.png';
  selectedGroupsIcon = 'assets/icon/baby-active.png';

  settinsIcon = '';
  normalSettingsIcon = 'assets/icon/home.png';
  selectedSettingsIcon = 'assets/icon/home-active.png';

  constructor(
    private applicationRef: ApplicationRef
  ) { }

  ngOnInit() {
  }

  tabChanged(event) {
    var index = event.tab;
    console.log('=== ', index);

    if (index == 'profile') {
      this.teachersIcon = this.normalTeacherIcon;
      this.profileIcon = this.selectedProfileIcon;
      this.groupIcon = this.normalGroupsIcon;
      this.settinsIcon = this.normalSettingsIcon
    } else if (index == 'categories') {
      this.teachersIcon = this.selectedTeacherIcon;
      this.profileIcon = this.normalProfileIcon;
      this.groupIcon = this.normalGroupsIcon;
      this.settinsIcon = this.normalSettingsIcon
    } else if (index == 'teachers') {
      this.teachersIcon = this.normalTeacherIcon;
      this.profileIcon = this.normalProfileIcon;
      this.groupIcon = this.selectedGroupsIcon;
      this.settinsIcon = this.normalSettingsIcon
    } else if (index == 'settings') {
      this.teachersIcon = this.normalTeacherIcon;
      this.profileIcon = this.normalProfileIcon;
      this.groupIcon = this.normalGroupsIcon;
      this.settinsIcon = this.selectedSettingsIcon
    }

    this.applicationRef.tick()
  }

}
