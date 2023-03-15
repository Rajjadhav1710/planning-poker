import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { JoinRoomPageComponent } from './join-room-page/join-room-page.component';
import { NewRoomPageComponent } from './new-room-page/new-room-page.component';
import { RoomPageComponent } from './room-page/room-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'new-room', component: NewRoomPageComponent },
  { path: 'join-room', component: JoinRoomPageComponent },
  { path: ':room-id', component: RoomPageComponent },
  { path: '**', redirectTo: '/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
