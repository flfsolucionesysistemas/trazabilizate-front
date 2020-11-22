import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanComponent } from './scan.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatLabel,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScanComponent', () => {
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
