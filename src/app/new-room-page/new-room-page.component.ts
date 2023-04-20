import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIoService } from '../Services/socket-io.service';
import { ThemeService } from '../Services/theme.service';

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
  public themeService: ThemeService;

  constructor(socketIoService: SocketIoService, router: Router, themeService: ThemeService) {
    this.socketIoService = socketIoService;
    this.router = router;
    this.themeService = themeService;
  }

  createRoom(): void{
    let roomDetails = { 
      // roomId: ""+Math.round(Math.random()*10000000000),
      roomId: this.generateRoomId(), 
      roomName: this.roomName === "" ? "Planning Poker Room" : this.roomName, 
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

  getRandInteger(min: number, max: number): number { // both min and max included
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  generateRoomId(): string {
      let roomId = "";
      for(let i=0;i<3;i++){
          if(i==2){
              roomId += String.fromCharCode(this.getRandInteger(97,122),this.getRandInteger(97,122),this.getRandInteger(97,122));
          }else{
              roomId += (String.fromCharCode(this.getRandInteger(97,122),this.getRandInteger(97,122),this.getRandInteger(97,122))) + "-" ;   
          }
      }
      return roomId;
  }

  toggleCurrentTheme(){
    this.themeService.toggleCurrentTheme();
  }
}
