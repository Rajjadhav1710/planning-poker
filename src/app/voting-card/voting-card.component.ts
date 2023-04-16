import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.css']
})
export class VotingCardComponent {
  @Input() userName?: string = "";
  @Input() votingStatus?: boolean = false;
  @Input() vote?: string = "";
  @Input() allCardsRevealed: boolean = false;
  @Input() userProfileImageURL?: string = "../app/assets/default-user.png";
  //TODO: Remove '?'
}
