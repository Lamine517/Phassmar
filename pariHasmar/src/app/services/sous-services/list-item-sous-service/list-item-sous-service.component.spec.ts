import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemSousServiceComponent } from './list-item-sous-service.component';

describe('ListItemSousServiceComponent', () => {
  let component: ListItemSousServiceComponent;
  let fixture: ComponentFixture<ListItemSousServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemSousServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemSousServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
