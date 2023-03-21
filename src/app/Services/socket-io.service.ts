import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { RoomDataService } from './room-data.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: Socket;
  private roomDataService: RoomDataService;

  constructor(roomDataService: RoomDataService) { 
    this.socket = io('localhost:3000');
    this.roomDataService = roomDataService;
  }

  createRoom(roomDetails : { 
    roomId: string, 
    roomName: string, 
    votingSystem: string 
  }, callBack : any ): void {
    console.log("executed createRoom : SocketIoService", roomDetails);
    
    this.socket.emit('create-room', roomDetails, () => {
      // Calling callBack after creating the room
      callBack();
    });
  }
}
