import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoService } from '../Services/socket-io.service';

@Component({
  selector: 'app-new-room-page',
  templateUrl: './new-room-page.component.html',
  styleUrls: ['./new-room-page.component.css']
})
export class NewRoomPageComponent {
  roomName: string = ""; // not private because we are using it in template
  votingSystem: string = "fibonacci"; // default voting system

  private socketIoService: SocketIoService;
  private router: Router;

  constructor(socketIoService: SocketIoService, router: Router) {
    this.socketIoService = socketIoService;
    this.router = router;
  }

  createRoom(): void{
    let roomDetails = { 
      roomId: ""+Math.round(Math.random()*10000000000), 
      roomName: this.roomName, 
      votingSystem: this.votingSystem 
    };

    // second parameter is the callback which we want to execute after creating the room
    this.socketIoService.createRoom(roomDetails,()=>{
      this.router.navigate([`${roomDetails.roomId}`],{
        state : {
          isAdmin : true
        }
      });
    });
  }
}
