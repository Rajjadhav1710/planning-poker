import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeckWithFrequencyComponent } from './card-deck-with-frequency.component';

describe('CardDeckWithFrequencyComponent', () => {
  let component: CardDeckWithFrequencyComponent;
  let fixture: ComponentFixture<CardDeckWithFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDeckWithFrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDeckWithFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
