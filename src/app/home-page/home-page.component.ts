import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private router: Router;

  constructor(router: Router){
    this.router = router;
  }

  navigateToNewRoomPage(): void {
    // this.router.navigate(['new-room']);
    this.router.navigateByUrl('new-room');
  }
  
  navigateToJoinRoomPage(): void {
    // this.router.navigate(['join-room']);
    this.router.navigateByUrl('join-room');
  }
}
