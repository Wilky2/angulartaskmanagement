import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // private webSocket! : WebSocket;

  private webSocket = SockJS('http://localhost:8000/task-management-websocket2');

  private _message$ : BehaviorSubject<string> = new BehaviorSubject<string>("");
  get message$() : Observable<string>{
    return this._message$.asObservable();
  }

  constructor() { 
    this.initWebSocket();
  }
  
  private initWebSocket(){
    const ws = SockJS('http://localhost:8000/task-management-websocket2');
    //this.webSocket = new WebSocket('ws://localhost:8000/task-management-websocket2');
    this.webSocket = ws;
    this.webSocket.onmessage = (event: { data: string; }) => {
      this._message$.next(event.data)
    };
  }

  public send(data : any){
    this.webSocket.send(JSON.stringify(data));
  }
}
