import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemAlertesComponent } from './list-item-alertes.component';

describe('ListItemAlertesComponent', () => {
  let component: ListItemAlertesComponent;
  let fixture: ComponentFixture<ListItemAlertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemAlertesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemAlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
