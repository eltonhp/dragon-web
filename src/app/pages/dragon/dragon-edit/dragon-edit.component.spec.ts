import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonEditComponent } from './dragon-edit.component';

describe('DragonEditComponent', () => {
  let component: DragonEditComponent;
  let fixture: ComponentFixture<DragonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
