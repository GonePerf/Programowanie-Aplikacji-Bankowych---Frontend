import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrzelewComponent } from './przelew.component';

describe('PrzelewComponent', () => {
  let component: PrzelewComponent;
  let fixture: ComponentFixture<PrzelewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrzelewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrzelewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
