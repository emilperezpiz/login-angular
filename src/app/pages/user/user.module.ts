import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user.routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';
import { UserShowComponent } from './user-show/user-show.component';

@NgModule({
  declarations: [UserListComponent, UserFormComponent, UserShowComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
