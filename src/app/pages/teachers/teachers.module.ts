import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TeachersPageRoutingModule } from './teachers-routing.module';
import { TeachersPage } from './teachers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    TeachersPageRoutingModule
  ],
  declarations: [TeachersPage]
})
export class TeachersPageModule {}
