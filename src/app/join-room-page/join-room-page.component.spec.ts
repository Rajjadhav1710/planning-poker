import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRoomPageComponent } from './join-room-page.component';

describe('JoinRoomPageComponent', () => {
  let component: JoinRoomPageComponent;
  let fixture: ComponentFixture<JoinRoomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinRoomPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
