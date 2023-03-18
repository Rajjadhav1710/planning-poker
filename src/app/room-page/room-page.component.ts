import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../Services/socket-io.service';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent implements OnInit {
  private socketIoService: SocketIoService;

  constructor(socketIoService: SocketIoService) {
    this.socketIoService = socketIoService;
  }

  ngOnInit(): void {

  }
}
