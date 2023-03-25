import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.css']
})
export class CardDeckComponent {
  @Input() cardDeck: string[] = [];

  @Output()
  userVoteEvent: EventEmitter<string> = new EventEmitter<string>();// created custom event

  handleCardClick(vote: string): void {
    this.userVoteEvent.emit(vote);
  }
}
