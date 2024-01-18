import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToHomeButtonComponent } from './back-to-home-button.component';

describe('BackToHomeButtonComponent', () => {
  let component: BackToHomeButtonComponent;
  let fixture: ComponentFixture<BackToHomeButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackToHomeButtonComponent]
    });
    fixture = TestBed.createComponent(BackToHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
