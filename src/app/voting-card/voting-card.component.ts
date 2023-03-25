import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-voting-card',
  templateUrl: './voting-card.component.html',
  styleUrls: ['./voting-card.component.css']
})
export class VotingCardComponent {
  @Input() userName?: string = "";
  @Input() votingStatus?: boolean = false;
  //TODO: Remove '?'
}
