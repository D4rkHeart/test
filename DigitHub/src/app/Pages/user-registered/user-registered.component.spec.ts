import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisteredComponent } from './user-registered.component';

describe('UserRegisteredComponent', () => {
  let component: UserRegisteredComponent;
  let fixture: ComponentFixture<UserRegisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisteredComponent]
    });
    fixture = TestBed.createComponent(UserRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
