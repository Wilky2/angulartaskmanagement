import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit{

  @Input()
  options! : string[];

  @Input()
  _formControl! : FormControl;

  @Input()
  label! : string;

  @Input()
  placeholder! : string;

  filteredOptions! : Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this._formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
} 
