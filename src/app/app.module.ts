import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewRoomPageComponent } from './new-room-page/new-room-page.component';
import { JoinRoomPageComponent } from './join-room-page/join-room-page.component';
import { SingleInputModalComponent } from './single-input-modal/single-input-modal.component';
import { RoomPageComponent } from './room-page/room-page.component';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { VotingCardComponent } from './voting-card/voting-card.component';
import { FormsModule } from '@angular/forms';
import { InvitePlayersModalComponent } from './invite-players-modal/invite-players-modal.component';
import { CardDeckWithFrequencyComponent } from './card-deck-with-frequency/card-deck-with-frequency.component';
import { RoomNotFoundPageComponent } from './room-not-found-page/room-not-found-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewRoomPageComponent,
    JoinRoomPageComponent,
    SingleInputModalComponent,
    RoomPageComponent,
    CardDeckComponent,
    VotingCardComponent,
    InvitePlayersModalComponent,
    CardDeckWithFrequencyComponent,
    RoomNotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas, far);
  }
}
