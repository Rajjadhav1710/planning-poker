import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { Room } from '../Models/room.model';
import { User } from '../Models/user.model';
import { RoomDataService } from './room-data.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: Socket;
  private roomDataService: RoomDataService;
  private router: Router;

  constructor(roomDataService: RoomDataService, router: Router) { 
    this.socket = io('localhost:3000');
    this.roomDataService = roomDataService;
    this.router = router;

    //add socket-io handlers
    this.addHandlers();
  }

  getSocketId(): string {
    return this.socket.id;
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

  joinRoom(roomId: string, newUser: User, callBack: any): void {
    console.log("executed joinRoom : SocketIoService", roomId, newUser);

    // Calling callBack after joining the room
    this.socket.emit('join-room', roomId, newUser, callBack);
  }

  giveVote(voteDetails : {
    roomId: string,
    userId: string,
    vote: string,
    votingStatus: boolean
  }): void {
    console.log("executed giveVote : SocketIoService", voteDetails);

    this.socket.emit('give-vote', voteDetails);
  }

  revokeVote(voteDetails : {
    roomId: string,
    userId: string,
    vote: string,
    votingStatus: boolean
  }): void {
    console.log("executed revokeVote : SocketIoService", voteDetails);

    this.socket.emit('revoke-vote', voteDetails);
  }

  revealCards(roomId: string): void {
    console.log("executed revealCards : SocketIoService", roomId);

    this.socket.emit('reveal-cards', roomId);
  }

  startNewVoting(roomId: string): void {
    console.log("executed startNewVoting : SocketIoService", roomId);

    this.socket.emit('start-new-voting', roomId);
  }

  handleRoomDetails(): void {
    console.log("executed handleRoomDetails : SocketIoService");

    this.socket.on('room-details',(joinedRoom: Room)=>{
      console.log("received room details in handleRoomDetails : SocketIoService", joinedRoom);
      
      this.roomDataService.setCurrentRoom(joinedRoom);
    });
  }

  handleNewUser(): void {
    console.log("executed handleNewUser : SocketIoService");

    this.socket.on('new-user',(newUser: User)=>{
      console.log("received new user in handleNewUser : SocketIoService", newUser);

      this.roomDataService.addNewUser(newUser);
    });
  }

  handleReceiveVote(): void {
    console.log("executed handleReceiveVote : SocketIoService");

    this.socket.on('receive-vote',( voteDetails: {
      roomId: string,
      userId: string,
      vote: string,
      votingStatus: boolean
    }) => {
      console.log("received voteDetails (receive-vote) in handleReceiveVote : SocketIoService", voteDetails);

      this.roomDataService.updateRoomUserVote(voteDetails);
    });
  }

  handleRevokeVote(): void {
    console.log("executed handleRevokeVote : SocketIoService");

    this.socket.on('revoke-vote',( voteDetails : {
      roomId: string,
      userId: string,
      vote: string,
      votingStatus: boolean
    }) => {
      console.log("received voteDetails (revoke-vote) in handleRevokeVote : SocketIoService", voteDetails);

      this.roomDataService.updateRoomUserVote(voteDetails);
    });
  }

  handleRevealCards(): void {
    console.log("executed handleRevealCards : SocketIoService");

    this.socket.on('reveal-cards',()=>{
      console.log("received reveal-cards in handleRevealCards : SocketIoService");

      this.roomDataService.revealRoomCards();
    });
  }

  handleStartNewVoting(): void {
    console.log("executed handleStartNewVoting : SocketIoService");

    this.socket.on('start-new-voting',()=>{
      console.log("received start-new-voting in handleStartNewVoting : SocketIoService");

      // reset room state
      this.roomDataService.startNewVoting();
    });
  }

  handleRemoveUser(): void {
    console.log("executed handleRemoveUser : SocketIoService");

    this.socket.on('remove-user',(userId: string)=>{
      console.log("received remove-user in handleRemoveUser : SocketIoService");

      this.roomDataService.removeUser(userId);
    });
  }

  handleRoomNotFound(): void {
    console.log("executed handleRoomNotFound : SocketIoService");

    this.socket.on('room-not-found',()=>{
      console.log("received room-not-found in handleRoomNotFound : SocketIoService");

      this.router.navigateByUrl('room-not-found')
        .then(() => { // should i include reload here ? 
          window.location.reload();
        });
    });
  }

  private addHandlers(): void {
    this.handleRoomDetails();
    this.handleNewUser();
    this.handleReceiveVote();
    this.handleRevokeVote();
    this.handleRevealCards();
    this.handleStartNewVoting();
    this.handleRemoveUser();
    this.handleRoomNotFound();
  }

}
