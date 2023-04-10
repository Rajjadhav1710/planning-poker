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

  selectedCard: string = "";

  handleCardClick(vote: string): void {
    this.userVoteEvent.emit(vote);

    if(this.selectedCard !== "" && this.selectedCard === vote){
      this.selectedCard = "";
    }else{
      this.selectedCard = vote;
    }
  }
}
