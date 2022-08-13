import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuDescriptionComponent } from './add-menu-description.component';

describe('AddMenuDescriptionComponent', () => {
  let component: AddMenuDescriptionComponent;
  let fixture: ComponentFixture<AddMenuDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenuDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
