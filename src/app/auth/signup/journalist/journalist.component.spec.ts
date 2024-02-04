import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalistComponent } from './journalist.component';

describe('JournalistComponent', () => {
  let component: JournalistComponent;
  let fixture: ComponentFixture<JournalistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JournalistComponent]
    });
    fixture = TestBed.createComponent(JournalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
