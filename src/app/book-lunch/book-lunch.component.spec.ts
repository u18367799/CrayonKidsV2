import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLunchComponent } from './book-lunch.component';

describe('BookLunchComponent', () => {
  let component: BookLunchComponent;
  let fixture: ComponentFixture<BookLunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookLunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
