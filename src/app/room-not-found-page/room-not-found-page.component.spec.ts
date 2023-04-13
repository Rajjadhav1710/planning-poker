import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomNotFoundPageComponent } from './room-not-found-page.component';

describe('RoomNotFoundPageComponent', () => {
  let component: RoomNotFoundPageComponent;
  let fixture: ComponentFixture<RoomNotFoundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomNotFoundPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomNotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
