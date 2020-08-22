import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { LoginRoutingModule } from './login.routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    LoginRoutingModule
  ]
})
export class LoginModule { }
