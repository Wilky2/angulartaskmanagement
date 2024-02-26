import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {

  @ViewChild('videoPlay') video! : ElementRef; 
  videoPlayer! : HTMLVideoElement;
  
  ngAfterViewInit() : void{
    this.videoPlayer = this.video.nativeElement;
  }

  play(){
    this.videoPlayer.play();
  }

  pause() {
    this.videoPlayer.pause();
  }

  // Fonction pour convertir un ArrayBuffer en base64
  arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    const uint8Array = new Uint8Array(arrayBuffer);
    const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binaryString);
  }

  // Fonction pour convertir une base64 en Blob
  base64ToBlob(base64data: string): Blob {
    // Convertir le base64 en ArrayBuffer
    const arrayBuffer = Uint8Array.from(atob(base64data), c => c.charCodeAt(0)).buffer;
    // Créer un Blob à partir de l'ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: 'video/webm' });
    return blob
}

}
