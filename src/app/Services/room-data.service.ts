import { Injectable } from '@angular/core';
import { Room } from '../Models/room.model';
import { User } from '../Models/user.model';

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

  getCurrentUserId(): string {
    return this.currentUserId;
  }

  setIsCurrentUserAdmin(isCurrentUserAdmin: boolean): void {
    if(isCurrentUserAdmin === undefined){
      this.isCurrentUserAdmin = false;
    }else{
      this.isCurrentUserAdmin = isCurrentUserAdmin;
    }
  }

  getIsCurrentUserAdmin(): boolean {
    return this.isCurrentUserAdmin;
  }

  getCurrentRoom(): Room{
    return this.room;
  }

  setCurrentRoom(joinedRoom: Room): void {
    this.room = joinedRoom;
  }

  getCurrentUser(): User{
    return this.room.activeUsers.filter((user)=>{
      return user.userId === this.currentUserId;
    })[0];
  }

  getCurrentVotingDeck(): string[]{
    switch (this.room.votingSystem) {
      case "fibonacci": 
        return this.room.votingDecks[0];
        break;
      case "modified fibonacci": 
        return this.room.votingDecks[1];
        break;
      case "powers of 2": 
        return this.room.votingDecks[2];
        break;
    
      default:
        return this.room.votingDecks[0];
    }
  }

  addNewUser(newUser: User): void {
    this.room.activeUsers.push(newUser);
  }

  updateRoomUserVote( voteDetails: {
    roomId: string,
    userId: string,
    vote: string,
    votingStatus: boolean
  }): void {
    let user: User = this.room.activeUsers.filter(user => user.userId === voteDetails.userId)[0];

    if(user === undefined){
      console.log("User not found");
    }else{
      user.votingStatus = voteDetails.votingStatus;
      user.vote = voteDetails.vote;
    }
  }

  calculateAverageVote(): string {
    console.log("Executed calculateAverageVote : RoomDataService");

    let totalVote: number = 0; // total of all the votes in the room
    let totalUsersVotted: number = 0; // count of users who have voted and not given "?" as vote
    let averageVote: number = 0;

    for (const user of this.room.activeUsers) {
        if(user.votingStatus === true && user.vote !== "?"){
            totalUsersVotted++;
            totalVote += Number(user.vote);
        }
    }

    averageVote = totalVote/totalUsersVotted;

    return averageVote.toString();
  }

  calculateAgreement(): string {
    return "50%";
  }

  revealRoomCards(): void {
    this.room.allCardsRevealed = true;
    this.room.averageVote = this.calculateAverageVote();
    this.room.agreement = this.calculateAgreement();
  }

  startNewVoting(): void {
    console.log("Executed startNewVoting : RoomDataService");

    // reset room state
    for (const user of this.room.activeUsers) {
        user.votingStatus = false;
        user.vote = "";
    }
    this.room.averageVote = "";
    this.room.agreement = "";
    this.room.allCardsRevealed = false;
  }
}
