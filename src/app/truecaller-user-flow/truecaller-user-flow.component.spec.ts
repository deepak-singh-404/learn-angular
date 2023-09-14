import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruecallerUserFlowComponent } from './truecaller-user-flow.component';

describe('TruecallerUserFlowComponent', () => {
  let component: TruecallerUserFlowComponent;
  let fixture: ComponentFixture<TruecallerUserFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TruecallerUserFlowComponent]
    });
    fixture = TestBed.createComponent(TruecallerUserFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
