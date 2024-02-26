import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { UserApiService } from 'src/app/services/user/user-api.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  formGroup! : FormGroup;
  confirmPasswordEqualError$! : Observable<string>;
  emailValidatorError$! : Observable<string>;
  hasError$! : Observable<boolean>;
  message$! : Observable<string>;
  loading$! : Observable<boolean>;

  hours! : string[];
  hoursForm! : FormControl;
  hoursFilteredOptions! : Observable<string[]>;
  minutes! : string[];
  minutesForm! : FormControl;
  minutesFilteredOptions! : Observable<string[]>;
  ampm : string[] = ["am", "pm"];
  ampmForm! : FormControl;
  ampmFilteredOptions! : Observable<string[]>;
  priorities: {value : string, label : string}[] = [
    { value : "HIGH", label : "Élevée"}, 
    { value : "MEDIUM", label : "Moyen"}, 
    { value : "LOW", label : "Bas"}
  ];

  constructor(private formBuilder : FormBuilder,
    private userApiService : UserApiService,
    private router : Router,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>){

  }

  ngOnInit(): void {
    this._locale="fr";
    this._adapter.setLocale(this._locale);
    this.initGlobalFormGroup();
    this.initUserApiObservable();
  }

  private initUserApiObservable(){
    this.hasError$ = this.userApiService.registerHasError$;
    this.loading$ = this.userApiService.registerLoading$;
    this.message$ = this.userApiService.registerMessage$;
  }

  private initGlobalFormGroup (){
    this.initHoursForm();
    this.initMinutesForm();
    this.initAmPmForm();
    this.formGroup = this.formBuilder.group({
      username : ['', Validators.required],
      lastname : ['', Validators.required],
      firstname : ['', Validators.required],
    });
  }

  private initHoursForm(){
    this.hours = this.arrayRange(1,12,1);
    this.hoursForm = new FormControl("");
    this.hoursFilteredOptions = this.hoursForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.hours)),
    );
  }

  
  private initMinutesForm(){
    this.minutes = this.arrayRange(0,59,1);
    this.minutesForm = new FormControl("");
    this.minutesFilteredOptions = this.minutesForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.minutes)),
    );
  }

  private initAmPmForm(){
    this.ampmForm = new FormControl("");
    this.ampmFilteredOptions = this.ampmForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.ampm)),
    );
  }

  private _filter(value: string, options : string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private arrayRange(start : number, stop : number, step : number) : Array<string> {
    return Array.from(
    { length: (stop - start) / step + 1 },
      (value, index) => start + index * step + ""
    );
  }

  onSubmit(){
    if(this.formGroup.valid){
      
    }
  }
}
