import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPersonaComponent } from './registro-persona.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: RegistroPersonaComponent;
  let fixture: ComponentFixture<RegistroPersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPersonaComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
