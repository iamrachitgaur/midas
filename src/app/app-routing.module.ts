import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientInfoComponent } from './patient-info/patient-info.component';

import { AuthGuard } from './guard/auth.guard';
import { RouteDeactiveGuard } from './guard/route-deactive.guard'

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginSignupComponent,canActivate:[RouteDeactiveGuard]},
  {path:'signup',component:LoginSignupComponent,}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginSignupComponent,HomeComponent,HeaderComponent,PatientsComponent,PatientInfoComponent]
