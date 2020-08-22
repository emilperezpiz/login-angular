import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { environment } from '../../../environments/environment';
import { UserFormComponent } from './user-form/user-form.component';
import { UserShowComponent } from './user-show/user-show.component';

const uri: string = environment.uri;
const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: {
      breadcrumb: [{ title: 'list', url: uri + '/worker' }],
      formParams: { action: 'list' }
    }
  },
  {
    path: 'new',
    component: UserFormComponent,
    data: {
      breadcrumb: [{ title: 'list', url: `${uri}/worker` }, { title: 'new', url: `${uri}/worker/new` }],
      formParams: { action: 'new' }
    }
  },
  {
    path: 'edit/:id',
    component: UserFormComponent,
    data: {
      breadcrumb: [{ title: 'list', url: `${uri}/worker` }, { title: 'edit', url: '' }],
      formParams: { action: 'edit' }
    }
  },
  {
    path: 'show/:id',
    component: UserShowComponent,
    data: {
      breadcrumb: [{ title: 'list', url: `${uri}/worker` }, { title: 'show', url: '' }],
      formParams: { action: 'show' }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}