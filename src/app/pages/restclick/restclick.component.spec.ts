import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestclickComponent } from './restclick.component';

describe('RestclickComponent', () => {
  let component: RestclickComponent;
  let fixture: ComponentFixture<RestclickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestclickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
