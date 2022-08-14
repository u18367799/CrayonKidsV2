import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuItemDescriptionComponent } from './add-menu-item-description.component';

describe('AddMenuItemDescriptionComponent', () => {
  let component: AddMenuItemDescriptionComponent;
  let fixture: ComponentFixture<AddMenuItemDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuItemDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenuItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
