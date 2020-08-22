import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: {breadcrumb: "login"}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
}