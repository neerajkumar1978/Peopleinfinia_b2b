import { Injectable } from '@angular/core';
//import { DeviceDetectorService } from 'ngx-device-detector';
import { Http, Response, Headers } from '@angular/http';
// import { HttpInterceptor } from "../HttpIntercepter";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
//import { config } from '../app.config';

@Injectable()

export class CommonFunctionsService {
    stringQuery:any = new RegExp(/^.{1,50}$/);
    fullNameRegex: any = new RegExp(/^[a-zA-Z]+(\s+[a-zA-Z]+)*$/);
    fNameRegex: any = new RegExp(/^[a-zA-Z]+$/);
    lNameRegex: any = new RegExp(/^[a-zA-Z]+$/);
    uNameRegex: any = new RegExp(/^[a-z0-9]+$/);
    contactRegex: any = new RegExp(/^\d+$/);
    emailRegex: any = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    passwordRegex: any = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/);
    numericRegex: any = new RegExp(/(0|[1-9][0-9]*)$/);
    amountRegex: any = new RegExp(/^[0-9]*(?:\.[0-9]*)?$/);
    gstRegex: any = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
    ansRegex: any = new RegExp(/^(?=.*[\w\d]).+/);
    panRegex :any  = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/);
    g2faRegex: any = new RegExp(/^([0-9]{6})+$/);
    noSpace: any = new RegExp(/^\S.*$/)
    onlyNumber: any = RegExp(/^[0-9]*$/)
    phoneNUmber: any = RegExp(/^[a-zA-Z.]{2,30}$/)
   // private langListUrl = config.getEnvironmentVariable('endPoint') + 'api/Announcement/GetActiveLanguageList';
    headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http,
     //   private deviceService: DeviceDetectorService,
        private router: Router) { }

    // epicFunction() {
    //     return this.deviceService.getDeviceInfo();
    // }

    // getIpAddress() {
    //     return this.http.get('https://freegeoip.net/json/?callback', "").map((response: Response) => response.json());
    //     // return this.http.get('http://ip-api.com/json').map((response: Response) => response.json());
    // }

    // checkUser() {
    //     if (localStorage.getItem('bitboseUser')) {
    //         var data = localStorage.getItem('bitboseUser');
    //         var jsonData = JSON.parse(data);
    //         return jsonData;
    //     }
    // }
    // sessionLogout() {
    //     console.log('Session Logout Called')
    //     if (this.checkUser) {
    //         setTimeout(() => {
    //             this.logout()
    //             this.router.navigate(['/home'])
    //         }, 720000);

    //     }
    // }

    // getActiveLanguageList() {
    //     return this.http.get(this.langListUrl, { headers: this.headers }).map((response: Response) => response.json());
    // }


    // checkTheme() {
    //     return localStorage.getItem('theme')
    // }
    // primaryListWithLogin = ['FAV', 'BTC', 'ETH', 'BOSE', 'USDT'];
    // primaryListWithOutLogin = [ 'BTC', 'ETH', 'BOSE', 'USDT'];
    // currentTabList() {
    //     if (this.checkUser()) {
    //         return  this.primaryListWithLogin
    //     }else{
    //         return this.primaryListWithOutLogin
    //     }
    // }

    logout() {
        localStorage.removeItem('loginSessId');
        // localStorage.removeItem('myOrderList');
        // localStorage.removeItem('myTxList');
        // localStorage.removeItem('myWalletList');
        // localStorage.removeItem('fromCoinBalance');
        // localStorage.removeItem('toCoinBalance');
        // localStorage.removeItem('fromWalletExist');
        // localStorage.removeItem('toWalletExist');
        // localStorage.removeItem('txFee');
    }
}
