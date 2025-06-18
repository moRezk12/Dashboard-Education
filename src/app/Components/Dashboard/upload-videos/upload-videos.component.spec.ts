import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVideosComponent } from './upload-videos.component';

describe('UploadVideosComponent', () => {
  let component: UploadVideosComponent;
  let fixture: ComponentFixture<UploadVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadVideosComponent]
    });
    fixture = TestBed.createComponent(UploadVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
