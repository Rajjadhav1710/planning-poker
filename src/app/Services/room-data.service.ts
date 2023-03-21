import { Injectable } from '@angular/core';
import { Room } from '../Models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private room: Room;
  private currentUserId: string;

  constructor() { 
    this.room = {
      roomId: "",
      roomName: "",
      votingSystem: "",
      activeUsers: [],
      votingDecks: [],
      averageVote: "",
      agreement: "",
      allCardsRevealed: false
    };
    this.currentUserId = "";
  }
}
