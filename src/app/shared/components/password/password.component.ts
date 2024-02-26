import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {
  hide = true;
  @Input()
  _class!: string;

  @Input()
  label: string = "Mot de passe";

  @Input()
  _formControl! : FormControl;

  @Input()
  error : string = "";
}
