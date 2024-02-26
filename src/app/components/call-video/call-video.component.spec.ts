import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallVideoComponent } from './call-video.component';

describe('CallVideoComponent', () => {
  let component: CallVideoComponent;
  let fixture: ComponentFixture<CallVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CallVideoComponent]
    });
    fixture = TestBed.createComponent(CallVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
