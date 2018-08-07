import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { MainComponent } from './pages/main/main.component';
import { RestclickComponent } from './pages/restclick/restclick.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginSessionService } from '../services/login-session.service';
import { JoinComponent } from './pages/join/join.component';


const routes : Routes = [
  { path: 'main', component: MainComponent},
  { path: 'restclick/:restaurant', component: RestclickComponent},
  { path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent},
  { path: 'join', component: JoinComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [LoginSessionService],
  exports: [ RouterModule ],
  declarations: [
    
  ]
})
export class AppRoutingModule { }
