import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectAnsComponent } from './correct-ans.component';

describe('CorrectAnsComponent', () => {
  let component: CorrectAnsComponent;
  let fixture: ComponentFixture<CorrectAnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorrectAnsComponent]
    });
    fixture = TestBed.createComponent(CorrectAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
