import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room-page',
  templateUrl: './join-room-page.component.html',
  styleUrls: ['./join-room-page.component.css']
})
export class JoinRoomPageComponent {
  roomId: string = "";
  
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  joinRoom(): void {
    this.router.navigate([`${this.roomId}`],{
      state: {
        isAdmin: false
      }
    });
  }
}
