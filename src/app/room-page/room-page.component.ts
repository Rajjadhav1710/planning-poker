import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/user.model';
import { RoomDataService } from '../Services/room-data.service';
import { SocketIoService } from '../Services/socket-io.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent implements OnInit {
  private socketIoService: SocketIoService;
  private roomDataService: RoomDataService;
  private router: Router;
  private activatedRoute: ActivatedRoute;

  constructor(socketIoService: SocketIoService, roomDataService: RoomDataService, router: Router, activatedRoute: ActivatedRoute) {
    this.socketIoService = socketIoService;
    this.roomDataService = roomDataService;
    this.router = router;
    this.activatedRoute = activatedRoute;
    
    // is current user admin
    // console.log(this.router.getCurrentNavigation()?.extras?.state);
    this.roomDataService.setIsCurrentUserAdmin(this.router.getCurrentNavigation()?.extras?.state?.isAdmin);
  }

  private getRoomId(): string {
    return ""+this.activatedRoute.snapshot.paramMap.get('room-id');
  }

  handleContinue(userName: string){
    let newUserId: string = ""+Math.round(Math.random()*10000000000);

    let newUser: User = {
      userId: newUserId,
      userName: userName,
      votingStatus: false,
      vote: "",
      isAdmin: this.roomDataService.getIsCurrentUserAdmin()
    }

    this.socketIoService.joinRoom(this.getRoomId(), newUser, ()=>{});
  }

  ngOnInit(): void {
    
  }
}
