import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeLangPageRoutingModule } from './change-lang-routing.module';

import { ChangeLangPage } from './change-lang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    ChangeLangPageRoutingModule
  ],
  declarations: [ChangeLangPage]
})
export class ChangeLangPageModule {}
