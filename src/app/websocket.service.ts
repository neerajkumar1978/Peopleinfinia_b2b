import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
// import {Observable} from 'rxjs/Observable';
// import * as Rx from 'rxjs/Rx';
// import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 	
	//private socket; //socket that connects to our socket.io server

  constructor() { }

  	// connect(): Rx.Subject<MessageEvent>{
  	// 	this.socket = io(environment.ws_url);

  	// 	let Observable = new Observable(obserer =>{
  	// 		this.socket.on('message',(data)=>{
  	// 			console.log("Received a message from websocket server");
  	// 			observer.next(data);	
  	// 		})
  	// 		return()=>{
  	// 			this.socket.disconnect();
  	// 		}	
  	// 	})
  		 	

  	// }

}
