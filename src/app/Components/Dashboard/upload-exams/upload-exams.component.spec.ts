import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExamsComponent } from './upload-exams.component';

describe('UploadExamsComponent', () => {
  let component: UploadExamsComponent;
  let fixture: ComponentFixture<UploadExamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadExamsComponent]
    });
    fixture = TestBed.createComponent(UploadExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
