import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemServiceComponent } from './list-item-service.component';

describe('ListItemServiceComponent', () => {
  let component: ListItemServiceComponent;
  let fixture: ComponentFixture<ListItemServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
