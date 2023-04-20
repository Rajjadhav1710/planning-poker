import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-room-not-found-page',
  templateUrl: './room-not-found-page.component.html',
  styleUrls: ['./room-not-found-page.component.css']
})
export class RoomNotFoundPageComponent {
  private router: Router;
  public themeService: ThemeService;

  constructor(router: Router, themeService: ThemeService){
    this.router = router;     
    this.themeService = themeService;         
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('home');
  }

  toggleCurrentTheme(){
    this.themeService.toggleCurrentTheme();
  }
}
