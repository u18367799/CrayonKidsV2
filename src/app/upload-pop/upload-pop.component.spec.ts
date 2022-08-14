import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPopComponent } from './upload-pop.component';

describe('UploadPopComponent', () => {
  let component: UploadPopComponent;
  let fixture: ComponentFixture<UploadPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
