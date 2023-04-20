import { Component, Input } from '@angular/core';
import { ThemeService } from '../Services/theme.service';

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

  public themeService: ThemeService;

  constructor(themeService: ThemeService){
    this.themeService = themeService;
  }
}
