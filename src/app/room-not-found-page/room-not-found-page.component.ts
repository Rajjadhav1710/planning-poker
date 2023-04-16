import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-not-found-page',
  templateUrl: './room-not-found-page.component.html',
  styleUrls: ['./room-not-found-page.component.css']
})
export class RoomNotFoundPageComponent {
  private router: Router;

  constructor(router: Router){
    this.router = router;              
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('home');
  }
}
