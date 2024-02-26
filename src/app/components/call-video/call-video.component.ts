import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as SimplePeer from 'simple-peer';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';

@Component({
  selector: 'app-call-video',
  templateUrl: './call-video.component.html',
  styleUrls: ['./call-video.component.scss']
})
export class CallVideoComponent {
  @ViewChild('receivervideo') videoRecieverEl! : ElementRef; 
  @ViewChild('emmittervideo') videoEmmitterEl! : ElementRef; 
  videoReciever! : HTMLVideoElement;
  videoEmmitter! : HTMLVideoElement;

  peer : SimplePeer.Instance | undefined;

  constructor(
    private websocketcon : WebsocketService
  ){}

  
  
  ngAfterViewInit() : void{
    this.videoReciever = this.videoRecieverEl.nativeElement;
    this.videoEmmitter = this.videoEmmitterEl.nativeElement;
  }

  start(){
    this.createSimplePeerConnection(true);
  }

  private async createSimplePeerConnection(isInitiator : boolean, offer? : SimplePeer.SignalData){
    if ('mediaDevices' in window.navigator && 'getUserMedia' in window.navigator.mediaDevices) {
      const stream = await window.navigator.mediaDevices.getUserMedia({video : true, audio : true});

      this.videoEmmitter.srcObject = stream;
      this.peer = new SimplePeer({
        initiator:isInitiator,
        stream : stream,
        trickle : false
      });
      
      offer && this.peer.signal(offer);

      this.peer.on("signal", data=>{
        this.websocketcon.send(data);
      })
  
      this.peer.on("stream", stream=>{
        this.videoReciever.srcObject = stream;
      })
  
      this.peer.on("error", error=>{
        console.log(error);
      })
    }
  }

  offerSave = false;
  ngOnInit(): void {
    this.websocketcon.message$.subscribe(data=>{
      try{
        const offer = JSON.parse(data);
        if(offer){
          if(this.peer === undefined){
            this.offerSave = true;
            this.createSimplePeerConnection(false,offer);
          }
          if(!this.offerSave){
            if(offer.type === 'answer'){
              console.log(offer)
              this.peer?.signal(offer);
            }
          }
        }
      }
      catch(e){

      }
    });
  }
}
