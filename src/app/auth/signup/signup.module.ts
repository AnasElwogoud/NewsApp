import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { RippleModule} from 'primeng/ripple'
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ButtonModule,
    RippleModule,
    
  ]
})
export class SignupModule { }
