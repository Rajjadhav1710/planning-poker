import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private router: Router;
  public themeService: ThemeService;

  constructor(router: Router, themeService: ThemeService){
    this.router = router;
    this.themeService = themeService;
  }

  navigateToNewRoomPage(): void {
    // this.router.navigate(['new-room']);
    this.router.navigateByUrl('new-room');
  }
  
  navigateToJoinRoomPage(): void {
    // this.router.navigate(['join-room']);
    this.router.navigateByUrl('join-room');
  }

  toggleCurrentTheme(){
    this.themeService.toggleCurrentTheme();
  }
}
