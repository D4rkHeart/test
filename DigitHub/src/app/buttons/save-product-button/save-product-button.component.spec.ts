import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProductButtonComponent } from './save-product-button.component';

describe('SaveProductButtonComponent', () => {
  let component: SaveProductButtonComponent;
  let fixture: ComponentFixture<SaveProductButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveProductButtonComponent]
    });
    fixture = TestBed.createComponent(SaveProductButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
