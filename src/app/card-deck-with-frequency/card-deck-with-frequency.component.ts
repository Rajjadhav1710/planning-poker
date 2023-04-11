import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-deck-with-frequency',
  templateUrl: './card-deck-with-frequency.component.html',
  styleUrls: ['./card-deck-with-frequency.component.css']
})
export class CardDeckWithFrequencyComponent {
  @Input() cardDeck: {
    vote: string;
    frequency: number;
  }[] = []; // cardDeckWithFrequency
}
