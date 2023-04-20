import { Component, Input } from '@angular/core';
import { ThemeService } from '../Services/theme.service';

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

  public themeService: ThemeService;

  constructor(themeService: ThemeService){
    this.themeService = themeService;
  }
}
