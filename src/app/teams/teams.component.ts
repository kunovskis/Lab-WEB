import { Component, OnInit } from '@angular/core';
import { Team } from '../model/team';
import { TeamManagementService } from '../team-management.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  selectedTeam: Team;
  onSelect(team: Team): void {
    this.selectedTeam = team;
  }
  constructor(private teamService: TeamManagementService) { }

  getTeams(): void {
    this.teamService.getTeams().then(teams => this.teams = teams);
  }
  ngOnInit() {
    this.getTeams();
  }
}
