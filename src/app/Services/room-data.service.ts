import { Injectable } from '@angular/core';
import { Room } from '../Models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {
  private room: Room;
  private currentUserId: string;
  private isCurrentUserAdmin: boolean;

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
    this.isCurrentUserAdmin = false;
  }

  setCurrentUserId(currentUserId: string): void {
    this.currentUserId = currentUserId;
  }

  setIsCurrentUserAdmin(isCurrentUserAdmin: boolean): void {
    this.isCurrentUserAdmin = isCurrentUserAdmin;
  }

  getIsCurrentUserAdmin(): boolean {
    return this.isCurrentUserAdmin;
  }
}
