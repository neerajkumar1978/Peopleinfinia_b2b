import {Headers} from '@angular/http';

// tslint:disable-next-line: class-name
export class config {

  public static getEnvironmentVariable(value) {
    const serverip = 'http://localhost:3000/';

    // let serverip = 'http://79719b07.ngrok.io/';
    // let serverip = 'http://192.168.0.19:8080/';
    // let serverip = 'http://7ed90083.ngrok.io/';
    // tslint:disable-next-line: comment-format
    //http://devexchange.Bitbose.io:36115/swagger/
    return serverip;
  }

  // create authorization header with jwt token
  public static getHeader() {
    const value = localStorage.getItem('token');
    // tslint:disable-next-line: deprecation
    const authHeader = new Headers({'Content-Type': 'application/json'});
    // tslint:disable-next-line: triple-equals
    if (value && value != 'undefined' && value != 'null') {
      const PIToken = JSON.parse(value);
      // const PIToken = value;
      // console.log('PIToken', PIToken);
      if (PIToken) {
        const jwt = PIToken;
        authHeader.append('x-auth-token', jwt);
      }
    }
    return authHeader;
  }


  public static getFileHeader() {
    const jwt = localStorage.getItem('token');
    // tslint:disable-next-line: deprecation
    const authHeader = new Headers();
    if (jwt) {
      authHeader.append('x-auth-token', jwt);
    }
    return authHeader;

  }


}
