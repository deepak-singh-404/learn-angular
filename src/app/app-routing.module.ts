import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruecallerUserFlowComponent } from './truecaller-user-flow/truecaller-user-flow.component'

const routes: Routes = [
  { path: 'login', component: TruecallerUserFlowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
