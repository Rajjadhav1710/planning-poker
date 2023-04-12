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

    return averageVote.toFixed(2);
  }

  // returns coefficient of variation
  getCV(voteWithFrequencyArray: { // calculates disagreement in percentage
    vote: string; // X
    frequency: number; // f
  }[]): number {
    let sum_f: number = 0;
    let sum_fX: number = 0;
    
    for (const item of voteWithFrequencyArray) {
      if(item.vote !== '?'){
        sum_f += item.frequency;
        sum_fX += (Number(item.vote)*item.frequency);
      }
    }

    let mean: number = sum_fX / sum_f;
    console.log(mean);    
    let sum_fx2: number = 0;

    for (const item of voteWithFrequencyArray) {
      if(item.vote !== '?'){
        sum_fx2 += ((Number(item.vote)-mean)*(Number(item.vote)-mean)*item.frequency);
      }
    }

    let standardDeviation: number = Math.sqrt(sum_fx2/sum_f);

    let coefficientOfVariation: number = (standardDeviation / mean)*100;
    console.log(coefficientOfVariation.toFixed(2));

    return Number(coefficientOfVariation.toFixed(2));
  }

  calculateAgreement(): string {
    console.log("Executed calculateAgreement : RoomDataService");

    let voteWithFrequencyArray: {
      vote: string; // X
      frequency: number; // f
    }[] = this.getVoteWithFrequency();

    console.log(voteWithFrequencyArray);

    return ""+(100 - this.getCV(voteWithFrequencyArray));
    // return "50%";
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

  isAnyActiveUserPickedCard(): boolean {
    for(const user of this.room.activeUsers){
      if(user.votingStatus === true){
        return true;
      }
    }
    return false;
  }

  removeUser(userId: string): void {
    this.room.activeUsers = this.room.activeUsers.filter(user => user.userId !== userId);

    let isThereAnyAdmin: boolean = false;

    for (const user of this.room.activeUsers) {
        if(user.isAdmin){
            isThereAnyAdmin = true;
            break;
        }
    }

    if(!isThereAnyAdmin){
        //Randomly choose any one as admin
        // let userIndex: number = Math.floor(Math.random() * this.rooms[roomIndex].activeUsers.length);

        this.room.activeUsers[0].isAdmin = true;

        if(this.room.activeUsers[0].userId === this.currentUserId){
          this.isCurrentUserAdmin = true;
        }
    }
  }

  getVoteWithFrequency(): {
    vote: string;
    frequency: number;
  }[]{
    let result: {
      vote: string;
      frequency: number;
    }[] = [];

    for(let i=0; i<this.room.activeUsers.length; i++){
      if(this.room.activeUsers[i].votingStatus === true){
        let searchedItem: {
          vote: string;
          frequency: number;
        } | undefined = result.find( r => r.vote === this.room.activeUsers[i].vote);

        if(searchedItem){
          searchedItem.frequency++;
        }else{
          result.push({
            vote: this.room.activeUsers[i].vote,
            frequency: 1
          });
        }
      }
    }

    return result;
  }
}
