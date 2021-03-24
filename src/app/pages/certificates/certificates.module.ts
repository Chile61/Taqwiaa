import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CertificatesPageRoutingModule } from './certificates-routing.module';

import { CertificatesPage } from './certificates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    CertificatesPageRoutingModule
  ],
  declarations: [CertificatesPage]
})
export class CertificatesPageModule {}
