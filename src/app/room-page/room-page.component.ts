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
  public roomDataService: RoomDataService;
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

  handleContinue(userName: string): void {
    let newUserId: string = ""+Math.round(Math.random()*10000000000);

    // store this newUserId locally
    this.roomDataService.setCurrentUserId(newUserId);

    let newUser: User = {
      userId: newUserId,
      userName: userName,
      votingStatus: false,
      vote: "",
      isAdmin: this.roomDataService.getIsCurrentUserAdmin()
    }

    this.socketIoService.joinRoom(this.getRoomId(), newUser, ()=>{});
  }

  handleUserVote(vote: string): void {
    let currentUser: User = this.roomDataService.getCurrentUser();

    let voteDetails = {
      roomId: this.getRoomId(),
      userId: currentUser.userId,
      vote: vote, // will be updated below if required
      votingStatus: true // will be updated below if required
    }

    if(currentUser.votingStatus === true){
      if(vote === currentUser.vote){
        //revoke vote
        voteDetails.vote = "";
        voteDetails.votingStatus = false;

        this.socketIoService.revokeVote(voteDetails);
      }else{
        //give vote
        this.socketIoService.giveVote(voteDetails);
      }
    }else{
      //give vote
      this.socketIoService.giveVote(voteDetails);
    }
  }

  handleRevealCards(): void {
    this.socketIoService.revealCards(this.getRoomId());
  }

  handleStartNewVoting(): void {
    this.socketIoService.startNewVoting(this.getRoomId());
  }

  ngOnInit(): void {
    
  }
}
