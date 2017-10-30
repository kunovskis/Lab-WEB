import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import {AddTeamComponent} from './add-team/add-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

const routes: Routes = [
  {path: 'detail/:position', component: TeamDetailsComponent},
  { path: 'teams', component: TeamsComponent},
  {path: 'new', component: AddTeamComponent},
  { path: 'edit/:position', component: EditTeamComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
