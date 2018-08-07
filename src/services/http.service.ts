import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, URLSearchParams, ResponseOptions } from '@angular/http';
import { HOST } from '../config';
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { Observer } from "rxjs";

@Injectable()
export class HttpService{
    public server_addr = HOST;
    public oauth: Oauth;

    private headers = new Headers({'Content-Type' : 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http){
        this.oauth = new Oauth(this, this.http);
        // setLoginSession(this.oauth);
        this.setHeader();

    }

    private setHeader() {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.oauth.getToken().access_token}` });
        this.options = new RequestOptions({ headers: this.headers });
    }
     
    public post_check(data): Observable<Response>{        
        return this.http.post(this.server_addr + '/check_register', data);
    }

    public post_reg(data): Observable<Response>{
        return this.http.post(this.server_addr + '/register', data);
    }

    public get(): Observable<Response>{
        return this.http.get(this.server_addr + '/restaurant');
    }


    public get_img(): Observable<Response>{
        return this.http.get(this.server_addr + '/images');
    }

    public loggedin(){
        if(localStorage.getItem('access_token') === null)
          return true;
        else
          return false;
      }

}



class Oauth {
    private token = {
        access_token: null,
        expires_in: null
    }

    constructor(private httpService: HttpService, private http: Http) {
       // this.setToken(localStorage.getItem('access_token'), localStorage.getItem('expires_in'));
        this.timer(this);
    }

    private timer(object) {
        var interval: number = 3000 * 1000; //ms
        var timer = Observable.timer(0, interval)
        timer.subscribe(
            function (x) {
                if (!object.getToken())
                    return;
                if (!object.getToken().expires_in)
                    return;
                if (object.getToken().expires_in <= Number(Date.now()) + interval) {
                    // console.log(object.getToken().expires_in);
                    // console.log(Number(Date.now()) + interval);
                    console.log('토큰 재발급');
                }
                else {
                    // console.log(object.getToken().expires_in);
                    // console.log(Number(Date.now()) + interval);
                    
                    console.log('수명 남음');
                }
            },
            function (err) {
                console.log('Error: ' + err);
            },
            function () {
                console.log('Completed');
            }
        );
    }


    isLogin() {
        return this.getToken().access_token !== null;
    }

    getToken() {
        return this.token;
    }

    logout() {
        //this.setToken(null, null);
    }


    /*setToken(nAccessToken, nExpiresIn) {
        localStorage.setItem('access_token', nAccessToken);
        localStorage.setItem('expires_in', nExpiresIn);
        this.token.access_token = nAccessToken;
        this.token.expires_in = nExpiresIn;
    }*/

    initSearchParams() {
        var urlSearchParams = new URLSearchParams();
        urlSearchParams.append('client_id', 'dp');
        urlSearchParams.append('client_secret', 'dp');
        urlSearchParams.append('scope', 'all');
        return urlSearchParams;
    }
}