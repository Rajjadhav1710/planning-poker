import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-join-room-page',
  templateUrl: './join-room-page.component.html',
  styleUrls: ['./join-room-page.component.css']
})
export class JoinRoomPageComponent {
  roomId: string = "";
  
  private router: Router;
  public themeService: ThemeService;

  constructor(router: Router, themeService: ThemeService) {
    this.router = router;
    this.themeService = themeService;
  }

  joinRoom(): void {
    if(this.roomId === ""){
      this.router.navigateByUrl('room-not-found');
    }else{
      this.router.navigate([`${this.roomId}`],{
        state: {
          isAdmin: false
        }
      });
    }
  }

  toggleCurrentTheme(){
    this.themeService.toggleCurrentTheme();
  }
}
