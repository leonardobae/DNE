import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private httpService: HttpService, private router: Router) {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('expires_in');
  }
  
  loggedin(){
    if(localStorage.getItem('access_token') === null)
      return true;
    else
      return false;
  }
  
  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

}
