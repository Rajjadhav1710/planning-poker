import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewRoomPageComponent } from './new-room-page/new-room-page.component';
import { JoinRoomPageComponent } from './join-room-page/join-room-page.component';
import { SingleInputModalComponent } from './single-input-modal/single-input-modal.component';
import { RoomPageComponent } from './room-page/room-page.component';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { VotingCardComponent } from './voting-card/voting-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewRoomPageComponent,
    JoinRoomPageComponent,
    SingleInputModalComponent,
    RoomPageComponent,
    CardDeckComponent,
    VotingCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
