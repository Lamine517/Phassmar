import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousServicesComponent } from './sous-services.component';

describe('SousServicesComponent', () => {
  let component: SousServicesComponent;
  let fixture: ComponentFixture<SousServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
