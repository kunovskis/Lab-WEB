import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import {TeamManagementService} from './team-management.service';

import { AppRoutingModule } from './app-routing.module';
import { AddTeamComponent } from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamDetailsComponent,
    AddTeamComponent,
    EditTeamComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [TeamManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
