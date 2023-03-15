import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoomPageComponent } from './new-room-page.component';

describe('NewRoomPageComponent', () => {
  let component: NewRoomPageComponent;
  let fixture: ComponentFixture<NewRoomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRoomPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
