import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelPostComponent } from './admin-panel-post.component';

describe('AdminPanelPostComponent', () => {
  let component: AdminPanelPostComponent;
  let fixture: ComponentFixture<AdminPanelPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
