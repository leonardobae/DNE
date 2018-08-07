import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HOST } from '../config';
import { AuthHttp, JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginSessionService implements CanActivate{
    jwtHelper: JwtHelper = new JwtHelper();
    isLoggedIn: boolean = false;
    public server_addr = HOST;

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.isLoggedIn;
    }

    constructor(
        private http: AuthHttp,
        private route: Router
    ) {}    

    login(id, pw){
        console.log(id);
        console.log(pw);
        return this.http.post(this.server_addr + '/token', {
            grant_type: 'password',
            student_id: id,
            pwd: pw
        })
        .map(_=>_.json())
        .map(data=>{
            let decoded = this.jwtHelper.decodeToken(data.access_token);
            console.log(decoded);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('expires_in', ''+data.expires_in);
        })
        .toPromise();
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        this.route.navigate(['/login']);
    }

    isAuthenticated(): boolean{
        const expiresAt = JSON.parse(localStorage.getItem('expires_in'));
        return new Date().getTime() < + expiresAt * 1000;
    }
}