import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemUsersComponent } from './list-item-users.component';

describe('ListItemUsersComponent', () => {
  let component: ListItemUsersComponent;
  let fixture: ComponentFixture<ListItemUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
