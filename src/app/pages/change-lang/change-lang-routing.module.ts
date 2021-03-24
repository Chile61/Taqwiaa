import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeLangPage } from './change-lang.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeLangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeLangPageRoutingModule {}
