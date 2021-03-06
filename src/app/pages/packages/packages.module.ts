import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PackagesPageRoutingModule } from './packages-routing.module';

import { PackagesPage } from './packages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    PackagesPageRoutingModule
  ],
  declarations: [PackagesPage]
})
export class PackagesPageModule {}
