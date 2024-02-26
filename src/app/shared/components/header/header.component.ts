import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authService : AuthenticationService){}

  logout(){
    this.authService.logout();
  }
}
