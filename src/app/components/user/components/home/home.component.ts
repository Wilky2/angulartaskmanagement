import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  user : User | undefined;

  constructor(private authService : AuthenticationService){}

  ngOnInit(){
    this.user = this.authService.connectedUser;
  }

}
