import { Injectable } from '@angular/core';
import { Client, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
var global = window;
Object.assign(global, { WebSocket });

@Injectable({
  providedIn: 'root'
})
export class StompWebsocketService {

  stompClient! : Client; 
  
  constructor() {
    this.initWebSocket();
  }

  private initWebSocket(){
    // this.stompClient = new Client({
    //   brokerURL : 'ws://localhost:8000/task-management-websocket'
    // });

    this.stompClient = Stomp.over(function(){
      return SockJS('http://localhost:8000/task-management-websocket')
    })

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/test/hello', (obj) => {
         console.log(obj.body);
      });
    };

    this.stompClient.onWebSocketError = (error) => {
      console.error('Error with websocket', error);
    };
  
    this.stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    this.connect();
  }

  connect() {
    this.stompClient.activate();
  }

  disconnect() {
    this.stompClient.deactivate();
  }

  send(destination : string, body : any) {
    this.stompClient.publish({
      destination: destination,
      body : JSON.stringify(body)
    });
  }
}
